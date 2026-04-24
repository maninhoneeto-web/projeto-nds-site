/**
 * Configuração de Armazenamento de Imagens
 * Você pode alternar entre caminhos locais (/img/), 
 * links do Unsplash ou o seu Vercel Blob Storage.
 */

const BLOB_BASE_URL = import.meta.env.VITE_BLOB_URL || 'https://gtkf2f0hmtdcnkny.public.blob.vercel-storage.com';

export const getImageUrl = (path: string, fallback: string) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  
  // Se houver um BLOB_URL definido, usamos ele como prefixo
  if (BLOB_BASE_URL) {
    return `${BLOB_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  }
  
  // Caso contrário, tenta local em /img/ ou usa o fallback
  return `/img/${path.replace(/^\//, '')}`;
};

export const IMAGES = {
  HERO: getImageUrl('hero-banner.jpg', 'https://images.unsplash.com/photo-1557597774-9d2739f85a94?auto=format&fit=crop&q=80&w=1200'),
  LOGO: getImageUrl('nds-logo.jpg', 'https://i.ibb.co/mC43pD9m/logo-nds-png.jpg'),
  
  // Serviços
  SERVICE_CAMERAS: getImageUrl('cameras-ip.jpg', 'https://images.unsplash.com/photo-1557597774-9d2739f85a94?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_MIBO: getImageUrl('mibo.jpg', 'https://images.unsplash.com/photo-1521206698660-573b532bd2b0?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_PORTEIRO: getImageUrl('videoporteiro.jpg', 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_DVR: getImageUrl('gravadores.jpg', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_ACESSO: getImageUrl('biometria.jpg', 'https://images.unsplash.com/photo-1633261748231-314de01d1dc4?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_CERCA: getImageUrl('cerca-eletrica.jpg', 'https://images.unsplash.com/photo-1614030424754-02d1f9a0d8be?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_ALARME: getImageUrl('alarmes.jpg', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200'),
  SERVICE_TI: getImageUrl('redes-ti.jpg', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200'),
  
  // Portfólio
  PORTFOLIO_PTZ: getImageUrl('ptz.jpg', 'https://images.unsplash.com/photo-1557597774-9d2739f85a94?auto=format&fit=crop&q=80&w=1200'),
  PORTFOLIO_BULLET: getImageUrl('bullet-ip.jpg', 'https://images.unsplash.com/photo-1610473068541-cb689031c238?auto=format&fit=crop&q=80&w=1200'),
  PORTFOLIO_NVR: getImageUrl('nvr.jpg', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&q=80&w=1200'),
  PORTFOLIO_LOCK: getImageUrl('lock.jpg', 'https://images.unsplash.com/photo-1633261748231-314de01d1dc4?auto=format&fit=crop&q=80&w=1200'),
  PORTFOLIO_PORTEIRO: getImageUrl('porteiro-w3.jpg', 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=1200'),
  PORTFOLIO_RACK: getImageUrl('rack.jpg', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200'),
};
