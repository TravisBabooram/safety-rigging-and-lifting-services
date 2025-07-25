import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Settings, GripVertical } from 'lucide-react';
import { IconPicker } from '@/components/IconPicker';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Service {
  id: string;
  title: string;
  content: string;
  icon: string | null;
  created_at: string;
  display_order: number;
}

interface SortableServiceProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

const SortableService = ({ service, onEdit, onDelete }: SortableServiceProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: service.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3 flex-1">
              <div
                className="cursor-grab active:cursor-grabbing flex items-center mt-1"
                {...attributes}
                {...listeners}
              >
                <GripVertical className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
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
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(service)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(service)}
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
    </div>
  );
};

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

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
      let nextDisplayOrder = 1;
      if (services.length > 0) {
        const maxOrder = Math.max(...services.map(s => s.display_order));
        nextDisplayOrder = maxOrder + 1;
      }

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
            display_order: nextDisplayOrder,
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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = services.findIndex((service) => service.id === active.id);
      const newIndex = services.findIndex((service) => service.id === over?.id);

      const newServices = arrayMove(services, oldIndex, newIndex);
      setServices(newServices);

      // Update display_order for all affected services
      try {
        const updates = newServices.map((service, index) => ({
          id: service.id,
          display_order: index + 1
        }));

        for (const update of updates) {
          await supabase
            .from('services')
            .update({ display_order: update.display_order })
            .eq('id', update.id);
        }

        toast({
          title: 'Success',
          description: 'Service order updated successfully',
        });
      } catch (error) {
        console.error('Error updating service order:', error);
        toast({
          title: 'Error',
          description: 'Failed to update service order',
          variant: 'destructive',
        });
        // Revert on error
        fetchServices();
      }
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
                  <Label htmlFor="icon">Icon</Label>
                  <IconPicker
                    selectedIcon={formData.icon}
                    onIconSelect={(iconName) => setFormData({ ...formData, icon: iconName })}
                    onClear={() => setFormData({ ...formData, icon: '' })}
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={services} strategy={verticalListSortingStrategy}>
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
                <SortableService
                  key={service.id}
                  service={service}
                  onEdit={startEdit}
                  onDelete={deleteService}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ManageServices;