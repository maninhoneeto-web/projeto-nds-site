import React from 'react';
import { motion } from 'motion/react';
import { Code2, Monitor, CreditCard, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function MarketingFolder() {
  const openWhatsApp = async () => {
    try {
      await addDoc(collection(db, 'conversions'), {
        page: 'Tecnologia Folder',
        type: 'WhatsApp Click',
        timestamp: serverTimestamp(),
      });
    } catch (e) { console.error(e); }

    const phone = "5561998308655";
    const msg = encodeURIComponent("Olá! Vi o folder da NDS Tecnologia e quero saber mais sobre a criação de sites.");
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500">
      {/* Header Flyer Style */}
      <header className="py-8 px-6 border-b border-white/5 bg-gradient-to-r from-slate-950 to-black">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
               <Code2 className="w-6 h-6 text-white" />
             </div>
             <div className="leading-none">
               <span className="text-xl font-black tracking-tighter uppercase block">NDS<span className="text-cyan-500">Tecnologia</span></span>
               <span className="text-[9px] uppercase tracking-[0.3em] text-cyan-500/70 font-bold">Inovação Digital</span>
             </div>
          </div>
          <div className="hidden md:flex gap-6 text-[10px] uppercase font-bold tracking-widest text-slate-400">
            <span>Sites</span>
            <span>Landing Pages</span>
            <span>Sistemas</span>
          </div>
        </div>
      </header>

      {/* Hero "Capa do Folder" */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent opacity-50" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-6"
          >
            Seu próximo nível estratégico
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            PÁGINAS QUE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">VENDEM SOZINHAS</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-2xl max-w-2xl leading-relaxed mb-10 font-medium italic border-l-4 border-cyan-600 pl-6">
            "Transformamos curiosos em clientes fiéis com design de alta performance e tecnologia de ponta."
          </p>

          <button 
            onClick={openWhatsApp}
            className="group relative bg-white text-black px-12 py-6 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-cyan-500 hover:text-white transition-all shadow-2xl flex items-center gap-4"
          >
            Quero meu site agora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Services Flyer Body */}
      <section className="py-20 px-6 bg-slate-950/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Serviço 1 */}
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-cyan-600/10 rounded-full blur-3xl" />
            <Monitor className="w-12 h-12 text-cyan-500 mb-6" />
            <h3 className="text-3xl font-black tracking-tighter mb-4">Sites Institucionais</h3>
            <p className="text-slate-400 leading-relaxed mb-6 font-medium">
              Sua vitrine profissional no mundo. Passamos autoridade, confiança e credibilidade para sua marca.
            </p>
            <ul className="space-y-2 text-xs uppercase tracking-widest font-bold text-cyan-500/80">
              <li className="flex items-center gap-2">✓ SEO Otimizado para o Google</li>
              <li className="flex items-center gap-2">✓ Responsividade Total (PC/Celular)</li>
              <li className="flex items-center gap-2">✓ Velocidade de carregamento extrema</li>
            </ul>
          </div>

          {/* Serviço 2 */}
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl" />
            <CreditCard className="w-12 h-12 text-blue-400 mb-6" />
            <h3 className="text-3xl font-black tracking-tighter mb-4">Páginas de Vendas</h3>
            <p className="text-slate-400 leading-relaxed mb-6 font-medium">
              Landing Pages focadas em conversão. Otimizadas para anúncios de Tráfego Pago (Facebook/Instagram/Google).
            </p>
            <ul className="space-y-2 text-xs uppercase tracking-widest font-bold text-blue-400/80">
              <li className="flex items-center gap-2">✓ Copywriting Persuasivo</li>
              <li className="flex items-center gap-2">✓ Botão Flutuante de WhatsApp</li>
              <li className="flex items-center gap-2">✓ Pixel de Rastreamento Instalado</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Chamada Final */}
      <section className="py-32 px-6 text-center relative">
        <div className="max-w-3xl mx-auto">
          <Sparkles className="w-12 h-12 text-cyan-500 mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">
            SUA PRESENÇA DIGITAL <br />
            NÃO PODE ESPERAR
          </h2>
          <p className="text-slate-500 text-lg mb-12 font-medium">
            O mercado digital é cruel com quem não se posiciona bem. Deixe a NDS Tecnologia colocar você no topo.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="p-6 bg-slate-900 rounded-2xl border border-white/5 flex items-center gap-4 text-left w-full md:w-auto">
               <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                 <MessageCircle className="w-6 h-6" />
               </div>
               <div>
                 <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">WhatsApp Consultoria</p>
                 <p className="font-black text-white">(61) 99830-8655</p>
               </div>
            </div>
            <button 
              onClick={openWhatsApp}
              className="w-full md:w-auto bg-cyan-600 px-10 py-6 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl hover:bg-cyan-500 transition-colors"
            >
              Consultar Orçamento
            </button>
          </div>
        </div>
      </section>

      {/* Rodapé do Flyer */}
      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-5xl mx-auto px-6 text-center text-slate-600">
          <div className="flex items-center justify-center gap-3 mb-6 grayscale opacity-50">
             <Code2 className="w-6 h-6" />
             <span className="text-lg font-black tracking-tighter uppercase">NDS TECNOLOGIA</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Brasília • 2026 • Projetos Sob Medida</p>
        </div>
      </footer>
    </div>
  );
}
