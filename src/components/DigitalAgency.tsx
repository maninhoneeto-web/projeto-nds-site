import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, Rocket, Target, Layout, MousePointer2, 
  Smartphone, Zap, ChevronRight, MessageCircle, BarChart3,
  ShieldCheck, ArrowRight, Sparkles, Code2
} from 'lucide-react';

export function DigitalAgency() {
  const openWhatsApp = () => {
    const phone = "5561998308655";
    const msg = encodeURIComponent("Olá! Gostaria de saber mais sobre a criação de sites e páginas de vendas com a NDS Tecnologia.");
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* Secret Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">
              NDS<span className="text-cyan-500">Tecnologia</span>
            </span>
          </div>
          <button 
            onClick={() => window.location.hash = ''}
            className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
          >
            Voltar ao Site Principal
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-cyan-600/10 blur-[150px] opacity-50 rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-[10px] uppercase font-bold tracking-[0.2em]">Sua empresa no automático</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
          >
            PARE DE PERDER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">CLIENTES ONLINE</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium"
          >
            Criamos sites de alta conversão, landing pages impossíveis de ignorar e sistemas de vendas que trabalham enquanto você dorme.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={openWhatsApp}
              className="group bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest transition-all flex items-center gap-3 shadow-[0_20px_50px_rgba(6,182,212,0.3)]"
            >
              Quero uma Página de Vendas
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white/2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Layout,
                title: "Websites Institucionais",
                desc: "Sua autoridade elevada ao máximo com um design limpo, rápido e profissional."
              },
              {
                icon: Target,
                title: "Landing Pages de Venda",
                desc: "Focadas em converter cada centavo investido em tráfego em dinheiro no seu bolso."
              },
              {
                icon: Rocket,
                title: "Velocidade Extrema",
                desc: "Sites que carregam em menos de 2 segundos. O Google ama, seu cliente também."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="w-14 h-14 bg-cyan-600/20 rounded-2xl flex items-center justify-center text-cyan-400 mb-8 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selling Point */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <div className="md:grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">
                  TRANSFORME SEU <br />
                  TRÁFEGO EM <span className="text-cyan-200">LUCRO</span>
                </h2>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-cyan-200" />
                    <span className="font-bold uppercase tracking-tight">Otimizado para mobile</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-cyan-200" />
                    <span className="font-bold uppercase tracking-tight">Pixel de Rastreamento (Meta/Google)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-cyan-200" />
                    <span className="font-bold uppercase tracking-tight">Integração Direta com WhatsApp</span>
                  </div>
                </div>
                <button 
                  onClick={openWhatsApp}
                  className="bg-white text-cyan-700 px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-xl"
                >
                  Consultoria Gratuita
                </button>
              </div>
              <div className="hidden md:block">
                {/* Visual aspect of a clean UI */}
                <div className="bg-black/20 backdrop-blur-2xl rounded-3xl border border-white/10 p-4 aspect-square flex items-center justify-center">
                  <div className="w-full h-full border border-white/5 rounded-2xl flex flex-col p-6 overflow-hidden">
                    <div className="h-4 w-2/3 bg-white/10 rounded-full mb-4 animate-pulse" />
                    <div className="h-4 w-1/2 bg-white/10 rounded-full mb-8 animate-pulse" />
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="h-32 bg-white/5 rounded-xl border border-white/5" />
                      <div className="h-32 bg-white/5 rounded-xl border border-white/5" />
                    </div>
                    <div className="mt-auto h-12 bg-cyan-500/20 rounded-xl border border-cyan-500/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">
              NDS<span className="text-cyan-500">Tecnologia</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8 font-medium">
            Impulsionando o seu negócio através da presença digital impecável.
          </p>
          <div className="flex flex-col gap-4 items-center">
             <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Contato Comercial</div>
             <a href="mailto:comercial@ndstecnologia.com.br" className="text-cyan-500 font-bold hover:text-cyan-400 transition-colors">
               comercial@ndstecnologia.com.br
             </a>
             <p className="text-slate-800 text-[8px] uppercase tracking-widest mt-4">
               © 2026 NDS TECNOLOGIA • TODOS OS DIREITOS RESERVADOS
             </p>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Pulse */}
      <button 
        onClick={openWhatsApp}
        className="fixed bottom-8 right-8 z-[100] bg-green-500 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:scale-110 active:scale-95 transition-all animate-bounce"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </button>

    </div>
  );
}
