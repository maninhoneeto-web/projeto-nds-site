import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOHelper } from './SEOHelper';
import { 
  Wifi, ArrowLeft, Network, Server, Cable, CheckCircle2, MessageCircle 
} from 'lucide-react';
import { IMAGES } from '../constants/images';

export function RedeEstruturada() {
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
    const msg = encodeURIComponent("Olá NDS! Vim pela página de Rede Estruturada e gostaria de um orçamento.");
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Cabeamento Estruturado e Rede de TI",
    "serviceType": "Redes e Telecomunicações",
    "provider": {
      "@type": "LocalBusiness",
      "name": "NDS CFTV Digital",
      "image": IMAGES.LOGO,
      "telephone": "+55-61-99830-8655"
    },
    "description": "Projetos profissionais de cabeamento estruturado Cat6/Cat6A, implantação de racks de TI, roteamento corporativo, redes ópticas e data centers integrados em Brasília.",
    "areaServed": "Distrito Federal, Brasil"
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      <SEOHelper 
        title="Redes Cabeada e Cabeamento Estruturado em Brasília | NDS"
        description="Garanta a estabilidade de seus sistemas de segurança e TI. Implante cabeamento estruturado Cat6, racks organizados, roteadores corporativos e fibra óptica com equipe certificada."
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
            <Wifi className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-[10px] uppercase font-black tracking-widest">Sistemas de Rede de Alto Desempenho</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none mb-6">
            Projetos de Rede Estruturada e TI
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-10">
            A infraestrutura invisível que sustenta a segurança e a produtividade da sua empresa. Projetamos e organizamos cabeamento profissional e data centers que eliminam falhas e instabilidades térmicas ou magnéticas.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={openWhatsApp}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-[0_5px_20px_rgba(6,182,212,0.3)]"
            >
              Falar com Especialista
            </button>
          </div>
        </div>
      </header>

      {/* CAPABILITIES SECTION */}
      <main className="py-16 max-w-7xl mx-auto px-6 md:px-12 flex-grow">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img src={IMAGES.SERVICE_TI} alt="Rede Estruturada e Racks" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          </div>
          
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
              Infraestrutura de Rede Duradoura
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Cabeamento Estruturado Homologado',
                  desc: 'Organização inteligente de redes de dados e voz (Cat6 e Cat6A). Menos ruído eletromagnético e mais velocidade para sua empresa.'
                },
                {
                  title: 'Montagem e Identificação de Racks',
                  desc: 'Instalação física e conceitual de Racks de comunicação (padrão 19\"). Identificação de portas (patch panels) e excelente fluxo de refrigeração.'
                },
                {
                  title: 'Redes em Fibra Óptica',
                  desc: 'Interligação de blocos e andares através de fibra de alta performance. Banda estável e transmissão de pacotes sem perda por distância.'
                },
                {
                  title: 'Data Center e Switche Ativos',
                  desc: 'Configuração avançada de switches gerenciáveis (VLANs), roteadores e Firewalls de borda para estabilizar e proteger sua rede local corporativa.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
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

        {/* METRICS / STATS */}
        <div className="grid sm:grid-cols-3 gap-8 py-16 border-t border-b border-white/5 rounded-3xl bg-slate-900/40 p-12 mb-20">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-cyan-500 mb-2">10 Gbps</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Largura de Banda Suportada</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-cyan-500 mb-2">100%</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Testado com Certificadores Fluke</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-cyan-500 mb-2">CAT6/6A</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Fios e Blindagens de Elite</div>
          </div>
        </div>

        {/* HIGHLIGHT */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
              O Coração de seu Sistema de Monitoramento
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Muitos problemas recorrentes em câmeras IP (como travamento das imagens e lentidão no app móvel) decorrem de redes de baixa qualidade. Garantimos infraestrutura de rede robusta projetada sob medida para CFTV IP.
            </p>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-500 w-5 h-5 shrink-0" />
                <span>Roteadores de padrão empresarial com gerenciamento de banda inteligente</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-500 w-5 h-5 shrink-0" />
                <span>Switches PoE para alimentar os equipamentos de segurança pela própria fiação de dados</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-500 w-5 h-5 shrink-0" />
                <span>Mapeamento lógico e físico completo impresso para o cliente</span>
              </li>
            </ul>
          </div>
          
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img src={IMAGES.PORTFOLIO_RACK} alt="Rack de infraestrutura montado" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
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
            Estrutura de TI e Cabeamento Inteligente de alta capacidade em Brasília, Distrito Federal.
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
