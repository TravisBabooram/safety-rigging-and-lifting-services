import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Settings, 
  MessageSquare, 
  FileText,
  FileEdit,
  LogOut,
  Shield
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard Home',
    url: '/admin/dashboard',
    icon: LayoutDashboard,
    requiredRole: 'viewer' as const,
  },
  {
    title: 'Manage Services',
    url: '/admin/services',
    icon: Settings,
    requiredRole: 'editor' as const,
  },
  {
    title: 'Manage Documents',
    url: '/admin/documents',
    icon: FileText,
    requiredRole: 'editor' as const,
  },
  {
    title: 'Manage Pages',
    url: '/admin/pages',
    icon: FileEdit,
    requiredRole: 'editor' as const,
  },
  {
    title: 'View Messages',
    url: '/admin/messages',
    icon: MessageSquare,
    requiredRole: 'admin' as const,
  },
];

export function AdminSidebar() {
  const { userRole, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const canAccess = (requiredRole: 'admin' | 'editor' | 'viewer') => {
    if (!userRole) return false;
    const roleHierarchy = { admin: 3, editor: 2, viewer: 1 };
    return roleHierarchy[userRole.role] >= roleHierarchy[requiredRole];
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-lg font-semibold">
            <Shield className="h-5 w-5" />
            SRLS Admin
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                if (!canAccess(item.requiredRole)) return null;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end={item.url === '/admin/dashboard'}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                            isActive 
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                              : 'hover:bg-sidebar-accent/50'
                          }`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-destructive/10 text-destructive w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}