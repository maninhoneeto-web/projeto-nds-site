import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Menu, X, ChevronDown, MessageCircle, 
  Shield, Camera, Server, Key, Zap, Power, Wifi, Wrench, HelpCircle,
  Smartphone, BellRing, ChevronRight, Phone, Instagram, MapPin, Award, Star
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from './lib/firebase';

import { IMAGES } from './constants/images';
import { PartnerProgram } from './components/PartnerProgram';
import { ServiceManager } from './components/ServiceManager';

/* ============================
   DATA & CONFIG
   ============================ */

const SERVICES = [
  { id: 'ia', label: 'Monitoramento IA', icon: Zap, img: IMAGES.PORTFOLIO_PTZ, desc: 'Analíticos de vídeo avançados com Inteligência Artificial para detecção facial, leitura de placas e proteção de perímetro.' },
  { id: 'cameras', label: 'Câmeras IP', icon: Camera, img: IMAGES.SERVICE_CAMERAS, desc: 'Monitoramento Intelbras em alta definição 4K. Câmeras de elite com visão noturna colorida e processamento de imagem.' },
  { id: 'smart', label: 'Linha Mibo', icon: Smartphone, img: IMAGES.SERVICE_MIBO, desc: 'Câmeras inteligentes Wi-Fi Intelbras. Praticidade e segurança com acompanhamento inteligente via smartphone.' },
  { id: 'videoporteiro', label: 'Vídeo Porteiros', icon: BellRing, img: IMAGES.SERVICE_PORTEIRO, desc: 'Sistemas Allo de vídeo interfonia com abertura de fechadura remota e imagem cristalina.' },
  { id: 'dvr', label: 'Gravadores', icon: Server, img: IMAGES.SERVICE_DVR, desc: 'DVRs e NVRs Multi-HD Intelbras. Estabilidade total para o armazenamento das suas gravações 24h por dia.' },
  { id: 'acesso', label: 'Biometria', icon: Key, img: IMAGES.SERVICE_ACESSO, desc: 'Controle de acesso seguro com tecnologia biométrica e reconhecimento facial de última geração.' },
  { id: 'alarme', label: 'Alarmes Smart', icon: Shield, img: IMAGES.SERVICE_ALARME, desc: 'Centrais AMT 8000 totalmente sem fio. Notificações em tempo real e inteligência contra invasões.' },
  { id: 'ti', label: 'Redes e TI', icon: Wifi, img: IMAGES.SERVICE_TI, desc: 'Infraestrutura de rede robusta e Wi-Fi de alta performance para suportar sistemas de segurança modernos.' },
];

const PORTFOLIO = [
  { id: 1, title: 'Speed Dome PTZ', model: 'VIP 8232', img: IMAGES.PORTFOLIO_PTZ },
  { id: 2, title: 'Monitoramento IP', model: 'VIP 1130 B', img: IMAGES.PORTFOLIO_BULLET },
  { id: 3, title: 'Central NVR', model: 'MHDX 1108', img: IMAGES.PORTFOLIO_NVR },
  { id: 4, title: 'Fechadura Eletrônica', model: 'FR 201', img: IMAGES.PORTFOLIO_LOCK },
  { id: 5, title: 'Vídeo Porteiro WT7', model: 'Allo Intelbras PoE', img: IMAGES.PORTFOLIO_PORTEIRO },
  { id: 6, title: 'Rack TI', model: 'Infraestrutura', img: IMAGES.PORTFOLIO_RACK },
];

const FAQS = [
  { q: 'A NDS CFTV atende quais regiões?', a: 'Atendemos todas as regiões do Distrito Federal, incluindo Águas Claras, Asa Sul, Asa Norte, Guará, Lago Sul, Lago Norte, Park Way e demais localidades.' },
  { q: 'Qual a garantia das instalações?', a: 'Equipamentos possuem 1 ano de garantia de fábrica. Nossa instalação possui garantia técnica de 90 dias.' },
  { q: 'Posso ver as câmeras pelo celular?', a: 'Sim! Configuramos o acesso remoto em todos os seus dispositivos (celular, tablet e computador).' },
];

