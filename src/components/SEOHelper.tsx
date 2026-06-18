import { useEffect } from 'react';

interface SEOHelperProps {
  title: string;
  description: string;
  schema?: Record<string, any> | Record<string, any>[];
}

export function SEOHelper({ title, description, schema }: SEOHelperProps) {
  useEffect(() => {
    // Salvar o anterior
    const prevTitle = document.title;
    document.title = title;
    
    // Atualizar meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    let prevDesc = '';
    if (metaDesc) {
      prevDesc = metaDesc.getAttribute('content') || '';
      metaDesc.setAttribute('content', description);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', description);
      document.head.appendChild(metaDesc);
    }

    // Atualizar structured schema
    let scriptTag = document.getElementById('nds-structured-schema') as HTMLScriptElement;
    if (schema) {
      if (scriptTag) {
        scriptTag.textContent = JSON.stringify(schema);
      } else {
        scriptTag = document.createElement('script');
        scriptTag.id = 'nds-structured-schema';
        scriptTag.type = 'application/ld+json';
        scriptTag.textContent = JSON.stringify(schema);
        document.head.appendChild(scriptTag);
      }
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
      const existingScript = document.getElementById('nds-structured-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, schema]);

  return null;
}
