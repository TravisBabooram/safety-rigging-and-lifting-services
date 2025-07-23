import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Mail, Phone, User, MessageSquare, Download, Eye } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  service_type: string | null;
  preferred_contact: string | null;
  created_at: string;
}

const ViewMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
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

  const viewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setDialogOpen(true);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
          <p className="text-muted-foreground">
            View and manage contact form submissions
          </p>
        </div>
        {messages.length > 0 && (
          <Button onClick={exportToCSV} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Messages ({messages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No messages found. Contact form submissions will appear here.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Preferred Contact</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium flex items-center gap-1">
                          <User className="h-3 w-3 text-muted-foreground" />
                          {message.name}
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewMessage(message)}
                        className="gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

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