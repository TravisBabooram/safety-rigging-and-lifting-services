import { useState } from 'react';
import { usePageContent, PageContent } from '@/hooks/usePageContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Eye, Edit2 } from 'lucide-react';

const ManagePages = () => {
  const { content, loading, updateContent, refetch } = usePageContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const { toast } = useToast();

  const pages = ['home', 'about', 'services', 'contact', 'footer'];

  const getPageContent = (pageName: string) => {
    return content.filter(item => item.page_name === pageName);
  };

  const handleEdit = (item: PageContent) => {
    setEditingId(item.id);
    setEditValue(item.content_value);
  };

  const handleSave = async () => {
    if (!editingId) return;

    try {
      await updateContent(editingId, editValue);
      setEditingId(null);
      setEditValue('');
      toast({
        title: 'Content updated',
        description: 'The content has been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update content',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const getContentTypeColor = (type: string) => {
    const colors = {
      heading: 'bg-blue-100 text-blue-800',
      text: 'bg-green-100 text-green-800',
      html: 'bg-purple-100 text-purple-800',
      button: 'bg-orange-100 text-orange-800',
      list: 'bg-yellow-100 text-yellow-800',
      contact: 'bg-red-100 text-red-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading page content...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Pages</h1>
        <p className="text-muted-foreground">
          Edit all text content across your website from this centralized location.
        </p>
      </div>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {pages.map((page) => (
            <TabsTrigger key={page} value={page} className="capitalize">
              {page}
            </TabsTrigger>
          ))}
        </TabsList>

        {pages.map((page) => (
          <TabsContent key={page} value={page} className="space-y-4">
            <div className="grid gap-4">
              {getPageContent(page).map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{item.section_key}</CardTitle>
                        <CardDescription>
                          Last updated: {new Date(item.updated_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getContentTypeColor(item.content_type)}>
                          {item.content_type}
                        </Badge>
                        {editingId === item.id ? (
                          <div className="flex gap-2">
                            <Button onClick={handleSave} size="sm">
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button onClick={handleCancel} variant="outline" size="sm">
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button onClick={() => handleEdit(item)} variant="outline" size="sm">
                            <Edit2 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingId === item.id ? (
                      <div className="space-y-2">
                        <Label htmlFor={`edit-${item.id}`}>Content</Label>
                        {item.content_type === 'html' || item.content_value.length > 100 ? (
                          <Textarea
                            id={`edit-${item.id}`}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="min-h-[120px]"
                            placeholder="Enter content..."
                          />
                        ) : (
                          <Input
                            id={`edit-${item.id}`}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            placeholder="Enter content..."
                          />
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Preview:</span>
                        </div>
                        <div className="p-3 bg-muted rounded-md">
                          {item.content_type === 'html' ? (
                            <div 
                              className="prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: item.content_value }}
                            />
                          ) : (
                            <p className="whitespace-pre-wrap">{item.content_value}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ManagePages;