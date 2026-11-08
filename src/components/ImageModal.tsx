import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface ModalImageData {
  title: string;
  model?: string;
  category?: string;
  img: string;
  description?: string;
  features?: string[];
}

interface ImageModalProps {
  item: ModalImageData | null;
  onClose: () => void;
  onContactWhatsApp?: (productTitle: string) => void;
}

export function ImageModal({ item, onClose, onContactWhatsApp }: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  const handleWhatsAppClick = () => {
    if (item && onContactWhatsApp) {
      onContactWhatsApp(`${item.title}${item.model ? ` (${item.model})` : ''}`);
    } else {
      // Disparo padrão Google Ads
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-18323711854/SimhCIKn-tAcEO7OtqFE'
        });
      }
      const phone = "5561998308655";
      const msg = encodeURIComponent(`Olá NDS! Gostaria de um orçamento para o equipamento: ${item?.title || 'Equipamento'} ${item?.model || ''}`);
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop escuro com blur tecnológico */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Botão Fechar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 bg-slate-950/80 hover:bg-red-500/20 text-slate-300 hover:text-white rounded-full transition-all border border-white/10"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Imagem Ampliada com Efeito Zoom */}
            <div className="md:w-1/2 bg-slate-950 relative flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none z-10" />
              <img
                src={item.img}
                alt={item.title}
                className="max-h-[340px] md:max-h-[460px] w-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-4 left-4 z-10 text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-slate-950/80 px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5">
                <ZoomIn className="w-3 h-3" /> Imagem Ampliada
              </span>
            </div>

            {/* Detalhes Técnicos & Ação de Conversão */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                {item.category && (
                  <span className="inline-block text-[11px] font-black uppercase tracking-[0.25em] text-cyan-400 mb-2">
                    {item.category}
                  </span>
                )}
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                  {item.title}
                </h3>
                {item.model && (
                  <p className="text-amber-400 font-bold text-sm tracking-wide mt-1">
                    Equipamento Intelbras • Modelo {item.model}
                  </p>
                )}

                {item.description && (
                  <p className="text-slate-300 text-sm leading-relaxed mt-4">
                    {item.description}
                  </p>
                )}

                {/* Especificações e Recursos */}
                {item.features && item.features.length > 0 && (
                  <div className="mt-6 space-y-2.5">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" /> Diferenciais Técnicos
                    </h4>
                    <ul className="space-y-2">
                      {item.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Botão de Ação de Conversão em Amarelo Vibrante / Alto Impacto */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-amber-400/20 transition-all uppercase tracking-wider text-sm cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>Pedir Orçamento com Instalação</span>
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-2.5">
                  Atendimento em Brasília (Asa Sul, Asa Norte, Guará, Taguatinga, Lago Sul/Norte e DF)
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
