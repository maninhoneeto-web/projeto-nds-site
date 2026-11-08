import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Smartphone, Wifi, Shield, Eye, Bell, CheckCircle2, MessageCircle, 
  ZoomIn, ArrowRight, MapPin, Award, Video, Cloud, Volume2, RotateCcw
} from 'lucide-react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { SEOHelper } from './SEOHelper';
import { ImageModal, ModalImageData } from './ImageModal';
import { IMAGES } from '../constants/images';

export function LinhaMiboPage() {
  const [selectedImage, setSelectedImage] = useState<ModalImageData | null>(null);

  const openWhatsApp = (model?: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18323711854/SimhCIKn-tAcEO7OtqFE'
      });
    }
    const phone = "5561998308655";
    const msg = encodeURIComponent(
      model 
        ? `Olá NDS! Vim pela página da Linha Mibo e gostaria de um orçamento para a câmera: ${model}.`
        : "Olá NDS! Vim pela página da Linha Mibo e gostaria de um orçamento para câmeras Wi-Fi Intelbras em Brasília."
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const MIBO_MODELS: ModalImageData[] = [
    {
      title: "Câmera Wi-Fi Interna Compacta",
      model: "Intelbras Mibo iM3 / iM3 C",
      category: "Linha Mibo Interna",
      img: IMAGES.MIBO_IM3,
      description: "A câmera queridinha para ambientes internos. Base magnética multi-ângulo fácil de fixar sem furos. Possui microfone e alto-falante para você conversar com quem está no ambiente e inteligência artificial com detecção de ruídos e pessoas.",
      features: [
        "Resolução Full HD 1080p com amplo campo de visão de 131°",
        "Áudio bidirecional (ouça e fale pelo aplicativo Mibo Cam)",
        "Detecção de ruídos anormal (ideal como babá eletrônica e cuidadores)",
        "Visão noturna infravermelha de até 10 metros mesmo no escuro total"
      ]
    },
    {
      title: "Câmera Wi-Fi 360° Pan-Tilt",
      model: "Intelbras Mibo iM4 / iM4 C",
      category: "Linha Mibo 360°",
      img: IMAGES.MIBO_IM4,
      description: "Controle todo o ambiente na palma da sua mão. Gire a câmera 360° horizontalmente e 90° verticalmente pelo app. Com o recurso Auto Tracking, a câmera segue automaticamente qualquer pessoa que se movimentar no cômodo.",
      features: [
        "Rotação motorizada 360° controlada pelo celular",
        "Rastreamento inteligente de pessoas (Auto-tracking)",
        "Modo Privacidade (a lente se esconde quando você estiver em casa)",
        "Gravação em cartão MicroSD de até 256GB ou em nuvem Mibo Cloud"
      ]
    },
    {
      title: "Câmera Wi-Fi Externa com IA",
      model: "Intelbras Mibo iM5 / iM5 S",
      category: "Linha Mibo Externa",
      img: IMAGES.MIBO_IM5,
      description: "Segurança reforçada para garagens, quintais, entradas e fachadas. Proteção IP67 contra sol forte e temporais de Brasília. Duas antenas Wi-Fi de alto ganho para não perder conexão e inteligência artificial para detecção humana.",
      features: [
        "Proteção IP67 à prova d'água, sol e poeira",
        "Inteligência Artificial que só alerta quando detecta pessoas (sem falsos alarmes)",
        "Antenas externas Wi-Fi potentes com alcance estendido",
        "Visão noturna de longo alcance com até 30 metros de nitidez"
      ]
    },
    {
      title: "Speed Dome Wi-Fi Externa Full Color",
      model: "Intelbras Mibo iM7 / iM7 Full Color",
      category: "Linha Mibo PTZ Externa",
      img: IMAGES.MIBO_IM7,
      description: "A câmera mais completa da Linha Mibo. Rotação 360° para áreas externas, holofotes LED integrados para imagens 100% coloridas à noite e sirene embutida para intimidar invasores.",
      features: [
        "Visão Noturna Colorida (Full Color) com holofote LED inteligente",
        "Giro 360° panorâmico para cobrir todo o pátio ou entrada",
        "Sirene de alerta e iluminação acionadas automaticamente em caso de invasão",
        "Resistente a intempéries IP66 para uso externo rigoroso no DF"
      ]
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Câmeras Intelbras Linha Mibo Wi-Fi em Brasília",
    "brand": {
      "@type": "Brand",
      "name": "Intelbras Mibo"
    },
    "description": "Instalação e configuração de câmeras Wi-Fi inteligentes Intelbras Linha Mibo iM3, iM4, iM5 e iM7 em Brasília. Sem mensalidade, com acesso total no smartphone.",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "BRL",
      "price": "290.00"
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-cyan-500 selection:text-white">
      <SEOHelper 
        title="Linha Mibo Intelbras em Brasília | Câmeras Wi-Fi iM3, iM4, iM5, iM7"
        description="Câmeras Wi-Fi Intelbras Linha Mibo no DF. Instalação e configuração rápida de iM3, iM4 360°, iM5 externa e iM7 Full Color. Atendemos Asa Sul, Asa Norte, Guará, Taguatinga e todo DF."
        schema={schema}
      />
      <SiteHeader />

      <main className="flex-grow pt-24">
        {/* HERO LINHA MIBO */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#09152e] via-slate-950 to-slate-950 border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            
            <div className="md:w-3/5 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest">
                <Wifi className="w-4 h-4 text-amber-400" /> Linha Intelbras Mibo Cam Oficial
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                Câmeras Wi-Fi Inteligentes <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-300">
                  Intelbras Linha Mibo
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Segurança prática, sem obras e sem complicação. Monitore sua casa, seus filhos e seus pets de onde estiver pelo aplicativo <strong className="text-white">Mibo Cam</strong> no celular. Imagens Full HD, áudio bidirecional e inteligência artificial.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center md:justify-start">
                <button
                  onClick={() => openWhatsApp()}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>Pedir Orçamento da Linha Mibo</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Configuração e Instalação Inclusas</span>
                </div>
              </div>
            </div>

            {/* FOTO HERO INTERATIVA DA MIBO */}
            <div className="md:w-2/5 w-full flex justify-center">
              <div 
                className="relative group cursor-pointer max-w-sm w-full"
                onClick={() => setSelectedImage(MIBO_MODELS[1])}
              >
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-amber-400 rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500" />
                <div className="relative bg-slate-900 border border-cyan-500/40 p-6 rounded-3xl shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
                      Giro 360° Inteligente
                    </span>
                    <span className="text-cyan-400 text-xs font-bold flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" /> Clique p/ Zoom
                    </span>
                  </div>

                  <img
                    src={IMAGES.MIBO_IM4}
                    alt="Câmera Wi-Fi Intelbras Mibo iM4"
                    className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h3 className="text-lg font-black text-white uppercase">Intelbras Mibo iM4 360°</h3>
                    <p className="text-slate-400 text-xs mt-1">Rotação motorizada pelo app com auto-tracking e detecção humana.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CATÁLOGO COMPLETO DOS 4 MODELOS MIBO */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">
              Escolha o Modelo Ideal Para Seu Ambiente
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Família de Câmeras Intelbras Mibo
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Desde modelos compactos para quartos e salas até câmeras externas resistentes com holofotes coloridos. Clique nas fotos para ver detalhes e solicitar instalação em Brasília.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MIBO_MODELS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/90 border border-white/10 hover:border-cyan-500/50 rounded-3xl p-6 flex flex-col justify-between group transition-all hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div>
                  <div className="relative bg-slate-950 rounded-2xl p-4 mb-5 border border-white/5 flex items-center justify-center overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="h-48 w-full object-contain group-hover:scale-105 transition-transform duration-300" 
                    />
                    <span className="absolute top-3 right-3 bg-slate-900/80 text-cyan-400 p-1.5 rounded-lg border border-cyan-500/30">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                    <span className="absolute bottom-3 left-3 bg-cyan-950/80 text-cyan-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-black uppercase text-white group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-amber-400 text-xs font-bold mt-1">
                    {item.model}
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed mt-3 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Ver Especificações <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openWhatsApp(item.model);
                    }}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 p-2.5 rounded-xl shadow-md transition-colors"
                    title="Orçamento no WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BENEFÍCIOS DO APP MIBO CAM */}
        <section className="bg-slate-900/60 border-y border-white/10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-amber-400 text-xs font-black uppercase tracking-[0.3em]">
                Controle Total Pelo Smartphone
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Tudo no Aplicativo Oficial Intelbras Mibo Cam
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
                <Smartphone className="w-8 h-8 text-cyan-400" />
                <h4 className="text-base font-black uppercase text-white">Notificações em Tempo Real</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Receba avisos instantâneos com foto na tela do seu celular assim que uma pessoa for detectada.
                </p>
              </div>

              <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
                <Volume2 className="w-8 h-8 text-amber-400" />
                <h4 className="text-base font-black uppercase text-white">Áudio Bidirecional</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ouça o que está acontecendo e fale diretamente através do alto-falante da câmera pelo celular.
                </p>
              </div>

              <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
                <RotateCcw className="w-8 h-8 text-cyan-400" />
                <h4 className="text-base font-black uppercase text-white">Acompanhamento 360°</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Controle a rotação para todos os cantos da sala ou deixe a câmera seguir pessoas em movimento automaticamente.
                </p>
              </div>

              <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
                <Cloud className="w-8 h-8 text-amber-400" />
                <h4 className="text-base font-black uppercase text-white">Sem Mensalidade Obrigatória</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Grave tudo em cartão MicroSD direto na câmera ou use o armazenamento em nuvem caso preferir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ATENDIMENTO DF */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-12 rounded-3xl border border-cyan-500/30 space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-4 h-4" /> Instalação e Configuração em Brasília
            </div>
            <h3 className="text-2xl sm:text-4xl font-black uppercase text-white">
              Quer Instalar Câmeras Mibo na sua Casa ou Empresa?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Nossos técnicos entregam as câmeras instaladas, configuradas na sua rede Wi-Fi e sincronizadas em todos os celulares da sua família no <strong>Guará, Taguatinga, Asa Sul, Asa Norte, Lago Sul/Norte, Park Way, Noroeste e Sudoeste</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => openWhatsApp()}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 mx-auto shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Solicitar Câmeras Mibo no WhatsApp</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <ImageModal
        item={selectedImage}
        onClose={() => setSelectedImage(null)}
        onContactWhatsApp={(title) => openWhatsApp(title)}
      />

      <SiteFooter />
    </div>
  );
}
