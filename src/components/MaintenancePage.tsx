import { AlertTriangle, Clock, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MaintenancePageProps {
  message?: string | null;
}

export const MaintenancePage = ({ message }: MaintenancePageProps) => {
  const defaultMessage = "Our site is undergoing maintenance. Please check back shortly.";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Wrench className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              Maintenance in Progress
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              {message || defaultMessage}
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>We'll be back online soon</span>
            </div>
          </div>
          
          <div className="pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-2">Safety Rigging & Lifting Services</p>
              <p>For urgent inquiries, please contact us directly:</p>
              <p className="mt-2">
                <span className="font-medium">Email:</span> info@srls.com.au<br />
                <span className="font-medium">Phone:</span> (Your Phone Number)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};