const TESTIMONIALS = [
  { id: 1, name: 'Ricardo Santos', rating: 5, comment: 'Excelente atendimento. Instalaram as câmeras em casa com muita rapidez e o sistema ficou perfeito. Recomendo!', date: 'há 2 meses' },
  { id: 2, name: 'Agropet', rating: 5, comment: 'Profissionais de alto nível. O sistema de monitoramento IP da Intelbras que colocaram aqui é fantástico. Visualização clara.', date: 'há 1 mês' },
  { id: 3, name: 'Rodrigo Mendonça', rating: 5, comment: 'Sempre que precisamos de manutenção na cerca elétrica ou no interfone, a NDS nos atende prontamente. Serviço de confiança.', date: 'há 3 semanas' },
  { id: 4, name: 'Maria Eduarda', rating: 5, comment: 'Amei a minha fechadura eletrônica! Instalação limpa e me explicaram tudo sobre como usar o app Mibo.', date: 'há 2 semanas' },
];

/* ============================
   COMPONENTS
   ============================ */

interface FaqItemProps {
  question: string;
  answer: string;
  key?: React.Key;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-slate-200 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{question}</span>
        <ChevronDown className={`w-5 h-5 text-cyan-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionTitle({ title, subtitle, light }: { title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="mb-12">
      <motion.span 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="text-cyan-500 font-black uppercase tracking-[0.4em] text-[10px] mb-3 block"
      >
        NDS CFTV Digital
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className={`text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none ${light ? 'text-white' : 'text-slate-900'}`}
      >
        {title}
      </motion.h2>
      {subtitle && <p className={`mt-4 max-w-xl ${light ? 'text-slate-400' : 'text-slate-600'}`}>{subtitle}</p>}
      <div className="h-1 w-12 bg-cyan-500 mt-6" />
    </div>
  );
}

/* ============================
   MAIN PAGE
   ============================ */

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<null | { title: string; desc: string; img: string }>(null);
  const [currentHash, setCurrentHash] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/manager' || path.endsWith('/manager') || path.includes('/manager/')) {
      return '#manager';
    }
    return window.location.hash;
  });
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const isManagerPath = path === '/manager' || path.endsWith('/manager') || path.includes('/manager/');
      
      if (isManagerPath) {
        setCurrentHash('#manager');
        if (window.location.hash !== '#manager') {
          window.location.hash = '#manager';
        }
      } else {
        setCurrentHash(window.location.hash);
      }
    };

    handleLocationChange(); // Initial check

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const HERO_SLIDES = [
    {
      image: IMAGES.SERVICE_MIBO,
      title: 'Mibo iM5',
      desc: '"Amei a minha fechadura eletrônica! Instalação limpa e me explicaram tudo sobre como usar o app Mibo." - Maria Eduarda'
    },
    {
      image: IMAGES.SERVICE_CAMERAS,
      title: 'Monitoramento 4K',
      desc: '"Excelente atendimento. Instalaram as câmeras em casa com muita rapidez e o sistema ficou perfeito." - Ricardo Santos'
    },
    {
      image: IMAGES.PORTFOLIO_PTZ,
      title: 'Speed Dome PTZ',
      desc: '"Profissionais de alto nível. O sistema de monitoramento IP da Intelbras é fantástico." - Agropet'
    }
  ];

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [HERO_SLIDES.length]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const logVisit = async () => {
      try {
        const sessionKey = 'nds_visited_v5'; // Forçando novo log para novos campos
        const lastVisit = localStorage.getItem(sessionKey);
        const today = new Date().toDateString();

        if (lastVisit !== today) {
          const ua = navigator.userAgent;
          let device = "Desktop";
          if (/android/i.test(ua)) device = "Android";
          else if (/iPad|iPhone|iPod/.test(ua)) device = "iOS";

          // --- Detecção de Origem Expandida ---
          const urlParams = new URLSearchParams(window.location.search);
          const rawReferrer = document.referrer;
          const referrer = rawReferrer.toLowerCase();
          let source = "Direto";

          // 1. Google Ads (GCLID)
          if (urlParams.has('gclid') || urlParams.has('utm_medium') && urlParams.get('utm_medium')?.includes('cpc')) {
            source = "Google Ads";
          } 
          // 2. Google Search (Orgânico)
          else if (referrer.includes('google.com')) {
            source = "Busca Google";
          }
          // 3. IAs (ChatGPT, Gemini, etc)
          else if (referrer.includes('openai.com') || referrer.includes('chatgpt') || referrer.includes('bing.com') || referrer.includes('perplexity')) {
            source = "IA (ChatGPT/Bing)";
          }
          // 4. Redes Sociais
          else if (referrer.includes('instagram.com') || referrer.includes('l.instagram.com')) {
            source = "Instagram";
          }
          else if (referrer.includes('facebook') || referrer.includes('fb.com') || referrer.includes('t.co') || referrer.includes('linkedin')) {
            source = "Rede Social";
          }
          
          // 5. Parâmetros UTM específicos (sobrescrevem detecção automática se presentes)
          if (urlParams.get('utm_source')) {
            const utm = urlParams.get('utm_source');
            if (utm === 'google') source = "Busca Google";
            else if (utm === 'ig' || utm === 'instagram') source = "Instagram";
            else source = utm || source;
          }

          await addDoc(collection(db, 'visits'), {
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
            page: window.location.pathname === '/' ? (window.location.hash || 'home') : window.location.pathname,
            userEmail: authUser?.email || null,
            userName: authUser?.displayName || null,
            userProvider: authUser?.providerData[0]?.providerId || null
          });
          localStorage.setItem(sessionKey, today);
        }
      } catch (e) {
        console.error('Error logging visit:', e);
      }
    };
    logVisit();
  }, [authUser]);

  const openWhatsApp = () => {
    const phone = "5561998308655";
    const msg = encodeURIComponent("Olá NDS! Vim pelo site e gostaria de um orçamento.");
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  if (currentHash === '#parceria') {
    return <PartnerProgram />;
  }

  if (currentHash === '#manager') {
    return <ServiceManager />;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col selection:bg-cyan-500 selection:text-white">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-slate-950 border-b border-white/5 py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <img 
               src={IMAGES.LOGO} 
               alt="NDS" 
               referrerPolicy="no-referrer"
               className="w-12 h-12 md:w-20 md:h-20 object-cover rounded-xl shadow-xl border-2 border-white/10" 
             />
             <div className="leading-none">
               <span className={`text-2xl md:text-3xl font-black tracking-tighter ${isScrolled ? 'text-slate-900' : 'text-white'}`}>NDS<span className="text-cyan-500">CFTV</span></span>
               <p className={`text-[10px] md:text-xs uppercase tracking-[0.4em] font-black ${isScrolled ? 'text-slate-500' : 'text-cyan-400'}`}>Digital</p>
             </div>
          </div>

          {/* Links Desktop */}
          <div className="hidden lg:flex items-center gap-10">
            {['Serviços', 'Projetos', 'Sobre Nós', 'Dúvidas'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className={`text-xs font-black uppercase tracking-widest transition-colors ${isScrolled ? 'text-slate-600 hover:text-cyan-500' : 'text-slate-600 md:text-white/80 md:hover:text-white'}`}>
                {item}
              </a>
            ))}
            <button 
              onClick={openWhatsApp}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-7 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              Orçamento
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-slate-900 p-2">
            <Menu />
          </button>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[200] bg-white p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black tracking-tighter text-slate-900">NDS<span className="text-cyan-500">CFTV</span></span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2"><X /></button>
            </div>
            <div className="flex flex-col gap-8">
              {['Serviços', 'Projetos', 'Sobre Nós', 'Dúvidas'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                  {item}
                </a>
              ))}
              <a href="#manager" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black text-slate-400 uppercase tracking-tighter border-t border-slate-100 pt-8">
                Painel Administrativo
              </a>
            </div>
            <button onClick={openWhatsApp} className="mt-auto w-full bg-cyan-600 text-white py-5 rounded-2xl font-black text-xl uppercase tracking-tighter">
              Solicitar Orçamento
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-40 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Floating Video 1 - Security */}
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              rotate: [5, 2, 5],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-96 aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl skew-y-3 opacity-30 blur-[1px] hidden xl:block z-10"
          >
            <video 
              src="https://assets.mixkit.co/videos/preview/mixkit-security-cameras-on-a-city-street-11440-large.mp4" 
              autoPlay muted loop playsInline 
              className="w-full h-full object-cover" 
            />
          </motion.div>

          {/* Floating Video 2 - Data/Network */}
          <motion.div
            animate={{ 
              y: [0, 30, 0],
              rotate: [-5, -2, -5],
              scale: [1, 0.95, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 -right-20 w-96 aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl -skew-y-3 opacity-30 blur-[1px] hidden xl:block z-10"
          >
            <video 
              src="https://assets.mixkit.co/videos/preview/mixkit-technology-server-room-rack-closet-4456-large.mp4" 
              autoPlay muted loop playsInline 
              className="w-full h-full object-cover" 
            />
          </motion.div>

          <img 
            src={IMAGES.HERO} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-30" 
            alt="NDS CFTV Segurança Digital" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent opacity-90" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-8">
              <Award className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-[10px] uppercase font-black tracking-widest">Tecnologia NDS CFTV</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-2">
              NDS CFTV DIGITAL
            </h1>
            <h2 className="text-xl md:text-3xl font-black text-cyan-400 uppercase tracking-[0.2em] mb-8">
              Segurança Eletrônica e Redes Cabeada
            </h2>
            <p className="text-slate-300 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-light">
              Projetos personalizados de monitoramento, automação e proteção patrimonial no Distrito Federal. Tecnologia de ponta ao seu alcance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openWhatsApp}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest transition-all shadow-[0_10px_40px_rgba(6,182,212,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                Falar com Especialista
              </button>
              <a href="#serviços" className="border border-white/10 hover:bg-white/5 text-white px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest transition-all text-center">
                Ver Catálogo
              </a>
            </div>
          </motion.div>

          {/* Hero Slider */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1 }}
            className="hidden lg:flex flex-col items-center relative"
          >
            <div className="w-[500px] h-[500px] bg-cyan-500/20 absolute -inset-20 blur-[100px] rounded-full" />
            
            <div className="relative z-10 w-full aspect-square max-w-[450px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeroSlide}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <img 
                    src={HERO_SLIDES[currentHeroSlide].image} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(6,182,212,0.3)] mb-8" 
                    alt={HERO_SLIDES[currentHeroSlide].title}
                  />
                  
                  {/* Floating Review Card */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl max-w-sm"
                  >
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                      ))}
                    </div>
                    <p className="text-white text-sm font-medium italic leading-relaxed text-center">
                      {HERO_SLIDES[currentHeroSlide].desc}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Dots */}
            <div className="flex gap-2 mt-20 z-20">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentHeroSlide(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${i === currentHeroSlide ? 'w-10 bg-cyan-500' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="serviços" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionTitle title="Nossos Serviços" subtitle="Equipamentos testados e aprovados com o padrão de qualidade Intelbras." />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((s, idx) => (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedDetail({ title: s.label, desc: s.desc, img: s.img })}
                className="group p-2 bg-[#f8fafc] rounded-[2.5rem] hover:bg-slate-900 transition-all duration-500 cursor-pointer overflow-hidden border border-slate-100"
              >
                <div className="relative h-48 rounded-[2rem] overflow-hidden mb-4">
                  <img 
                    src={s.img} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={s.label} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                      <s.icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-white uppercase tracking-tighter mb-2">{s.label}</h3>
                  <div className="flex items-center gap-2 text-cyan-600 font-bold text-[10px] uppercase tracking-widest">
                    <span>Ver Detalhes</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="sobrenós" className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src={IMAGES.INSTALACAO} 
                  referrerPolicy="no-referrer"
                  alt="Instalação Profissional" 
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-12 bg-cyan-500"></div>
                <span className="text-cyan-600 font-black uppercase text-[10px] tracking-[0.3em]">Conheça a NDS</span>
              </div>
              <SectionTitle 
                title="Sobre Nós" 
                subtitle="Liderando a segurança eletrônica no DF com inovação e confiança desde 2011." 
              />
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  A <span className="font-bold text-slate-900">NDS CFTV Digital</span> consolidou-se como referência absoluta em segurança eletrônica no Distrito Federal. Com uma trajetória iniciada <span className="text-cyan-600 font-bold px-1.5 py-0.5 bg-cyan-50 rounded-lg">+ de 13 anos</span> atrás, transformamos a forma como brasilienses protegem o que é mais valioso.
                </p>
                <p>
                  Nossa expertise vai além da simples instalação; entregamos projetos estratégicos de <span className="text-cyan-600 font-bold">Monitoramento IP, Alarmes e Automação</span>. Somos parceiros autorizados das maiores marcas do mundo, com foco total na excelência dos equipamentos <span className="font-bold">Intelbras</span>.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-6 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-cyan-500 w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-bold text-slate-800 uppercase tracking-tighter">Suporte Técnico 24h</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-cyan-500 w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-bold text-slate-800 uppercase tracking-tighter">Equipe Certificada</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-cyan-500 w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-bold text-slate-800 uppercase tracking-tighter">Atendimento em todo o DF</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-cyan-500 w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-bold text-slate-800 uppercase tracking-tighter">Garantia Total</span>
                  </div>
                </div>

                {/* Trust Seal */}
                <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 max-w-xs transition-transform hover:scale-105">
                  <div className="w-14 h-14 bg-gradient-to-tr from-cyan-600 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 leading-none">13+ Anos</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Selo de Confiança</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="projetos" className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionTitle title="Produtos de Elite" subtitle="As melhores câmeras e sistemas de segurança do mercado." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PORTFOLIO.map((item) => (
              <motion.div 
                key={item.id} 
                whileHover={{ y: -5 }} 
                className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 group cursor-pointer"
                onClick={() => setSelectedDetail({ title: item.title, desc: `Equipamento Intelbras de alta performance para monitoramento profissional. Modelo: ${item.model}. Garantia de 1 ano.`, img: item.img })}
              >
                <div className="h-56 bg-white flex items-center justify-center p-8 overflow-hidden relative">
                  <img 
                    src={item.img} 
                    referrerPolicy="no-referrer"
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    alt={item.title} 
                  />
                  <div className="absolute inset-0 bg-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-cyan-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Ver Detalhes</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-black text-slate-900 uppercase tracking-tighter">{item.title}</h4>
                  <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest mt-1">{item.model}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionTitle title="Tecnologia em Ação" subtitle="Confira alguns dos equipamentos de última geração que utilizamos em nossos projetos." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              IMAGES.PORTFOLIO_PTZ,
              IMAGES.SERVICE_MIBO,
              IMAGES.SERVICE_PORTEIRO,
              IMAGES.PORTFOLIO_BULLET,
              IMAGES.SERVICE_DVR,
              IMAGES.SERVICE_ACESSO
            ].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="h-48 lg:h-64 rounded-3xl overflow-hidden shadow-lg group"
              >
                <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Equipamento NDS" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionTitle 
            title="O que dizem nossos clientes" 
            subtitle="Confira as avaliações de quem já protege o seu patrimônio com a NDS CFTV Digital no DF." 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 italic leading-relaxed mb-6">"{t.comment}"</p>
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <p className="font-black text-slate-900 uppercase tracking-tighter">{t.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t.date}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.open('https://www.google.com/search?q=NDS+CFTV+Digital+Google+Reviews', '_blank')}
              className="inline-flex items-center gap-3 bg-white border-2 border-slate-200 hover:border-cyan-500 text-slate-900 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all group shadow-sm w-full sm:w-auto justify-center"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
              <span>Ver todas as avaliações</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => window.open('https://g.page/r/CcJR2aqm4LV_EBE/review', '_blank')}
              className="inline-flex items-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all group shadow-lg shadow-cyan-500/20 w-full sm:w-auto justify-center"
            >
              <Star className="w-4 h-4 fill-white" />
              <span>Deixe sua avaliação</span>
            </button>
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="py-16 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 px-12 flex flex-wrap items-center justify-center gap-12 grayscale opacity-50 contrast-125">
          <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase grayscale">Intelbras</span>
          <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase grayscale">WD Purple</span>
          <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase grayscale">Hikvision</span>
          <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase grayscale">PPA</span>
        </div>
      </section>

      {/* MAINTENANCE CTA */}
      <section className="bg-cyan-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Wrench className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">Manutenção de Urgência?</h2>
          <p className="text-cyan-100 text-lg mb-10 opacity-80">Sistemas de segurança não podem parar. Atendemos chamados de emergência em condomínios e empresas no DF com rapidez total.</p>
          <button 
            onClick={openWhatsApp}
            className="bg-white text-cyan-700 px-12 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl hover:scale-105 transition-all"
          >
            Chamar Suporte Imediato
          </button>
        </div>
      </section>

      {/* AI TECHNOLOGY SECTION */}
      <section className="py-24 bg-slate-900 border-y border-white/5 relative overflow-hidden" id="tecnologia-ia">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.1),transparent)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <SectionTitle 
                light
                title="Segurança Potencializada por IA"
                subtitle="Nossos sistemas não apenas gravam imagens, eles entendem o que está acontecendo em tempo real."
              />
              <div className="space-y-6">
                {[
                  { t: 'Reconhecimento Facial', d: 'Identificação instantânea de pessoas autorizadas e alerta para desconhecidos.' },
                  { t: 'Analíticos de Comportamento', d: 'Detecção de intrusão, abandono de objetos e cruzamento de linha virtual.' },
                  { t: 'Leitura de Placas (LPR)', d: 'Controle total de entrada e saída de veículos com registro automatizado.' },
                  { t: 'Busca Inteligente', d: 'Encontre eventos específicos em segundos, filtrando por cor de roupa ou tipo de objeto.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-tight text-sm mb-1">{item.t}</h4>
                      <p className="text-slate-400 text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img 
                src={IMAGES.PORTFOLIO_PTZ} 
                alt="Tecnologia IA" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 p-6 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center animate-pulse">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-cyan-400 text-[10px] uppercase font-black tracking-widest">IA ATIVA</p>
                    <p className="text-white font-bold text-lg">Proteção 24/7 com análise preditiva</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="duvídas" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionTitle title="Dúvidas Comuns" light />
          <div className="max-w-3xl mt-12">
            {FAQS.map((f, i) => (
              <FaqItem key={i} question={f.q} answer={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <img 
               src={IMAGES.LOGO} 
               alt="NDS" 
               referrerPolicy="no-referrer"
               className="w-12 h-12 md:w-20 md:h-20 object-cover rounded-xl shadow-xl" 
             />
             <div className="leading-none text-left">
               <span className="text-lg font-black tracking-tighter text-white">NDS<span className="text-cyan-500">CFTV</span></span>
               <p className="text-[8px] uppercase tracking-widest font-bold text-slate-500">Digital © 2026</p>
               <a href="#manager" className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 hover:text-cyan-500 transition-all mt-2 flex items-center gap-1 group">
                 <Shield className="w-3 h-3 transition-transform group-hover:scale-110" />
                 Controle de Acesso
               </a>
             </div>
          </div>
          
          <div className="flex gap-10">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Phone /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><MapPin /></a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-600 mb-1">Brasília - Distrito Federal</p>
            <p className="text-[8px] uppercase font-bold tracking-[0.2em] text-slate-700">Atendemos Águas Claras, Asas Sul/Norte, Lago Sul/Norte, Park Way, Guará e todas as regiões do DF</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <button 
        onClick={openWhatsApp}
        className="fixed bottom-8 right-8 z-[150] bg-green-500 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tighter whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Fale no WhatsApp</span>
      </button>

      {/* DETAIL MODAL - VERSÃO ULTRA ESTÁVEL */}
      {selectedDetail && (
        <div 
          className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-sm"
          onClick={() => setSelectedDetail(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedDetail(null)}
              className="absolute top-4 right-4 z-50 bg-white shadow-lg p-2 rounded-full text-slate-900 border border-slate-200"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full md:w-1/2 bg-slate-100 flex items-center justify-center p-6">
              <img 
                src={selectedDetail.img} 
                alt={selectedDetail.title} 
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[300px] md:max-h-[500px] object-contain shadow-2xl rounded-lg" 
              />
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="w-10 h-1 bg-cyan-500 mb-6" />
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">{selectedDetail.title}</h2>
              <p className="text-slate-600 leading-relaxed mb-8">{selectedDetail.desc}</p>
              
              <button 
                onClick={openWhatsApp}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all"
              >
                Solicitar via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
