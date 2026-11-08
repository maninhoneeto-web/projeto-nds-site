import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Shield, Wifi, Zap, Lock, BellRing, ChevronRight } from 'lucide-react';
import { IMAGES } from '../constants/images';

export function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoTimer, setLogoTimer] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoDown = () => {
    const timer = setTimeout(() => {
      navigate('/ndsdashboard');
    }, 3000);
    setLogoTimer(timer);
  };

  const handleLogoUp = () => {
    if (logoTimer) {
      clearTimeout(logoTimer);
      setLogoTimer(null);
    }
  };

  const openWhatsApp = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18323711854/SimhCIKn-tAcEO7OtqFE'
      });
    }
    const phone = "5561998308655";
    const msg = encodeURIComponent("Olá NDS! Vim pelo site e gostaria de solicitar um orçamento para meu projeto em Brasília.");
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const NAV_LINKS = [
    { label: 'Início', path: '/' },
    { label: 'Segurança Eletrônica', path: '/seguranca-eletronica' },
    { label: 'Linha Mibo Wi-Fi', path: '/linha-mibo' },
    { label: 'Redes de TI', path: '/redes-computadores' },
    { label: 'Elétrica', path: '/instalacoes-eletricas' },
    { label: 'Cerca Elétrica', path: '/cerca-eletrica' },
    { label: 'Vídeo Porteiro & Automação', path: '/video-porteiro-automacao' },
    { label: 'Blog', path: '/blog' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isScrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-2xl py-3 border-b border-cyan-500/20' : 'bg-slate-950/90 backdrop-blur-sm py-4 border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO ORIGINAL DA NDS CFTV DIGITAL - 100% PRESERVADA */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer select-none group"
          onMouseDown={handleLogoDown}
          onMouseUp={handleLogoUp}
          onTouchStart={handleLogoDown}
          onTouchEnd={handleLogoUp}
          onClick={() => {
            if (location.pathname !== '/') navigate('/');
          }}
          title="NDS CFTV Digital - Segurança e Tecnologia"
        >
          <img 
            src={IMAGES.LOGO} 
            alt="NDS CFTV Digital" 
            referrerPolicy="no-referrer"
            className="w-11 h-11 sm:w-13 sm:h-13 object-contain rounded-xl shadow-md border border-cyan-500/20 group-hover:border-cyan-400 transition-colors"
          />
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
              NDS<span className="text-cyan-400">CFTV</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold -mt-1">
              Digital • Brasília - DF
            </span>
          </div>
        </div>

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="hidden xl:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-bold uppercase tracking-wider transition-colors py-1 relative ${
                  isActive ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* BOTÃO CTA WHATSAPP (AMARELO VIBRANTE COM GTAG) */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={openWhatsApp}
            className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>(61) 99830-8655</span>
          </button>
        </div>

        {/* BOTÃO MENU MOBILE */}
        <div className="xl:hidden flex items-center gap-2">
          <button
            onClick={openWhatsApp}
            className="sm:hidden p-2 bg-amber-400 text-slate-950 rounded-lg active:scale-95"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-slate-950" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-white/10"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE EXPANSÍVEL */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-cyan-500/20 px-6 py-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider ${
                    isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsApp();
              }}
              className="w-full bg-amber-400 text-slate-950 font-black py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Solicitar Orçamento no WhatsApp</span>
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-2">
              Atendimento em Brasília e Regiões do DF
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
