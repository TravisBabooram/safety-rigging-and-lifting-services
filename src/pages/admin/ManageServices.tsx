import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Settings } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  content: string;
  icon: string | null;
  created_at: string;
}

const ManageServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    icon: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch services',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      toast({
        title: 'Missing information',
        description: 'Please provide both title and description',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update({
            title: formData.title,
            content: formData.content,
            icon: formData.icon || null,
          })
          .eq('id', editingService.id);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Service updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([{
            title: formData.title,
            content: formData.content,
            icon: formData.icon || null,
          }]);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Service added successfully',
        });
      }

      // Reset form and refresh
      setFormData({ title: '', content: '', icon: '' });
      setEditingService(null);
      setIsDialogOpen(false);
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: 'Error',
        description: 'Failed to save service',
        variant: 'destructive',
      });
    }
  };

  const startEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      content: service.content,
      icon: service.icon || '',
    });
    setIsDialogOpen(true);
  };

  const deleteService = async (service: Service) => {
    if (!confirm(`Are you sure you want to delete "${service.title}"?`)) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', service.id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Service deleted successfully',
      });
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete service',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', icon: '' });
    setEditingService(null);
  };

  if (loading) {
    return <div className="p-6">Loading services...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Service title"
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Icon (Lucide icon name)</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g., shield, settings, users"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="content">Service Description</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Detailed description of the service..."
                  rows={6}
                />
              </div>
              <Button
                onClick={editingService ? handleSubmit : handleSubmit}
                className="w-full"
              >
                {editingService ? 'Update Service' : 'Add Service'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {services.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No services created yet</p>
            </CardContent>
          </Card>
        ) : (
          services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="h-5 w-5 text-muted-foreground" />
                      {service.title}
                    </CardTitle>
                    {service.icon && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Icon: {service.icon}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(service)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteService(service)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {service.content}
                </p>
                <p className="text-xs text-muted-foreground">
                  Created: {new Date(service.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageServices;