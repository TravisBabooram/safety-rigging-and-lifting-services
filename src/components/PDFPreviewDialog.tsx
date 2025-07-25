import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, ExternalLink, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PDFPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export function PDFPreviewDialog({ isOpen, onClose, pdfUrl, title }: PDFPreviewDialogProps) {
  const handleViewInNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">
            Choose how you'd like to view this document:
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={handleViewInNewTab}
              className="w-full justify-start"
              variant="outline"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in New Tab
            </Button>
            
            <Button
              onClick={handleDownload}
              className="w-full justify-start"
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}