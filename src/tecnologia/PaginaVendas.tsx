import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, CheckCircle, ArrowRight, Zap, Target, Star } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function PaginaVendas() {
  const handlePurchase = async () => {
    try {
      await addDoc(collection(db, 'conversions'), {
        page: 'Pagina de Vendas',
        type: 'WhatsApp Purchase Intent',
        timestamp: serverTimestamp(),
      });
    } catch (e) { console.error(e); }

    window.open("https://wa.me/5561998308655?text=Desejo+adquirir+o+pacote+NDS+Digital", "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Banner Express Sale */}
      <div className="bg-orange-600 text-white py-2 text-center text-[10px] font-black uppercase tracking-widest">
        Oferta Exclusiva: Primeiras 5 empresas com 30% OFF nesta semana!
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto py-20 px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase mb-6 tracking-widest">
            <Zap className="w-3 h-3 fill-orange-700" />
            Escale seu negócio agora
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8 text-slate-950">
            TENHA UMA ESTRUTURA <br />
            DE <span className="text-orange-600 italic">VENDAS AUTOMÁTICA</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
            Nós construímos a máquina de leads que você precisa. Do anúncio ao checkout, tudo otimizado para lucro.
          </p>
        </motion.div>

        {/* The Offer Card */}
        <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-orange-600 text-white px-8 py-2 font-black uppercase text-[10px] tracking-widest rounded-bl-3xl">
            Mais Vendido
          </div>
          
          <div className="p-12 md:p-16">
            <h2 className="text-3xl font-black mb-8 border-b border-slate-100 pb-8 tracking-tight">O que você recebe:</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                "Landing Page de Alta Conversão",
                "Integração com Pixel Meta/Google",
                "Textos Persuasivos (Copywriting)",
                "Treinamento de Gestão de Leads",
                "Hospedagem inclusa por 1 ano",
                "Suporte prioritário 24/7"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-200">
               <div>
                 <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Investimento Único</p>
                 <div className="flex items-baseline gap-2">
                   <span className="text-slate-400 line-through text-xl font-bold">R$ 1.997</span>
                   <span className="text-5xl font-black text-slate-950 tracking-tighter">R$ 997</span>
                 </div>
                 <p className="text-orange-600 text-xs font-black uppercase mt-1">ou 12x de R$ 99,70</p>
               </div>
               <button 
                 onClick={handlePurchase}
                 className="w-full md:w-auto bg-orange-600 text-white px-12 py-6 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform shadow-xl shadow-orange-600/30 flex items-center justify-center gap-3"
               >
                 Aproveitar Oferta
                 <ArrowRight className="w-5 h-5" />
               </button>
            </div>

            <div className="text-center">
              <div className="flex justify-center gap-1 mb-4 text-orange-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Satisfação Garantida ou seu dinheiro de volta em 7 dias</p>
            </div>
          </div>
        </div>

        {/* Footer Brand */}
        <div className="mt-32 text-center">
          <div className="text-xs font-black uppercase tracking-[0.5em] text-slate-300 mb-4">Desenvolvido por</div>
          <div className="text-2xl font-black tracking-tighter uppercase text-slate-950">
            NDS<span className="text-orange-600">TECNOLOGIA</span>
          </div>
        </div>

      </div>
    </div>
  );
}
