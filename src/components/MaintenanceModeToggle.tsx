import { useState } from 'react';
import { useMaintenanceMode } from '@/hooks/useMaintenanceMode';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Wrench } from 'lucide-react';

export const MaintenanceModeToggle = () => {
  const { userRole } = useAuth();
  const { isMaintenanceMode, maintenanceMessage, updateMaintenanceMode, loading } = useMaintenanceMode();
  const { toast } = useToast();
  const [customMessage, setCustomMessage] = useState(
    maintenanceMessage || 'Our site is undergoing maintenance. Please check back shortly.'
  );
  const [isUpdating, setIsUpdating] = useState(false);

  // Only show to admin users
  if (!userRole || userRole.role !== 'admin') {
    return null;
  }

  const handleToggle = async (enabled: boolean) => {
    setIsUpdating(true);
    try {
      await updateMaintenanceMode(enabled, customMessage);
      toast({
        title: 'Success',
        description: `Maintenance mode ${enabled ? 'enabled' : 'disabled'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update maintenance mode',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMessageUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateMaintenanceMode(isMaintenanceMode, customMessage);
      toast({
        title: 'Success',
        description: 'Maintenance message updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update maintenance message',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Loading maintenance settings...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Maintenance Mode Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="maintenance-toggle" className="text-base font-medium">
              Enable Maintenance Mode
            </Label>
            <p className="text-sm text-muted-foreground">
              When enabled, public pages will show maintenance notice
            </p>
          </div>
          <Switch
            id="maintenance-toggle"
            checked={isMaintenanceMode}
            onCheckedChange={handleToggle}
            disabled={isUpdating}
          />
        </div>

        {isMaintenanceMode && (
          <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Maintenance Mode Active</span>
            </div>
            <p className="text-sm text-orange-600 dark:text-orange-400">
              Public pages are currently showing the maintenance notice. Admin routes remain accessible.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="maintenance-message">Maintenance Message</Label>
          <Textarea
            id="maintenance-message"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Enter custom maintenance message..."
            rows={3}
            disabled={isUpdating}
          />
          <Button 
            onClick={handleMessageUpdate}
            variant="outline"
            size="sm"
            disabled={isUpdating}
          >
            Update Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};