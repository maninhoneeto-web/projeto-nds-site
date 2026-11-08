import React from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function FloatingWhatsApp() {
  const handleClick = async () => {
    try {
      const currentVisitId = localStorage.getItem('nds_visit_id');
      await addDoc(collection(db, 'conversions'), {
        page: window.location.pathname || 'Site',
        type: 'Floating WhatsApp Click',
        visitId: currentVisitId,
        timestamp: serverTimestamp(),
      });

      // Disparo oficial Google Ads Conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-18323711854/SimhCIKn-tAcEO7OtqFE'
        });
      }
    } catch (e) {
      console.error('Erro ao registrar conversão WhatsApp:', e);
    }

    const phone = "5561998308655";
    const msg = encodeURIComponent("Olá NDS! Vim pelo site e gostaria de solicitar um orçamento para meu projeto em Brasília.");
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[160] flex items-center group select-none">
      {/* Balão de mensagem / Tooltip flutuante */}
      <span className="mr-3 hidden sm:inline-flex items-center gap-2 bg-slate-900/95 text-white border border-emerald-500/30 px-3.5 py-2 rounded-2xl text-xs font-black uppercase tracking-wider shadow-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        Falar no WhatsApp (61) 99830-8655
      </span>

      {/* Botão Tradicional Verde do WhatsApp com animação de pulso */}
      <button
        onClick={handleClick}
        className="relative bg-[#25D366] hover:bg-[#20bd5a] active:scale-90 text-white p-4 sm:p-4.5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.65)] transition-all duration-300 flex items-center justify-center cursor-pointer border-2 border-white/20"
        aria-label="Conversar no WhatsApp"
        title="Falar com a NDS no WhatsApp"
      >
        {/* Anel de Pulso Animado */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

        {/* Notificaçãozinha de chamada ativa */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md">
          1
        </span>

        {/* Ícone Oficial Tradicional do WhatsApp */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white relative z-10 drop-shadow"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.21 8.21 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z" />
        </svg>
      </button>
    </div>
  );
}
