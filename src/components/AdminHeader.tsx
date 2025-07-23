import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { User } from 'lucide-react';

export function AdminHeader() {
  const { userRole } = useAuth();

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'editor':
        return 'default';
      case 'viewer':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <header className="h-14 border-b border-border bg-background flex items-center px-4">
      <SidebarTrigger className="mr-4" />
      
      <div className="flex-1" />
      
      {userRole && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">
              Welcome, {userRole.email}
            </span>
          </div>
          <Badge variant={getRoleBadgeVariant(userRole.role)}>
            {userRole.role.charAt(0).toUpperCase() + userRole.role.slice(1)}
          </Badge>
        </div>
      )}
    </header>
  );
}