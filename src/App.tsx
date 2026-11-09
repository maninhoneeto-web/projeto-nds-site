import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, ChevronDown, MessageCircle, 
  Shield, Camera, Server, Key, Zap, Power, Wifi, Wrench,
  Smartphone, BellRing, ChevronRight, Phone, Instagram, MapPin, Award, Star,
  ArrowRight, ShieldAlert, Cpu, Eye, Network, ZoomIn
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from './lib/firebase';

import { IMAGES } from './constants/images';
import { ServiceManager } from './components/ServiceManager';

import { SegurancaEletronicaPage } from './components/SegurancaEletronicaPage';
import { RedesComputadoresPage } from './components/RedesComputadoresPage';
import { InstalacoesEletricasPage } from './components/InstalacoesEletricasPage';
import { CercaEletricaPage } from './components/CercaEletricaPage';
import { VideoPorteiroAutomacaoPage } from './components/VideoPorteiroAutomacaoPage';
import { LinhaMiboPage } from './components/LinhaMiboPage';

import { CftvInteligente } from './components/CftvInteligente';
import { ControleAcesso } from './components/ControleAcesso';
import { RedeEstruturada } from './components/RedeEstruturada';
import { ProjetosCorporativos } from './components/ProjetosCorporativos';
import { SegurancaBrasilia } from './components/SegurancaBrasilia';
import { Blog } from './components/Blog';
import { SEOHelper } from './components/SEOHelper';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { ImageModal, ModalImageData } from './components/ImageModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

/* ============================
   DATA & CONFIG
   ============================ */

const CORE_SERVICES = [
  {
    id: 'seguranca',
    title: 'Segurança Eletrônica',
    path: '/seguranca-eletronica',
    tag: 'CFTV IP & Analíticos de IA',
    icon: Camera,
    img: IMAGES.PORTFOLIO_PTZ,
    desc: 'Câmeras IP 4K Intelbras, gravação em NVR/DVR 24h, inteligência artificial com detecção facial, leitura de placas e centrais de alarme AMT 8000.',
    highlights: ['Câmeras Speed Dome e Bullet IP', 'Acesso pelo celular sem mensalidade', 'Gravação contínua 24h']
  },
  {
    id: 'redes',
    title: 'Redes de Computadores',
    path: '/redes-computadores',
    tag: 'TI & Infraestrutura',
    icon: Network,
    img: IMAGES.PORTFOLIO_RACK,
    desc: 'Cabeamento estruturado Cat6 100% cobre, montagem e organização de racks de telecom, switches Gigabit PoE industriais e Wi-Fi de alta densidade.',
    highlights: ['Racks e Patch Panels organizados', 'Switches PoE gerenciáveis Intelbras', 'Certificação de pontos de rede']
  },
  {
    id: 'eletrica',
    title: 'Instalações Elétricas',
    path: '/instalacoes-eletricas',
    tag: 'Residencial & Comercial',
    icon: Zap,
    img: IMAGES.SERVICE_ELETRICA,
    desc: 'Montagem de quadros de distribuição QDC com DPS anti-raios e DR contra choques, circuitos dedicados para segurança, tomadas e iluminação técnica.',
    highlights: ['Norma NBR 5410 com segurança total', 'Proteção DPS para não queimar CFTV', 'Correção de curtos e fiações antigas']
  },
  {
    id: 'cerca',
    title: 'Cerca Elétrica',
    path: '/cerca-eletrica',
    tag: 'Proteção Perimetral',
    icon: ShieldAlert,
    img: IMAGES.SERVICE_CERCA,
    desc: 'Instalação e manutenção de cercas elétricas com centrais de choque Intelbras ELC High Power, hastes em alumínio reforçado, sirene de 120dB e sensores de barreira.',
    highlights: ['Choque inibitório legalizado', 'Sirene de alta potência imediata', 'Hastes resistentes ao sol e chuva']
  },
  {
    id: 'automacao',
    title: 'Vídeo Porteiro & Automação',
    path: '/video-porteiro-automacao',
    tag: 'Interfonia & Fechaduras',
    icon: BellRing,
    img: IMAGES.PORTFOLIO_PORTEIRO,
    desc: 'Vídeo porteiros inteligentes Intelbras Allo WT7 touchscreen para atender pelo celular, fechaduras digitais por biometria e motores rápidos para portões.',
    highlights: ['Atenda e abra o portão pelo smartphone', 'Fechaduras biométricas sem chaves', 'Automatização rápida de portões']
  }
];

