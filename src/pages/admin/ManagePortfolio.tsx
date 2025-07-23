import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Calendar, Tag } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  media_url: string;
  thumbnail_url: string | null;
  uploaded_at: string;
}

const ManagePortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    media_url: '',
    thumbnail_url: '',
  });
  const { toast } = useToast();

  const categories = [
    'Rigging Projects',
    'Lift Planning',
    'Equipment',
    'Training',
    'Safety Inspections',
    'Other'
  ];

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setPortfolioItems(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch portfolio items',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('portfolio')
          .update({
            title: formData.title,
            description: formData.description || null,
            category: formData.category,
            media_url: formData.media_url,
            thumbnail_url: formData.thumbnail_url || null,
          })
          .eq('id', editingItem.id);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Portfolio item updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('portfolio')
          .insert([{
            title: formData.title,
            description: formData.description || null,
            category: formData.category,
            media_url: formData.media_url,
            thumbnail_url: formData.thumbnail_url || null,
          }]);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Portfolio item added successfully',
        });
      }

      setDialogOpen(false);
      setEditingItem(null);
      setFormData({ title: '', description: '', category: '', media_url: '', thumbnail_url: '' });
      fetchPortfolioItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      media_url: item.media_url,
      thumbnail_url: item.thumbnail_url || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Portfolio item deleted successfully',
      });
      fetchPortfolioItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openAddDialog = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '', category: '', media_url: '', thumbnail_url: '' });
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="p-6">Loading portfolio items...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Portfolio</h1>
          <p className="text-muted-foreground">
            Add, edit, and delete portfolio items
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title *
                  </label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Portfolio item title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category *
                  </label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this portfolio item..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="media_url" className="text-sm font-medium">
                  Media URL *
                </label>
                <Input
                  id="media_url"
                  value={formData.media_url}
                  onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="thumbnail_url" className="text-sm font-medium">
                  Thumbnail URL
                </label>
                <Input
                  id="thumbnail_url"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingItem ? 'Update' : 'Add'} Portfolio Item
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Items ({portfolioItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {portfolioItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No portfolio items found. Add your first item to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        <Tag className="h-3 w-3" />
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(item.uploaded_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="gap-1"
                        >
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="gap-1 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
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
    </div>
  );
};

export default ManagePortfolio;