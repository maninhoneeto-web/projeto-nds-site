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
  
  // Serviços com imagens de alta definição
  SERVICE_CAMERAS: '/img/equip_bullet.jpg',
  SERVICE_MIBO: '/img/equip_mibo.jpg',
  SERVICE_PORTEIRO: '/img/equip_video_porteiro.jpg',
  SERVICE_DVR: '/img/equip_nvr.jpg',
  SERVICE_ACESSO: '/img/equip_fechadura.jpg',
  SERVICE_CERCA: '/img/equip_cerca.jpg',
  SERVICE_ALARME: '/img/equip_alarme.jpg',
  SERVICE_TI: '/img/equip_switch.jpg',
  SERVICE_ELETRICA: '/img/equip_quadro.jpg',
  SERVICE_AUTOMACAO: '/img/equip_video_porteiro.jpg',
  
  // Portfólio com imagens de alta definição
  PORTFOLIO_PTZ: '/img/equip_ptz.jpg',
  PORTFOLIO_BULLET: '/img/equip_bullet.jpg',
  PORTFOLIO_NVR: '/img/equip_nvr.jpg',
  PORTFOLIO_LOCK: '/img/equip_fechadura.jpg',
  PORTFOLIO_PORTEIRO: '/img/equip_video_porteiro.jpg',
  PORTFOLIO_RACK: '/img/equip_switch.jpg',
  PORTFOLIO_CERCA: '/img/equip_cerca.jpg',
  PORTFOLIO_ELETRICA: '/img/equip_quadro.jpg',
  INSTALACAO: '/img/instalacao_cftv_premium.jpg',
  
  // Equipamentos Oficiais Mapeados
  EQUIP_VIP_PTZ: '/img/equip_ptz.jpg',
  EQUIP_VIP_BULLET: '/img/equip_bullet.jpg',
  EQUIP_MIBO_IM5: '/img/mibo_im5.jpg',
  EQUIP_NVR_MULTIHD: '/img/equip_nvr.jpg',
  EQUIP_MHDX_3116: '/img/equip_mhdx_3116.jpg',
  EQUIP_ALARME_AMT: '/img/equip_alarme.jpg',
  EQUIP_CERCA_ELC: '/img/equip_cerca.jpg',
  EQUIP_ALLO_WT7: '/img/equip_video_porteiro.jpg',
  EQUIP_FECHADURA_DIGITAL: '/img/equip_fechadura_embutir.jpg',
  FECHADURA_EMBUTIR: '/img/equip_fechadura_embutir.jpg',
  FECHADURA_SOBREPOR: '/img/equip_fechadura_sobrepor.jpg',
  EQUIP_SWITCH_POE: '/img/equip_switch.jpg',
  EQUIP_QUADRO_DISJUNTORES: '/img/equip_quadro.jpg',

  // Linha Mibo Oficial Intelbras
  MIBO_IM3: '/img/mibo_im3.jpg',
  MIBO_IM4: '/img/mibo_im4.jpg',
  MIBO_IM5: '/img/mibo_im5.jpg',
  MIBO_IM7: '/img/mibo_im7.jpg',

  // Galeria de Instalações Reais e Imagens de IA Avançadas (Técnicos em Ação)
  GALLERY_TEAM_1: getImageUrl('equipe-nds-1.jpg', 'https://images.unsplash.com/photo-1521206698660-573b532bd2b0?auto=format&fit=crop&q=80&w=1200'),
  GALLERY_TEAM_2: getImageUrl('equipe-nds-2.jpg', 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200'),
  GALLERY_TEAM_3: getImageUrl('equipe-nds-3.jpg', 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=1200'),
  GALLERY_TEAM_4: getImageUrl('equipe-nds-4.jpg', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200'),
};
