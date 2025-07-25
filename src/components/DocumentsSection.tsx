import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Shield, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { PDFPreviewDialog } from './PDFPreviewDialog';

interface PDFDocument {
  id: string;
  title: string;
  description: string | null;
  file_path: string;
  display_order: number;
}

const getDocumentIcon = (title: string) => {
  if (title.toLowerCase().includes('profile') || title.toLowerCase().includes('company')) {
    return FileText;
  }
  if (title.toLowerCase().includes('safety') || title.toLowerCase().includes('h.s.e')) {
    return Shield;
  }
  if (title.toLowerCase().includes('mission')) {
    return Target;
  }
  return FileText;
};

export function DocumentsSection() {
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<PDFDocument | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('pdf_documents')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleViewDocument = async (doc: PDFDocument) => {
    try {
      const { data } = await supabase.storage
        .from('pdf-documents')
        .getPublicUrl(doc.file_path);

      setSelectedDoc(doc);
      setPdfUrl(data.publicUrl);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error('Error getting PDF URL:', error);
    }
  };

  if (documents.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Company Documents</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Access our key company documents including our profile, mission statement, and health & safety policies.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {documents.map((doc) => {
                const IconComponent = getDocumentIcon(doc.title);
                return (
                  <Card key={doc.id} className="group hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
                        {doc.description && (
                          <p className="text-sm text-muted-foreground mb-4">
                            {doc.description}
                          </p>
                        )}
                      </div>
                      
                      <Button
                        variant="outline"
                        onClick={() => handleViewDocument(doc)}
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Document
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {selectedDoc && (
        <PDFPreviewDialog
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setSelectedDoc(null);
            setPdfUrl('');
          }}
          pdfUrl={pdfUrl}
          title={selectedDoc.title}
        />
      )}
    </>
  );
}