const INTELBRAS_CATALOG: ModalImageData[] = [
  {
    title: 'Speed Dome VIP PTZ',
    model: 'VIP 8232 SD IA Intelbras',
    category: 'Câmera IP PTZ',
    img: IMAGES.PORTFOLIO_PTZ,
    description: 'Câmera PTZ profissional com zoom óptico de 32x e inteligência artificial para detecção de veículos e pessoas, rastreamento automático (autotracking) e proteção perimetral.',
    features: ['Zoom óptico 32x 4K', 'Detecção facial e de placas', 'Visão noturna colorida Starlight']
  },
  {
    title: 'Câmera Bullet IP Profissional',
    model: 'VIP 1130 B Intelbras',
    category: 'CFTV IP Externo',
    img: IMAGES.PORTFOLIO_BULLET,
    description: 'Câmera IP metálica com alimentação PoE e analíticos de linha e cerca virtual para condomínios e comércios no DF.',
    features: ['Alimentação PoE no cabo de rede', 'Infravermelho 30m inteligente', 'Corpo metálico IP67']
  },
  {
    title: 'Câmera Wi-Fi Interna Mibo',
    model: 'iM3 / iM3 C Intelbras',
    category: 'Linha Mibo Wi-Fi',
    img: IMAGES.MIBO_IM3,
    description: 'Câmera interna compacta com base magnética multi-ângulo, áudio bidirecional para falar e ouvir, e inteligência artificial para detecção de ruídos e pessoas.',
    features: ['Base magnética multi-ângulo', 'Áudio bidirecional para falar e ouvir', 'Detecção de ruídos anormal']
  },
  {
    title: 'Câmera Wi-Fi 360° Mibo',
    model: 'iM4 / iM4 C Intelbras',
    category: 'Linha Mibo Wi-Fi',
    img: IMAGES.MIBO_IM4,
    description: 'Rotação motorizada 360° horizontal e 90° vertical com rastreamento inteligente de pessoas (Auto-tracking) e modo privacidade.',
    features: ['Visão 360° motorizada pelo app', 'Auto-tracking segue movimento', 'Modo privacidade da lente']
  },
  {
    title: 'Câmera Wi-Fi Externa Mibo',
    model: 'iM5 / iM5 S Intelbras',
    category: 'Linha Mibo Wi-Fi',
    img: IMAGES.MIBO_IM5,
    description: 'Câmera externa com proteção IP67 para sol e chuva, duas antenas Wi-Fi potentes de alto ganho e inteligência artificial para detecção humana.',
    features: ['Proteção IP67 à prova d\'água', 'Antenas duplas de alto ganho', 'Visão noturna até 30m']
  },
  {
    title: 'Speed Dome Wi-Fi Full Color',
    model: 'iM7 / iM7 Full Color Intelbras',
    category: 'Linha Mibo Wi-Fi',
    img: IMAGES.MIBO_IM7,
    description: 'Giro 360° externo com holofotes LED para imagens coloridas à noite, sirene integrada e microfone para intimidação de invasores.',
    features: ['Visão noturna colorida Full Color', 'Giro 360° panorâmico externo', 'Sirene de alarme integrada']
  },
  {
    title: 'Gravador Digital Multi-HD 16 Canais',
    model: 'Intelbras MHDX 3116 Multi-HD',
    category: 'Gravadores e NVRs',
    img: IMAGES.PORTFOLIO_NVR,
    description: 'Gravador oficial Intelbras MHDX 3116 com 16 canais Multi-HD, chassi 1U metálico para rack ou bancada, LEDs indicadores frontais (Power, Net, HDD), porta USB e inteligência artificial para detecção inteligente de pessoas e veículos.',
    features: ['16 canais Multi-HD de alta definição', 'Chassi metálico 1U oficial Intelbras com LEDs de status', 'Compressão H.265+ e inteligência de busca forense']
  },
  {
    title: 'Central de Alarme Sem Fio',
    model: 'AMT 8000 Intelbras',
    category: 'Alarmes e Sensores',
    img: IMAGES.SERVICE_ALARME,
    description: 'Central inteligente sem fios de longo alcance com teclado LCD, sensores PET que não disparam com animais e sirene potente.',
    features: ['100% sem fios', 'Notificações instantâneas no smartphone', 'Bateria interna de emergência']
  },
  {
    title: 'Central de Cerca Elétrica',
    model: 'ELC 5002 High Power',
    category: 'Cerca Elétrica',
    img: IMAGES.SERVICE_CERCA,
    description: 'Eletrificador de cerca perimetral com alta voltagem pulsativa, monitoramento de corte de fios e acionamento sonoro.',
    features: ['Choque pulsativo inibitório', 'Detecção de corte e aterramento', 'Norma ABNT e IEC']
  },
  {
    title: 'Vídeo Porteiro Wi-Fi Allo WT7',
    model: 'Intelbras Allo WT7 Touch 7\'\'',
    category: 'Vídeo Interfonia',
    img: IMAGES.PORTFOLIO_PORTEIRO,
    description: 'Sistema oficial Intelbras Allo WT7: módulo externo em alumínio escovado com botão de chamada em anel LED azul e tela interna de 7" touchscreen colorida. Atendimento e abertura remota pelo app Allo Plus.',
    features: ['Módulo slim em alumínio escovado e aro LED azul', 'Tela touch 7" capacitiva de alta resolução', 'Abertura remota de portões pelo smartphone']
  },
  {
    title: 'Fechadura Digital de Embutir com Maçaneta',
    model: 'Intelbras IFR 7000 / 7001 Smart',
    category: 'Fechaduras Digitais',
    img: IMAGES.FECHADURA_EMBUTIR,
    description: 'Fechadura de embutir oficial Intelbras com maçaneta integrada, leitor biométrico ultra-rápido na própria maçaneta para abertura em 1 toque e teclado touch com senhas.',
    features: ['Biometria ultra-rápida no próprio puxador', 'Mecanismo embutido de máxima resistência', 'Compatível com app Mibo Smart e senhas temporárias']
  },
  {
    title: 'Fechadura Digital de Sobrepor',
    model: 'Intelbras FR 101 / FR 201 Touch',
    category: 'Fechaduras Digitais',
    img: IMAGES.FECHADURA_SOBREPOR,
    description: 'Fechadura digital de sobrepor compacta com acabamento black piano de alto brilho, teclado touch numérico luminoso, abertura por senha ou chaveiro RFID e travamento automático.',
    features: ['Instalação sobreposta sem precisar trocar a maçaneta', 'Abertura rápida por senha ou chaveiros RFID', 'Travamento instantâneo ao fechar a porta']
  },
  {
    title: 'Switch Gigabit PoE Gerenciável',
    model: 'SG 2404 PoE Intelbras',
    category: 'Redes de TI',
    img: IMAGES.SERVICE_TI,
    description: 'Switch corporativo com portas PoE Gigabit para alimentação e transmissão de dados de câmeras IP e roteadores de alta performance.',
    features: ['Portas Gigabit com PoE de alta potência', 'Proteção contra surtos elétricos', 'Gerenciamento de banda e VLAN']
  },
  {
    title: 'Quadro Elétrico com DPS e DR',
    model: 'QDC Padrão NBR 5410',
    category: 'Instalações Elétricas',
    img: IMAGES.SERVICE_ELETRICA,
    description: 'Quadro de energia dimensionado com protetores DPS contra descargas atmosféricas e disjuntores termomagnéticos balanceados.',
    features: ['DPS anti-raios para eletrônicos', 'Dispositivo DR salva-vidas', 'Fiação antichama identificada']
  }
];

