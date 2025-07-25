import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Mail, Phone, User, MessageSquare, Download, Eye, Check, X } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  service_type: string | null;
  preferred_contact: string | null;
  created_at: string;
  is_read: boolean;
}

const ViewMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch messages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMessageRead = async (messageId: string, isRead: boolean) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: isRead })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, is_read: isRead } : msg
        )
      );

      toast({
        title: 'Success',
        description: `Message marked as ${isRead ? 'read' : 'unread'}`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to update message status',
        variant: 'destructive',
      });
    }
  };

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const markSelectedAsRead = async (isRead: boolean) => {
    if (selectedMessages.length === 0) return;

    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: isRead })
        .in('id', selectedMessages);

      if (error) throw error;

      setMessages(prev => 
        prev.map(msg => 
          selectedMessages.includes(msg.id) ? { ...msg, is_read: isRead } : msg
        )
      );

      setSelectedMessages([]);

      toast({
        title: 'Success',
        description: `${selectedMessages.length} message(s) marked as ${isRead ? 'read' : 'unread'}`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to update message status',
        variant: 'destructive',
      });
    }
  };

  const viewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setDialogOpen(true);
    
    // Auto-mark as read when viewing
    if (!message.is_read) {
      toggleMessageRead(message.id, true);
    }
  };

  const getServiceTypeBadge = (serviceType: string | null) => {
    if (!serviceType || serviceType === 'General Inquiry') return null;
    return (
      <Badge variant="outline" className="text-xs">
        {serviceType}
      </Badge>
    );
  };

  const getPreferredContactBadge = (preferredContact: string | null) => {
    if (!preferredContact) return null;
    
    const icon = preferredContact === 'Phone' ? Phone : 
                 preferredContact === 'Email' ? Mail : 
                 MessageSquare;
    const IconComponent = icon;
    
    return (
      <Badge variant="secondary" className="text-xs gap-1">
        <IconComponent className="h-3 w-3" />
        {preferredContact}
      </Badge>
    );
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Subject', 'Message', 'Service Type', 'Preferred Contact', 'Date'],
      ...messages.map(msg => [
        msg.name,
        msg.email,
        msg.subject,
        msg.message.replace(/\n/g, ' '),
        msg.service_type || '',
        msg.preferred_contact || '',
        new Date(msg.created_at).toLocaleString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `srls-messages-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: 'Success',
      description: 'Messages exported to CSV successfully',
    });
  };

  if (loading) {
    return <div className="p-6">Loading messages...</div>;
  }

  const unreadMessages = messages.filter(msg => !msg.is_read);
  const readMessages = messages.filter(msg => msg.is_read);

  const MessageTable = ({ messages: tableMessages, title }: { messages: ContactMessage[], title: string }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title} ({tableMessages.length})</span>
          {selectedMessages.length > 0 && (
            <div className="flex gap-2">
              <Button 
                onClick={() => markSelectedAsRead(true)} 
                variant="outline" 
                size="sm"
                className="gap-1"
              >
                <Check className="h-3 w-3" />
                Mark Read
              </Button>
              <Button 
                onClick={() => markSelectedAsRead(false)} 
                variant="outline" 
                size="sm"
                className="gap-1"
              >
                <X className="h-3 w-3" />
                Mark Unread
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tableMessages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No {title.toLowerCase()} messages.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={tableMessages.every(msg => selectedMessages.includes(msg.id))}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedMessages(prev => [...new Set([...prev, ...tableMessages.map(m => m.id)])]);
                      } else {
                        setSelectedMessages(prev => prev.filter(id => !tableMessages.map(m => m.id).includes(id)));
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Preferred Contact</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableMessages.map((message) => (
                <TableRow key={message.id} className={!message.is_read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}>
                  <TableCell>
                    <Checkbox
                      checked={selectedMessages.includes(message.id)}
                      onCheckedChange={() => toggleMessageSelection(message.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        {message.name}
                        {!message.is_read && <Badge variant="secondary" className="text-xs">New</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {message.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate font-medium">{message.subject}</p>
                  </TableCell>
                  <TableCell>
                    {getServiceTypeBadge(message.service_type)}
                  </TableCell>
                  <TableCell>
                    {getPreferredContactBadge(message.preferred_contact)}
                  </TableCell>
                  <TableCell className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(message.created_at).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleMessageRead(message.id, !message.is_read)}
                        className="gap-1"
                      >
                        {message.is_read ? <X className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                        {message.is_read ? 'Unread' : 'Read'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewMessage(message)}
                        className="gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
          <p className="text-muted-foreground">
            View and manage contact form submissions ({unreadMessages.length} unread, {readMessages.length} read)
          </p>
        </div>
        {messages.length > 0 && (
          <Button onClick={exportToCSV} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        )}
      </div>

      {unreadMessages.length > 0 && <MessageTable messages={unreadMessages} title="Unread Messages" />}
      {readMessages.length > 0 && <MessageTable messages={readMessages} title="Read Messages" />}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="mt-1">{selectedMessage.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="mt-1">{selectedMessage.email}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Subject</label>
                <p className="mt-1 font-medium">{selectedMessage.subject}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Service Type</label>
                  <p className="mt-1">{selectedMessage.service_type || 'General Inquiry'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Preferred Contact</label>
                  <p className="mt-1">{selectedMessage.preferred_contact || 'Not specified'}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <div className="mt-1 p-3 bg-muted/50 rounded-md">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Received</label>
                <p className="mt-1 text-sm">
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewMessages;