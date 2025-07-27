import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PageContent {
  id: string;
  page_name: string;
  section_key: string;
  content_type: string;
  content_value: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const usePageContent = (pageName?: string) => {
  const [content, setContent] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('page_content')
        .select('*')
        .order('display_order', { ascending: true });

      if (pageName) {
        query = query.eq('page_name', pageName);
      }

      const { data, error } = await query;

      if (error) throw error;
      setContent(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (id: string, contentValue: string) => {
    try {
      const { error } = await supabase
        .from('page_content')
        .update({ content_value: contentValue })
        .eq('id', id);

      if (error) throw error;
      await fetchContent(); // Refresh content
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update content');
    }
  };

  const getContent = (sectionKey: string): string => {
    const item = content.find(c => c.section_key === sectionKey);
    return item?.content_value || '';
  };

  useEffect(() => {
    fetchContent();
  }, [pageName]);

  return {
    content,
    loading,
    error,
    updateContent,
    getContent,
    refetch: fetchContent
  };
};