const FAQS = [
  { q: 'A NDS CFTV atende quais regiões de Brasília?', a: 'Atendemos todo o Distrito Federal com equipes móveis, com destaque para Guará, Taguatinga, Asa Sul, Asa Norte, Lago Sul, Lago Norte, Park Way, Noroeste, Sudoeste e Águas Claras.' },
  { q: 'Qual a garantia dos equipamentos e das instalações?', a: 'Todos os equipamentos originais Intelbras possuem garantia de fábrica de 1 ano. Nossos serviços contam com garantia técnica e suporte especializado no DF.' },
  { q: 'Consigo ver minhas câmeras e abrir o portão pelo celular?', a: 'Sim! Deixamos todos os aplicativos oficiais configurados em seus celulares, tablets e computadores, permitindo visualizar imagens ao vivo e abrir portões de qualquer lugar do mundo.' },
  { q: 'Vocês fazem manutenção em cercas elétricas e câmeras que já tenho?', a: 'Sim. Realizamos manutenção preventiva e corretiva, conserto de disparo em falso de cerca elétrica, troca de conectores oxidados e modernização de gravadores antigos.' },
  { q: 'O orçamento tem custo?', a: 'Não! Elaboramos propostas comerciais e orçamentos técnicos detalhados com transparência e agilidade via WhatsApp.' }
];

