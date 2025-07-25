import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Available icons for services
const availableIcons = {
  Search: LucideIcons.Search,
  FileText: LucideIcons.FileText,
  Shield: LucideIcons.Shield,
  Wrench: LucideIcons.Wrench,
  AlertTriangle: LucideIcons.AlertTriangle,
  BarChart3: LucideIcons.BarChart3,
  Users: LucideIcons.Users,
  Target: LucideIcons.Target,
  Phone: LucideIcons.Phone,
  Mail: LucideIcons.Mail,
  Settings: LucideIcons.Settings,
  Cog: LucideIcons.Cog,
  CheckCircle: LucideIcons.CheckCircle,
  Award: LucideIcons.Award,
  Truck: LucideIcons.Truck,
  HardHat: LucideIcons.HardHat,
  Building2: LucideIcons.Building2,
  Clipboard: LucideIcons.Clipboard,
  Calculator: LucideIcons.Calculator,
  MapPin: LucideIcons.MapPin,
  Clock: LucideIcons.Clock,
  Zap: LucideIcons.Zap,
  Eye: LucideIcons.Eye,
  Package: LucideIcons.Package,
  Hammer: LucideIcons.Hammer,
  Gauge: LucideIcons.Gauge,
  Lock: LucideIcons.Lock,
  Briefcase: LucideIcons.Briefcase,
  Factory: LucideIcons.Factory,
  ArrowUpDown: LucideIcons.ArrowUpDown,
};

interface IconPickerProps {
  selectedIcon: string;
  onIconSelect: (iconName: string) => void;
  onClear?: () => void;
}

export const IconPicker = ({ selectedIcon, onIconSelect, onClear }: IconPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIcons = Object.entries(availableIcons).filter(([name]) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIconSelect = (iconName: string) => {
    onIconSelect(iconName);
    setIsOpen(false);
  };

  const SelectedIcon = selectedIcon && availableIcons[selectedIcon as keyof typeof availableIcons];

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="flex-1 justify-start"
        >
          {SelectedIcon ? (
            <div className="flex items-center gap-2">
              <SelectedIcon className="h-4 w-4" />
              <span>{selectedIcon}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="text-muted-foreground">Select an icon</span>
            </div>
          )}
        </Button>
        {selectedIcon && onClear && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Select an Icon</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-96 overflow-y-auto">
              {filteredIcons.map(([name, IconComponent]) => (
                <Button
                  key={name}
                  type="button"
                  variant={selectedIcon === name ? "default" : "outline"}
                  className="aspect-square p-2 flex flex-col items-center justify-center gap-1 h-auto"
                  onClick={() => handleIconSelect(name)}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs truncate w-full">{name}</span>
                </Button>
              ))}
            </div>
            
            {filteredIcons.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No icons found for "{searchQuery}"
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};