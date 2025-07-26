import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Settings, MessageSquare, BarChart3 } from 'lucide-react';
import { MaintenanceModeToggle } from '@/components/MaintenanceModeToggle';

interface DashboardStats {
  servicesCount: number;
  messagesCount: number;
}

const DashboardHome = () => {
  const { userRole } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    servicesCount: 0,
    messagesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [servicesResponse, messagesResponse] = await Promise.all([
          supabase.from('services').select('id', { count: 'exact', head: true }),
          userRole?.role === 'admin' 
            ? supabase.from('messages').select('id', { count: 'exact', head: true })
            : Promise.resolve({ count: 0 })
        ]);

        setStats({
          servicesCount: servicesResponse.count || 0,
          messagesCount: messagesResponse.count || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userRole]);

  const canManageContent = userRole && ['admin', 'editor'].includes(userRole.role);
  const canViewMessages = userRole?.role === 'admin';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the SRLS Admin Dashboard
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.servicesCount}
            </div>
            <p className="text-xs text-muted-foreground">
              Active services
            </p>
          </CardContent>
        </Card>

        {canViewMessages && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.messagesCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Contact inquiries
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Role</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {userRole?.role || 'Loading...'}
            </div>
            <p className="text-xs text-muted-foreground">
              Access level
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Mode Toggle - Admin Only */}
      <MaintenanceModeToggle />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {canManageContent && (
              <p className="text-sm text-muted-foreground">
                • Update service descriptions
              </p>
            )}
            {canViewMessages && (
              <p className="text-sm text-muted-foreground">
                • Review contact messages
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              • View dashboard statistics
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">All systems operational</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
