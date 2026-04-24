import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Menu, X, ChevronDown, MessageCircle, 
  Shield, Camera, Server, Key, Zap, Power, Wifi, Wrench, HelpCircle,
  Smartphone, BellRing, ChevronRight, Phone, Instagram, MapPin, Award
} from 'lucide-react';

import { IMAGES } from './constants/images';

/* ============================
   DATA & CONFIG
   ============================ */

const SERVICES = [
  { id: 'cameras', label: 'Câmeras IP', icon: Camera, img: IMAGES.SERVICE_CAMERAS, desc: 'Monitoramento Intelbras em alta definição 4K. Câmeras Dome e Bullet de elite com visão noturna colorida.' },
  { id: 'smart', label: 'Linha Mibo', icon: Smartphone, img: IMAGES.SERVICE_MIBO, desc: 'Câmeras inteligentes Wi-Fi Intelbras. Praticidade e segurança com acompanhamento inteligente via celular.' },
  { id: 'videoporteiro', label: 'Vídeo Porteiros', icon: BellRing, img: IMAGES.SERVICE_PORTEIRO, desc: 'Sistemas Allo de vídeo interfonia com abertura de fechadura remota e imagem em alta definição.' },
  { id: 'dvr', label: 'Gravadores', icon: Server, img: IMAGES.SERVICE_DVR, desc: 'DVRs e NVRs Multi-HD Intelbras. Estabilidade total para o armazenamento das suas gravações 24h.' },
  { id: 'acesso', label: 'Biometria', icon: Key, img: IMAGES.SERVICE_ACESSO, desc: 'Controle de acesso seguro com tecnologia biométrica e facial Intelbras para condomínios e empresas.' },
  { id: 'cerca', label: 'Cerca Elétrica', icon: Zap, img: IMAGES.SERVICE_CERCA, desc: 'Instalação técnica de cerca elétrica com centrais de alta voltagem e hastes reforçadas padrão NDS.' },
  { id: 'alarme', label: 'Alarmes', icon: Shield, img: IMAGES.SERVICE_ALARME, desc: 'Alarmes sem fio AMT 8000. Inteligência e rapidez com disparo direto no seu smartphone.' },
  { id: 'ti', label: 'Redes e TI', icon: Wifi, img: IMAGES.SERVICE_TI, desc: 'Infraestrutura robusta de TI, Wi-Fi de alta performance e cabeamento estruturado padrão cat6.' },
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
  { q: 'A NDS CFTV atende quais regiões?', a: 'Atendemos todo o Distrito Federal, com foco em Águas Claras, Asa Sul, Asa Norte, Guará e Lago Sul.' },
  { q: 'Qual a garantia das instalações?', a: 'Equipamentos possuem 1 ano de garantia de fábrica. Nossa instalação possui garantia técnica de 90 dias.' },
  { q: 'Posso ver as câmeras pelo celular?', a: 'Sim! Configuramos o acesso remoto em todos os seus dispositivos (celular, tablet e computador).' },
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    const phone = "5561998308655";
    const msg = encodeURIComponent("Olá NDS! Vim pelo site e gostaria de um orçamento.");
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

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
            {['Serviços', 'Projetos', 'Sobre', 'Dúvidas'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-xs font-black uppercase tracking-widest transition-colors ${isScrolled ? 'text-slate-600 hover:text-cyan-500' : 'text-slate-600 md:text-white/80 md:hover:text-white'}`}>
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
              {['Serviços', 'Projetos', 'Sobre', 'Dúvidas'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                  {item}
                </a>
              ))}
            </div>
            <button onClick={openWhatsApp} className="mt-auto w-full bg-cyan-600 text-white py-5 rounded-2xl font-black text-xl uppercase tracking-tighter">
              Solicitar Orçamento
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-40 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
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
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-8">
              Segurança <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Inteligente</span>
            </h1>
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

          {/* Floating Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1 }}
            className="hidden lg:block relative"
          >
            <div className="w-[500px] h-[500px] bg-cyan-500/20 absolute -inset-20 blur-[100px] rounded-full" />
            <img 
              src={IMAGES.SERVICE_MIBO} 
              referrerPolicy="no-referrer"
              className="relative z-10 w-full object-contain drop-shadow-[0_0_50px_rgba(6,182,212,0.3)]" 
              alt="Mibo Camera"
            />
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
      <section id="sobre" className="py-24 bg-slate-50 overflow-hidden">
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
              <SectionTitle 
                title="Liderando a Segurança no DF" 
                subtitle="Desde 2011, a NDS CFTV Digital entrega o que há de mais moderno em proteção e monitoramento." 
              />
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  A <span className="font-bold text-slate-900">NDS CFTV Digital</span> consolidou-se como referência absoluta em segurança eletrônica no Distrito Federal. Com uma trajetória iniciada há mais de uma década, transformamos a forma como brasilienses protegem o que é mais valioso.
                </p>
                <p>
                  Nossa expertise vai além da simples instalação; entregamos projetos estratégicos de <span className="text-cyan-600 font-bold">Monitoramento IP, Alarmes e Automação</span>. Somos parceiros autorizados das maiores marcas do mundo, com foco total na excelência dos equipamentos <span className="font-bold">Intelbras</span>.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-6">
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
                    <span className="text-sm font-bold text-slate-800 uppercase tracking-tighter">Projetos no DF</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-cyan-500 w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-bold text-slate-800 uppercase tracking-tighter">Garantia Total</span>
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
             </div>
          </div>
          
          <div className="flex gap-10">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Phone /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><MapPin /></a>
          </div>

          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-600">Brasília - Distrito Federal</p>
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
