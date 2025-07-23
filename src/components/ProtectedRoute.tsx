import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'editor' | 'viewer';
}

const ProtectedRoute = ({ children, requiredRole = 'viewer' }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  if (!user || !userRole) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check role hierarchy: admin > editor > viewer
  const roleHierarchy = { admin: 3, editor: 2, viewer: 1 };
  const userLevel = roleHierarchy[userRole.role];
  const requiredLevel = roleHierarchy[requiredRole];

  if (userLevel < requiredLevel) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;