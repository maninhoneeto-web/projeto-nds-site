/**
 * Configuração de Armazenamento de Imagens
 * Você pode alternar entre caminhos locais (/img/), 
 * links do Unsplash ou o seu Vercel Blob Storage.
 */

const BLOB_BASE_URL = import.meta.env.VITE_BLOB_URL || 'https://gtkf2f0hmtdcnkny.public.blob.vercel-storage.com';

// Registro global de fallbacks para uso no interceptor de erros
const fallbackRegistry = new Map<string, string>();

export const getImageUrl = (path: string, fallback: string) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  
  const cleanPath = path.replace(/^\//, '');
  let resolvedUrl = '';
  
  if (BLOB_BASE_URL) {
    resolvedUrl = `${BLOB_BASE_URL.replace(/\/$/, '')}/${cleanPath}`;
  } else {
    resolvedUrl = `/img/${cleanPath}`;
  }
  
  // Salva no registro global para recuperar em caso de falha no carregamento
  fallbackRegistry.set(resolvedUrl, fallback);
  fallbackRegistry.set(cleanPath, fallback);
  // Também mapeia com espaços codificados em URL
  fallbackRegistry.set(resolvedUrl.replace(/ /g, '%20'), fallback);
  
  return resolvedUrl;
};

// Monitor global de erros de imagem (captura falhas de Vercel Blob e substitui por Unsplash Premium)
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    const target = event.target;
    if (target instanceof HTMLImageElement) {
      if (target.dataset.fallbackTried === 'true') return;
      
      const currentSrc = target.src;
      if (!currentSrc) return;
      
      let fallbackUrl = '';
      
      // Varre o registro de caminhos de arquivos mapeados
      for (const [key, fallback] of fallbackRegistry.entries()) {
        if (currentSrc === key || currentSrc.endsWith(key) || currentSrc.endsWith(key.replace(/ /g, '%20'))) {
          fallbackUrl = fallback;
          break;
        }
      }
      
      // Se encontrou um fallback cadastrado, substitui o src da tag img
      if (fallbackUrl) {
        target.dataset.fallbackTried = 'true';
        target.src = fallbackUrl;
      }
    }
  }, true); // Captura o evento no topo antes que ele se disperse (error de media não borbulha)
}

export const IMAGES = {
  HERO: getImageUrl('hero-banner.jpg', 'https://images.unsplash.com/photo-1524140525911-30646c276325?auto=format&fit=crop&q=80&w=1200'),
  LOGO: 'https://i.ibb.co/mC43pD9m/logo-nds-png.jpg',
  
  // Serviços
  SERVICE_CAMERAS: getImageUrl('cam- ip.jpg.jfif', 'https://images.unsplash.com/photo-1521206698660-573b532bd2b0?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_MIBO: getImageUrl('im-4c.jpg.jpg', 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_PORTEIRO: getImageUrl('allo-box.jpg.jpg', 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_DVR: getImageUrl('dvr-intel.jpg.jfif', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_ACESSO: getImageUrl('bio-intel.jpg.webp', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_CERCA: getImageUrl('cerca-elrt.jpg.jpg', 'https://images.unsplash.com/photo-1614030424754-02d1f9a0d8be?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_ALARME: getImageUrl('alrme-c.jpg.jpg', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_TI: getImageUrl('SPEED/rack-rede.jpg.jfif', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200'),
  
  // Portfólio
  PORTFOLIO_PTZ: getImageUrl('SPEED/spped-branca.jpg.jfif', 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200'),
  PORTFOLIO_BULLET: getImageUrl('bullte-cm.jpg.jpg', 'https://images.unsplash.com/photo-1610473068541-cb689031c238?auto=format&fit=crop&q=80&w=1200'),
  PORTFOLIO_NVR: getImageUrl('dvr-intel.jpg.jfif', 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=1200'),
  PORTFOLIO_LOCK: getImageUrl('fechadura3- intelbras.jpg.webp', 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=1200'),
  PORTFOLIO_PORTEIRO: getImageUrl('SPEED/wt-7.jpg.jpg', 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=1200'),
  PORTFOLIO_RACK: getImageUrl('SPEED/rack-rede.jpg.jfif', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200'),
  INSTALACAO: getImageUrl('instalacao_cftv_premium.jpg', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200'),
  
  // Galeria de Instalações Reais e Imagens de IA Avançadas (Técnicos em Ação)
  GALLERY_TEAM_1: getImageUrl('equipe-nds-1.jpg', 'https://images.unsplash.com/photo-1521206698660-573b532bd2b0?auto=format&fit=crop&q=80&w=1200'),
  GALLERY_TEAM_2: getImageUrl('equipe-nds-2.jpg', 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200'),
  GALLERY_TEAM_3: getImageUrl('equipe-nds-3.jpg', 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=1200'),
  GALLERY_TEAM_4: getImageUrl('equipe-nds-4.jpg', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200'),
};
