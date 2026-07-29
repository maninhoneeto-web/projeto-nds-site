import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOHelper } from './SEOHelper';
import { 
  MapPin, ArrowLeft, Shield, Eye, BellRing, CheckCircle2, MessageCircle 
} from 'lucide-react';
import { IMAGES } from '../constants/images';

export function SegurancaBrasilia() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openWhatsApp = () => {
    // Trigger Google Ads conversion event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18323711854/SimhCIKn-tAcEO7OtqFE'
      });
    }

    const phone = "5561998308655";
    const msg = encodeURIComponent("Olá NDS! Vim pela página de Segurança Eletrônica em Brasília e gostaria de uma proposta.");
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "NDS CFTV Digital",
    "image": IMAGES.LOGO,
    "@id": "https://nds-cftv-digital.com.br",
    "url": "https://nds-cftv-digital.com.br",
    "telephone": "+55-61-99830-8655",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Brasília",
      "addressRegion": "DF",
      "postalCode": "70000-000",
      "addressCountry": "BR"
    },
    "description": "Líder em segurança eletrônica, monitoramento IP inteligente de câmeras 4K e redes de alto padrão no Distrito Federal.",
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Asa Sul" },
      { "@type": "AdministrativeArea", "name": "Asa Norte" },
      { "@type": "AdministrativeArea", "name": "Lago Sul" },
      { "@type": "AdministrativeArea", "name": "Lago Norte" },
      { "@type": "AdministrativeArea", "name": "Park Way" },
      { "@type": "AdministrativeArea", "name": "Noroeste" },
      { "@type": "AdministrativeArea", "name": "Sudoeste" },
      { "@type": "AdministrativeArea", "name": "Guará" },
      { "@type": "AdministrativeArea", "name": "Águas Claras" },
      { "@type": "AdministrativeArea", "name": "Vicente Pires" },
      { "@type": "AdministrativeArea", "name": "Jardim Botânico" }
    ]
  };

  const REGIONS = [
    "Asa Sul", "Asa Norte", "Lago Sul", "Lago Norte", "Park Way",
    "Noroeste", "Sudoeste", "Guará", "Águas Claras", "Vicente Pires", "Jardim Botânico"
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      <SEOHelper 
        title="Segurança Eletrônica em Brasília | NDS CFTV Digital"
        description="Empresa de segurança eletrônica de referência em Brasília. Atendemos Asa Sul, Asa Norte, Lago Sul, Lago Norte, Sudoeste, Águas Claras, Park Way e Noroeste com equipes certificadas."
        schema={schema}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
            <img src={IMAGES.LOGO} alt="NDS" className="w-12 h-12 object-cover rounded-xl" />
            <div className="leading-none text-left">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white">NDS<span className="text-cyan-500">CFTV</span></span>
              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-500">Digital</p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 border border-white/10 hover:bg-white/5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao Início
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.15),transparent)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full mb-6">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-[10px] uppercase font-black tracking-widest">Atendimento Presencial Premium no DF</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none mb-6">
            Segurança Eletrônica Elite em Brasília
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-10">
            A NDS CFTV Digital é a principal escolha de residências de alto padrão, condomínios sofisticados e empresas de destaque em todo o Distrito Federal.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={openWhatsApp}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-[0_5px_20px_rgba(6,182,212,0.3)]"
            >
              Consultar Minha Região no WhatsApp
            </button>
          </div>
        </div>
      </header>

      {/* REGIONS GRID SECTION */}
      <main className="py-16 max-w-7xl mx-auto px-6 md:px-12 flex-grow">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-white">Regiões Nobres Atendidas</h2>
          <div className="h-1 w-16 bg-cyan-500 mx-auto" />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm">
            Temos equipes táticas e instaladores espalhados em pontos estratégicos do DF para garantir um deslocamento ágil e suporte técnico rápido para:
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-24">
          {REGIONS.map((region, idx) => (
            <div 
              key={idx}
              className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 hover:border-cyan-500/45 transition-all hover:scale-105 text-center group cursor-pointer"
              onClick={openWhatsApp}
            >
              <MapPin className="w-6 h-6 text-cyan-500 mx-auto mb-2 group-hover:animate-bounce" />
              <div className="font-bold text-white text-base md:text-lg">{region}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Serviço Exclusivo</div>
            </div>
          ))}
        </div>

        {/* DETAILS OF SERVICES OFFERED */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img src={IMAGES.INSTALACAO} alt="NDS equipe técnica" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          </div>

          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
              Diferenciais da NDS em Brasília
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Projetos de Acordo com Normas Técnicas',
                  desc: 'Nossos projetos respeitam estritamente as diretrizes estéticas e estruturais de condomínios fechados do DF e gabaritos de Brasília.'
                },
                {
                  title: 'Suporte Técnico e SLA Ágil',
                  desc: 'Atendimento emergencial prioritário para resolver quedas ou falhas do sistema em condomínios comerciais e residenciais.'
                },
                {
                  title: 'Garantia Unificada sem Burocracia',
                  desc: 'Cobrimos hardware (garantia de fábrica até 1 ano) e serviços integrados para que você não precise se preocupar com nada.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1 uppercase tracking-tight text-sm">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-white/5 py-12 px-6 md:px-12 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img src={IMAGES.LOGO} alt="NDS" className="w-12 h-12 object-cover rounded-xl" />
            <div className="leading-none text-left">
              <span className="text-lg font-black tracking-tighter text-white">NDS<span className="text-cyan-500">CFTV</span></span>
              <p className="text-[8px] uppercase tracking-widest font-bold text-slate-500">Digital © 2026</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 max-w-md text-center md:text-right">
            Líder em monitoramento eletrônico, cercas e automação segura no Distrito Federal.
          </p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <button 
        onClick={openWhatsApp}
        className="fixed bottom-8 right-8 z-[150] bg-green-500 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
    </div>
  );
}
