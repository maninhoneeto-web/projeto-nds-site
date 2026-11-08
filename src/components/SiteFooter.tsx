import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Shield, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { IMAGES } from '../constants/images';

export function SiteFooter() {
  const openWhatsApp = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18323711854/SimhCIKn-tAcEO7OtqFE'
      });
    }
    const phone = "5561998308655";
    const msg = encodeURIComponent("Olá NDS! Vim pelo site e gostaria de solicitar um orçamento para Brasília.");
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const DF_REGIONS = [
    'Guará', 'Taguatinga', 'Asa Sul', 'Asa Norte',
    'Lago Sul', 'Lago Norte', 'Park Way', 'Noroeste', 'Sudoeste', 'Águas Claras'
  ];

  return (
    <footer className="bg-slate-950 text-white border-t border-cyan-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* COLUNA 1: LOGO E SOBRE */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={IMAGES.LOGO} 
                alt="NDS CFTV Digital" 
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-contain rounded-xl border border-cyan-500/30"
              />
              <div>
                <span className="text-2xl font-black tracking-tight text-white">NDS<span className="text-cyan-400">CFTV</span></span>
                <p className="text-[10px] uppercase tracking-widest text-slate-400">Digital • Segurança & Redes</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Especialistas em projetos de segurança eletrônica, CFTV Inteligente com equipamentos oficiais Intelbras, cabeamento estruturado, instalações elétricas e proteção perimetral no Distrito Federal.
            </p>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold pt-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Instalações Técnicas Certificadas</span>
            </div>
          </div>

          {/* COLUNA 2: SERVIÇOS PRINCIPAIS */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400 mb-4">
              Serviços Especializados
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/seguranca-eletronica" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" /> Segurança Eletrônica & CFTV IP
                </Link>
              </li>
              <li>
                <Link to="/linha-mibo" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Câmeras Wi-Fi Linha Mibo
                </Link>
              </li>
              <li>
                <Link to="/redes-computadores" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" /> Redes & Cabeamento Estruturado
                </Link>
              </li>
              <li>
                <Link to="/instalacoes-eletricas" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" /> Instalações Elétricas & Quadros
                </Link>
              </li>
              <li>
                <Link to="/cerca-eletrica" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" /> Cerca Elétrica & Proteção Perimetral
                </Link>
              </li>
              <li>
                <Link to="/video-porteiro-automacao" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" /> Vídeo Porteiro & Fechaduras Digitais
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" /> Blog Técnico & Dicas
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 3: REGIÕES DE ATENDIMENTO DF */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400 mb-4 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Regiões Atendidas (DF)
            </h4>
            <p className="text-[11px] text-slate-400 mb-3">
              Equipes móveis para atendimento ágil e visitas técnicas:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {DF_REGIONS.map((region) => (
                <span 
                  key={region}
                  className="text-[10px] font-medium bg-slate-900 border border-white/5 text-slate-300 px-2.5 py-1 rounded-md"
                >
                  {region}
                </span>
              ))}
            </div>
          </div>

          {/* COLUNA 4: CONTATO & CONVERSÃO */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400 mb-4">
              Atendimento Comercial
            </h4>
            <div className="space-y-3">
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>(61) 99830-8655</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Atendimento de Segunda a Sexta, das 8h às 18h e Sábado até 12h.
              </p>
              <button
                onClick={openWhatsApp}
                className="w-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all cursor-pointer mt-2"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Conversar no WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

        {/* LINHA INFERIOR COM CRÉDITOS */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NDS CFTV Digital - Todos os direitos reservados. Brasília, Distrito Federal.</p>
          <div className="flex items-center gap-4">
            <span>Equipamentos Oficiais Intelbras</span>
            <span>•</span>
            <span>Segurança Eletrônica DF</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
