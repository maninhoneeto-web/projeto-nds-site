import React from 'react';
import { motion } from 'motion/react';
import { Globe, ShieldCheck, Zap, Rocket, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';

export const PartnerProgram: React.FC = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent('Olá, vi o seu site e gostaria de saber mais sobre a criação de sites profissionais.');
    window.open(`https://wa.me/5561984242602?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Oportunidade Exclusiva</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8"
          >
            Sua Empresa com um <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Site de Elite</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
          >
            Transformamos sua presença digital com a mesma excelência e tecnologia que aplicamos na NDS. Sites ultra-velozes, modernos e focados em conversão.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={openWhatsApp}
              className="px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-3"
            >
              Quero um de Site Elite
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
               onClick={() => window.location.hash = ''}
               className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest transition-all"
            >
              Ver Portfólio NDS
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Zap className="w-8 h-8 text-cyan-400" />, 
                title: "Ultra Velocidade", 
                desc: "Sites que carregam instantaneamente em qualquer dispositivo, melhorando seu rank no Google." 
              },
              { 
                icon: <Globe className="w-8 h-8 text-cyan-400" />, 
                title: "Design de Elite", 
                desc: "Interface moderna e exclusiva, nada de templates prontos. Sua marca com visual premium." 
              },
              { 
                icon: <ShieldCheck className="w-8 h-8 text-cyan-400" />, 
                title: "Segurança Total", 
                desc: "Hospedagem segura e protocolos de proteção avançados para os dados da sua empresa." 
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors"
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Card */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-12 rounded-[3rem] bg-gradient-to-br from-cyan-600 to-blue-700 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Rocket className="w-64 h-64 rotate-12" />
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
                Estamos aceitando <br />novos parceiros
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
                Se você é um empresário ou profissional liberal que quer elevar o nível do seu negócio, fale conosco agora.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10">
                {[
                  "Landing Pages de Alta Conversão",
                  "Site Institucional Premium",
                  "Design Responsivo (Mobile)",
                  "Otimização para Google (SEO)"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-white font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={openWhatsApp}
                className="px-12 py-6 bg-white text-cyan-700 rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-3 mx-auto"
              >
                <MessageSquare className="w-6 h-6" />
                Iniciar Projeto Agora
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} NDS WEB SOLUTIONS & PARTNERS
        </p>
      </footer>
    </div>
  );
};
