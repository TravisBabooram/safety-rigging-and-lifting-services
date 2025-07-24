import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2 } from 'lucide-react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';
import { useToast } from '@/hooks/use-toast';

export function LogoProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const processCurrentLogo = async () => {
    setIsProcessing(true);
    try {
      // Load the current logo
      const response = await fetch('/lovable-uploads/cdae1e93-e234-4e65-8bf1-356fd65f4de2.png');
      const blob = await response.blob();
      const image = await loadImage(blob);
      
      toast({
        title: "Processing started",
        description: "Removing background from logo...",
      });

      // Remove background
      const processedBlob = await removeBackground(image);
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedImage(processedUrl);

      toast({
        title: "Success!",
        description: "Background removed successfully. Download the transparent logo below.",
      });
    } catch (error) {
      console.error('Error processing logo:', error);
      toast({
        title: "Error",
        description: "Failed to process logo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadProcessedLogo = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'logo-transparent.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Logo Background Removal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <img 
            src="/lovable-uploads/cdae1e93-e234-4e65-8bf1-356fd65f4de2.png" 
            alt="Current Logo" 
            className="w-32 h-32 object-contain mx-auto mb-4 border rounded"
          />
          <p className="text-sm text-muted-foreground">Current Logo</p>
        </div>

        <Button 
          onClick={processCurrentLogo} 
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Remove Background'
          )}
        </Button>

        {processedImage && (
          <div className="space-y-4">
            <div className="text-center">
              <img 
                src={processedImage} 
                alt="Processed Logo" 
                className="w-32 h-32 object-contain mx-auto mb-4 border rounded bg-gray-100 dark:bg-gray-800"
              />
              <p className="text-sm text-muted-foreground">Transparent Logo</p>
            </div>
            
            <Button 
              onClick={downloadProcessedLogo}
              variant="outline"
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Transparent Logo
            </Button>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p>This tool uses AI to automatically remove the background from your logo, creating a transparent PNG file.</p>
        </div>
      </CardContent>
    </Card>
  );
}