function FaqItem({ question, answer }: { question: string; answer: string; key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group cursor-pointer"
      >
        <span className="text-base sm:text-lg font-bold text-slate-200 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
          {question}
        </span>
        <ChevronDown className={`w-5 h-5 text-cyan-400 shrink-0 ml-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-400 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================
   MAIN HOMEPAGE COMPONENT
   ============================ */

function CFTVSite({ authUser }: { authUser: User | null }) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<ModalImageData | null>(null);
  const [catalogFilter, setCatalogFilter] = useState<string>('todos');

  const openWhatsApp = async (customMessage?: string) => {
    try {
      const currentVisitId = localStorage.getItem('nds_visit_id');
      await addDoc(collection(db, 'conversions'), {
        page: 'Home Modernizada',
        type: 'WhatsApp Click',
        visitId: currentVisitId,
        timestamp: serverTimestamp(),
      });
      
      // Trigger Google Ads conversion event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-18323711854/SimhCIKn-tAcEO7OtqFE'
        });
      }
    } catch (e) {
      console.error('Error logging conversion:', e);
    }

    const phone = "5561998308655";
    const msg = encodeURIComponent(
      customMessage || "Olá NDS! Vim pelo site e gostaria de solicitar um orçamento para meu projeto em Brasília."
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "NDS CFTV Digital",
        "image": IMAGES.LOGO,
        "url": "https://ndscftvdigital.com.br",
        "telephone": "+55-61-99830-8655",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Brasília",
          "addressRegion": "DF",
          "addressCountry": "BR"
        },
        "description": "Projetos de CFTV Inteligente com equipamentos oficiais Intelbras, cabeamento estruturado de redes, instalações elétricas, cerca elétrica e vídeo porteiros no Distrito Federal."
      },
      {
        "@type": "Organization",
        "name": "NDS CFTV Digital",
        "logo": IMAGES.LOGO,
        "url": "https://ndscftvdigital.com.br"
      }
    ]
  };

  const DF_PRIORITY_CITIES = [
    'Guará', 'Taguatinga', 'Asa Sul', 'Asa Norte',
    'Lago Sul', 'Lago Norte', 'Park Way', 'Noroeste', 'Sudoeste', 'Águas Claras'
  ];

  const filteredCatalog = catalogFilter === 'todos' 
    ? INTELBRAS_CATALOG 
    : INTELBRAS_CATALOG.filter(item => {
        if (catalogFilter === 'mibo') return item.category?.includes('Mibo');
        if (catalogFilter === 'cftv') return item.category?.includes('Câmera') || item.category?.includes('CFTV');
        if (catalogFilter === 'nvr') return item.category?.includes('Gravador');
        if (catalogFilter === 'alarme') return item.category?.includes('Alarme') || item.category?.includes('Cerca');
        if (catalogFilter === 'porteiro') return item.category?.includes('Interfonia') || item.category?.includes('Fechadura');
        if (catalogFilter === 'redes') return item.category?.includes('Rede') || item.category?.includes('Elétrica');
        return true;
      });

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-cyan-500 selection:text-white">
      <SEOHelper 
        title="NDS CFTV Digital | Câmeras Intelbras, Redes e Segurança em Brasília"
        description="Especialista em segurança eletrônica no DF. CFTV Inteligente Intelbras, Redes de TI, Elétrica, Cerca Elétrica e Vídeo Porteiros no Guará, Taguatinga, Asas e região."
        schema={homeSchema}
      />

      <SiteHeader />

      <main className="flex-grow pt-20">
        
        {/* HERO SECTION DE ALTO IMPACTO (AZUL-MARINHO, AZUL ELÉTRICO E AMARELO VIBRANTE) */}
        <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#0A1128] via-slate-950 to-slate-950 border-b border-cyan-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.18),rgba(255,255,255,0))] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            
            {/* TEXTOS E CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest">
                <Shield className="w-4 h-4 text-amber-400" /> Segurança Eletrônica & Infraestrutura no DF
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                Proteção Inteligente com <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300">
                  Tecnologia Oficial Intelbras
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Projetos completos de <strong className="text-white">CFTV com Inteligência Artificial</strong>, cabeamento estruturado de redes, quadros elétricos seguros, cercas de alta proteção e vídeo porteiros para residências, condomínios e empresas em Brasília.
              </p>

              {/* BOTÕES DE CONVERSÃO */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center lg:justify-start">
                <button
                  onClick={() => openWhatsApp()}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>Solicitar Orçamento Grátis</span>
                </button>

                <a 
                  href="#servicos-principais"
                  className="w-full sm:w-auto border border-cyan-500/40 hover:bg-cyan-500/10 text-cyan-300 px-7 py-4 rounded-xl uppercase tracking-wider text-xs font-bold transition-all text-center"
                >
                  Conhecer os 5 Serviços
                </a>
              </div>

              {/* SELOS DE CONFIANÇA */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-left">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Equipamentos 100% Homologados</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Atendimento em todo o DF</span>
                </div>
                <div className="col-span-2 sm:col-span-1 flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Garantia e Suporte Técnico</span>
                </div>
              </div>
            </div>

            {/* FOTO HERO INTERATIVA INTELBRAS */}
            <div className="lg:col-span-5 flex justify-center">
              <div 
                className="relative group cursor-pointer max-w-md w-full"
                onClick={() => setSelectedImage(INTELBRAS_CATALOG[0])}
              >
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-amber-400 rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500" />
                <div className="relative bg-slate-900 border border-cyan-500/40 p-6 rounded-3xl shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                      Destaque em Brasília
                    </span>
                    <span className="text-cyan-400 text-xs font-bold flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" /> Clique p/ Zoom
                    </span>
                  </div>

                  <img
                    src={IMAGES.PORTFOLIO_PTZ}
                    alt="Speed Dome VIP PTZ Intelbras"
                    className="w-full h-64 sm:h-72 object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h3 className="text-lg font-black text-white uppercase">Câmera Speed Dome VIP 8232 SD IA</h3>
                    <p className="text-slate-400 text-xs mt-1">Zoom óptico 32x com inteligência artificial para condomínios e perímetros no DF.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5 PÁGINAS E SERVIÇOS PRINCIPAIS DA NDS */}
        <section id="servicos-principais" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">
              Engenharia e Soluções Integradas
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Nossos 5 Pilares de Serviços Especializados
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Acesse a página individual de cada serviço para conferir especificações, fotografias de equipamentos Intelbras e solicitar sua proposta técnica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_SERVICES.map((srv, index) => {
              const IconComp = srv.icon;
              return (
                <motion.div
                  key={srv.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/90 border border-white/10 hover:border-cyan-500/50 rounded-3xl p-6 flex flex-col justify-between group transition-all hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                  <div>
                    {/* Imagem do Serviço */}
                    <div className="relative bg-slate-950 rounded-2xl p-4 mb-6 border border-white/5 flex items-center justify-center overflow-hidden">
                      <img 
                        src={srv.img} 
                        alt={srv.title} 
                        className="h-44 w-full object-contain group-hover:scale-105 transition-transform duration-300" 
                      />
                      <span className="absolute bottom-3 left-3 bg-cyan-950/90 text-cyan-300 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-cyan-500/40">
                        {srv.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black uppercase text-white group-hover:text-cyan-400 transition-colors">
                        {srv.title}
                      </h3>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed mb-4">
                      {srv.desc}
                    </p>

                    <ul className="space-y-1.5 mb-6">
                      {srv.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <Link
                      to={srv.path}
                      className="flex-1 bg-slate-800 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Ver Página do Serviço</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => openWhatsApp(`Gostaria de um orçamento para o serviço: ${srv.title}`)}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 p-3 rounded-xl shadow-md transition-colors"
                      title="Orçamento no WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 fill-slate-950" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* DESTAQUE ESPECIAL: LINHA INTELBRAS MIBO CAM */}
        <section className="py-20 bg-gradient-to-b from-slate-950 via-[#0A1633] to-slate-950 border-t border-cyan-500/20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-14 text-center lg:text-left">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest">
                  <Wifi className="w-3.5 h-3.5 text-amber-400" /> Linha Mibo Cam Wi-Fi • Sem Fios e Sem Obras
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                  Câmeras Inteligentes Intelbras Mibo
                </h2>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
                  Praticidade total para residências, apartamentos, clínicas e comércios no DF. Instalação rápida, áudio bidirecional, detecção inteligente de pessoas e controle completo no aplicativo <strong>Mibo Cam</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  to="/linha-mibo"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Ver Modelos Mibo</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => openWhatsApp("Gostaria de um orçamento para câmeras da Linha Mibo Wi-Fi")}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Pedir Proposta Mibo</span>
                </button>
              </div>
            </div>

            {/* CARDS DOS 4 MODELOS MIBO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Mibo iM3 / iM3 C',
                  tag: 'Interna Compacta',
                  desc: 'Base magnética multi-ângulo, áudio bidirecional e alerta de ruído/choro.',
                  img: IMAGES.MIBO_IM3,
                  full: INTELBRAS_CATALOG.find(i => i.model?.includes('iM3'))!
                },
                {
                  title: 'Mibo iM4 / iM4 C',
                  tag: 'Visão 360° Pan-Tilt',
                  desc: 'Rotação motorizada pelo app com auto-tracking que segue pessoas na sala.',
                  img: IMAGES.MIBO_IM4,
                  full: INTELBRAS_CATALOG.find(i => i.model?.includes('iM4'))!
                },
                {
                  title: 'Mibo iM5 / iM5 S',
                  tag: 'Externa com IA',
                  desc: 'Resistência IP67 para sol e chuva, antenas potentes e visão noturna 30m.',
                  img: IMAGES.MIBO_IM5,
                  full: INTELBRAS_CATALOG.find(i => i.model?.includes('iM5'))!
                },
                {
                  title: 'Mibo iM7 Full Color',
                  tag: 'PTZ 360° Colorida',
                  desc: 'Giro externo 360° com holofote LED colorido e sirene integrada.',
                  img: IMAGES.MIBO_IM7,
                  full: INTELBRAS_CATALOG.find(i => i.model?.includes('iM7'))!
                }
              ].map((miboItem, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(miboItem.full)}
                  className="bg-slate-900/90 border border-cyan-500/20 hover:border-cyan-400 rounded-2xl p-5 flex flex-col justify-between group cursor-pointer transition-all hover:scale-[1.02] shadow-xl"
                >
                  <div>
                    <div className="relative bg-slate-950 rounded-xl p-4 mb-4 flex items-center justify-center overflow-hidden border border-white/5">
                      <img 
                        src={miboItem.img} 
                        alt={miboItem.title} 
                        className="h-36 w-full object-contain group-hover:scale-105 transition-transform duration-300" 
                      />
                      <span className="absolute top-2 right-2 bg-slate-900/90 text-cyan-400 p-1 rounded-md">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </span>
                      <span className="absolute bottom-2 left-2 bg-cyan-950/90 text-cyan-300 text-[9px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">
                        {miboItem.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-black uppercase text-white group-hover:text-cyan-400 transition-colors">
                      {miboItem.title}
                    </h4>
                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                      {miboItem.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Ver Especificações <ArrowRight className="w-3 h-3" />
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openWhatsApp(`Gostaria de um orçamento para a câmera: ${miboItem.title}`);
                      }}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 p-2 rounded-lg"
                      title="Orçamento no WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATÁLOGO INTERATIVO DE EQUIPAMENTOS INTELBRAS COM MODAL ZOOM */}
        <section className="py-20 bg-slate-900/60 border-y border-white/10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">
                Fotografias & Equipamentos Oficiais
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Galeria Interativa Intelbras
              </h2>
              <p className="text-slate-400 text-sm">
                Selecione os equipamentos abaixo e clique na foto para abrir a ampliação em alta definição, especificações técnicas e pedir orçamento.
              </p>

              {/* ABAS DE FILTRO */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {[
                  { id: 'todos', label: 'Todos os Equipamentos' },
                  { id: 'mibo', label: 'Linha Mibo Wi-Fi' },
                  { id: 'cftv', label: 'Câmeras IP & IA' },
                  { id: 'nvr', label: 'Gravadores NVR' },
                  { id: 'alarme', label: 'Alarmes & Cerca' },
                  { id: 'porteiro', label: 'Vídeo Porteiros & Fechaduras' },
                  { id: 'redes', label: 'Redes & Elétrica' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setCatalogFilter(filter.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      catalogFilter === filter.id 
                        ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {filteredCatalog.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(item)}
                  className="bg-slate-950 border border-white/10 hover:border-cyan-500/50 rounded-2xl p-4 flex flex-col justify-between group cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="relative bg-slate-900 rounded-xl p-3 mb-3 flex items-center justify-center overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="h-32 w-full object-contain group-hover:scale-105 transition-transform duration-300" 
                    />
                    <span className="absolute top-2 right-2 bg-slate-950/80 text-cyan-400 p-1 rounded-md">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-black uppercase text-white mt-1 group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    {item.model && (
                      <p className="text-[10px] text-amber-400 font-bold mt-0.5 line-clamp-1">
                        {item.model}
                      </p>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-500 font-bold mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                    <span>Clique p/ Ver</span>
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO LOCAL - REGIÕES DE ATENDIMENTO DE BRASÍLIA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-widest">
              <MapPin className="w-4 h-4" /> Cobertura Técnica Especializada no Distrito Federal
            </div>

            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Atendimento Ágil com Equipes Móveis no DF
            </h3>

            <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              Atendemos condomínios residenciais, comerciais, clínicas e residências de alto padrão nas principais regiões administrativas de Brasília. Visitas técnicas para orçamento e diagnóstico sem enrolação.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto pt-2">
              {DF_PRIORITY_CITIES.map((city, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-slate-900 border border-cyan-500/20 text-cyan-300 font-black text-xs uppercase tracking-wider rounded-xl shadow-sm"
                >
                  {city}
                </span>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={() => openWhatsApp()}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 mx-auto shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Agendar Avaliação Técnica em Brasília</span>
              </button>
            </div>
          </div>
        </section>

        {/* DÚVIDAS FREQUENTES (FAQ) */}
        <section className="py-20 bg-slate-900/40 border-t border-white/10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-3">
              <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">
                Tire suas Dúvidas
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tight text-white">
                Perguntas Frequentes
              </h3>
            </div>

            <div className="bg-slate-950 border border-white/10 p-6 sm:p-8 rounded-3xl divide-y divide-white/10">
              {FAQS.map((faq, idx) => (
                <FaqItem key={idx} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>

      </main>



      {/* MODAL DE AMPLIAÇÃO / ZOOM DO EQUIPAMENTO */}
      <ImageModal
        item={selectedImage}
        onClose={() => setSelectedImage(null)}
        onContactWhatsApp={(title) => openWhatsApp(`Gostaria de um orçamento para o equipamento: ${title}`)}
      />

      <SiteFooter />
    </div>
  );
}

/* ============================
   ROUTER & APP ROOT
   ============================ */

export default function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
  }, []);

  return (
    <Router>
      <VisitLogger authUser={authUser} />
      <FloatingWhatsApp />
      <Routes>
        {/* HOMEPAGE MODERNIZADA */}
        <Route path="/" element={<CFTVSite authUser={authUser} />} />
        
        {/* OS 5 PILARES DE SERVIÇOS DEDICADOS & LINHA MIBO */}
        <Route path="/seguranca-eletronica" element={<SegurancaEletronicaPage />} />
        <Route path="/linha-mibo" element={<LinhaMiboPage />} />
        <Route path="/redes-computadores" element={<RedesComputadoresPage />} />
        <Route path="/instalacoes-eletricas" element={<InstalacoesEletricasPage />} />
        <Route path="/cerca-eletrica" element={<CercaEletricaPage />} />
        <Route path="/video-porteiro-automacao" element={<VideoPorteiroAutomacaoPage />} />

        {/* ROTAS EXISTENTES PRESERVADAS */}
        <Route path="/cftv-inteligente" element={<CftvInteligente />} />
        <Route path="/controle-acesso" element={<ControleAcesso />} />
        <Route path="/rede-estruturada" element={<RedeEstruturada />} />
        <Route path="/projetos-corporativos" element={<ProjetosCorporativos />} />
        <Route path="/seguranca-eletronica-brasilia" element={<SegurancaBrasilia />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/manager" element={<ServiceManager />} />
        <Route path="/ndsdashboard" element={<ServiceManager />} />
        
        {/* FALLBACK */}
        <Route path="*" element={<CFTVSite authUser={authUser} />} />
      </Routes>
    </Router>
  );
}

/* ============================
   LOGGER DE VISITAS (FIREBASE PRESERVADO)
   ============================ */

function VisitLogger({ authUser }: { authUser: User | null }) {
  const location = useLocation();

  useEffect(() => {
    const logVisit = async () => {
      try {
        const sessionKey = `nds_visited_${location.pathname.replace(/\//g, '_')}`;
        const lastVisit = localStorage.getItem(sessionKey);
        const today = new Date().toDateString();

        if (lastVisit !== today) {
          const ua = navigator.userAgent;
          let device = "Desktop";
          if (/android/i.test(ua)) device = "Android";
          else if (/iPad|iPhone|iPod/.test(ua)) device = "iOS";

          const urlParams = new URLSearchParams(window.location.search);
          const rawReferrer = document.referrer;
          const referrer = rawReferrer.toLowerCase();
          let source = "Direto";

          if (urlParams.has('gclid') || (urlParams.has('utm_medium') && urlParams.get('utm_medium')?.includes('cpc'))) {
            source = "Google Ads";
          } else if (referrer.includes('google.com')) {
            source = "Busca Google";
          } else if (referrer.includes('openai.com') || referrer.includes('chatgpt') || referrer.includes('bing.com') || referrer.includes('perplexity')) {
            source = "IA (ChatGPT/Bing)";
          } else if (referrer.includes('instagram.com') || referrer.includes('l.instagram.com')) {
            source = "Instagram";
          } else if (referrer.includes('facebook') || referrer.includes('fb.com') || referrer.includes('t.co') || referrer.includes('linkedin')) {
            source = "Rede Social";
          }

          let pageName = "CFTV Home";
          if (location.pathname === '/manager' || location.pathname === '/ndsdashboard') pageName = "Service Manager";
          else if (location.pathname.length > 1) pageName = location.pathname.replace('/', '');

          const isDev = window.location.hostname.includes('localhost') || 
                        window.location.hostname.includes('ais-dev');
          
          const adminFlag = localStorage.getItem('nds_is_admin');
          const isOwnerEmail = authUser?.email === 'maninhoneeto@gmail.com' || authUser?.email?.includes('maninhoneeto');
          
          if (adminFlag === 'true' || isOwnerEmail) return;

          const docRef = await addDoc(collection(db, 'visits'), {
            timestamp: serverTimestamp(),
            userAgent: ua,
            device: device,
            source: source,
            utm_source: urlParams.get('utm_source') || null,
            utm_medium: urlParams.get('utm_medium') || null,
            utm_campaign: urlParams.get('utm_campaign') || null,
            language: navigator.language,
            screen: `${window.screen.width}x${window.screen.height}`,
            referrer: rawReferrer || 'Direto',
            page: pageName,
            isTest: isDev,
            environment: isDev ? 'Development/Preview' : 'Production',
            userEmail: authUser?.email || null,
            userName: authUser?.displayName || null,
            userProvider: authUser?.providerData[0]?.providerId || null
          });
          localStorage.setItem('nds_visit_id', docRef.id);
          localStorage.setItem(sessionKey, today);
        }
      } catch (e) {
        console.error('Error logging visit:', e);
      }
    };
    logVisit();
  }, [location.pathname, authUser]);

  return null;
}
