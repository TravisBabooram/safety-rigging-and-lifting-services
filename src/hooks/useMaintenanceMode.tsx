import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteStatus {
  id: string;
  maintenance_mode: boolean;
  message: string | null;
  updated_at: string;
}

interface MaintenanceModeContextType {
  isMaintenanceMode: boolean;
  maintenanceMessage: string | null;
  updateMaintenanceMode: (enabled: boolean, message?: string) => Promise<void>;
  loading: boolean;
}

const MaintenanceModeContext = createContext<MaintenanceModeContextType>({
  isMaintenanceMode: false,
  maintenanceMessage: null,
  updateMaintenanceMode: async () => {},
  loading: true,
});

export const useMaintenanceMode = () => {
  const context = useContext(MaintenanceModeContext);
  if (!context) {
    throw new Error('useMaintenanceMode must be used within a MaintenanceModeProvider');
  }
  return context;
};

interface MaintenanceModeProviderProps {
  children: ReactNode;
}

export const MaintenanceModeProvider = ({ children }: MaintenanceModeProviderProps) => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSiteStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('site_status')
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;
      
      setIsMaintenanceMode(data.maintenance_mode);
      setMaintenanceMessage(data.message);
    } catch (error) {
      console.error('Error fetching site status:', error);
      // Default to non-maintenance mode on error
      setIsMaintenanceMode(false);
      setMaintenanceMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const updateMaintenanceMode = async (enabled: boolean, message?: string) => {
    try {
      const { error } = await supabase
        .from('site_status')
        .update({
          maintenance_mode: enabled,
          message: message || 'Our site is undergoing maintenance. Please check back shortly.',
        })
        .eq('id', (await supabase.from('site_status').select('id').limit(1).single()).data?.id);

      if (error) throw error;
      
      setIsMaintenanceMode(enabled);
      setMaintenanceMessage(message || null);
    } catch (error) {
      console.error('Error updating maintenance mode:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchSiteStatus();

    // Set up real-time subscription for maintenance mode changes
    const channel = supabase
      .channel('site-status-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'site_status'
        },
        (payload) => {
          const newData = payload.new as SiteStatus;
          setIsMaintenanceMode(newData.maintenance_mode);
          setMaintenanceMessage(newData.message);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <MaintenanceModeContext.Provider value={{
      isMaintenanceMode,
      maintenanceMessage,
      updateMaintenanceMode,
      loading,
    }}>
      {children}
    </MaintenanceModeContext.Provider>
  );
};