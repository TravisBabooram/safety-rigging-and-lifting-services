import { usePageContent } from '@/hooks/usePageContent';

interface DynamicContentProps {
  page: string;
  section: string;
  fallback?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  dangerouslySetInnerHTML?: boolean;
}

export const DynamicContent = ({
  page,
  section,
  fallback = '',
  className,
  as = 'span',
  dangerouslySetInnerHTML = false,
}: DynamicContentProps) => {
  const { getContent, loading } = usePageContent(page);
  
  const content = getContent(section) || fallback;
  const Component = as;

  if (loading) {
    return <Component className={className}>{fallback}</Component>;
  }

  if (dangerouslySetInnerHTML) {
    return (
      <Component 
        className={className} 
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return <Component className={className}>{content}</Component>;
};