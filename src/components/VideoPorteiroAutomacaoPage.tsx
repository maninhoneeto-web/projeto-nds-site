import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BellRing, Key, Smartphone, Lock, CheckCircle2, MessageCircle, 
  ZoomIn, ArrowRight, MapPin, Award, Sliders, ShieldCheck 
} from 'lucide-react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { SEOHelper } from './SEOHelper';
import { ImageModal, ModalImageData } from './ImageModal';
import { IMAGES } from '../constants/images';

export function VideoPorteiroAutomacaoPage() {
  const [selectedImage, setSelectedImage] = useState<ModalImageData | null>(null);

  const openWhatsApp = (equipment?: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18323711854/SimhCIKn-tAcEO7OtqFE'
      });
    }
    const phone = "5561998308655";
    const msg = encodeURIComponent(
      equipment 
        ? `Olá NDS! Vim pela página de Vídeo Porteiro e Automação e gostaria de um orçamento para: ${equipment}.`
        : "Olá NDS! Vim pela página de Vídeo Porteiro e Automação e gostaria de um orçamento em Brasília."
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const EQUIPMENTS: ModalImageData[] = [
    {
      title: "Vídeo Porteiro Wi-Fi Allo WT7",
      model: "Intelbras Allo WT7 Touch 7''",
      category: "Vídeo Interfonia Wi-Fi",
      img: IMAGES.PORTFOLIO_PORTEIRO,
      description: "Vídeo porteiro oficial Intelbras Allo WT7. Módulo externo em alumínio escovado com botão circular em LED azul e câmera HD, acompanhado do monitor interno de 7 polegadas touchscreen ultra fino. Atenda visitas e abra até 2 portões pelo app Allo Plus em qualquer lugar do mundo.",
      features: [
        "Monitor interno touchscreen colorido de 7 polegadas com interface Allo",
        "Abertura de até 2 fechaduras diferentes (portão social e de garagem) via smartphone",
        "Módulo externo robusto em alumínio escovado com botão de campainha em aro LED azul",
        "Gravação de fotos e vídeos automáticos de todos os visitantes que tocarem a campainha"
      ]
    },
    {
      title: "Fechadura Digital de Embutir com Maçaneta",
      model: "Intelbras IFR 7000 / 7001 Smart",
      category: "Fechadura de Embutir",
      img: IMAGES.FECHADURA_EMBUTIR,
      description: "Fechadura digital de embutir oficial Intelbras com maçaneta integrada preta fosca. Leitor biométrico de alta precisão localizado na própria maçaneta para abertura em um único toque, teclado touch luminoso e conectividade com aplicativo Mibo Smart.",
      features: [
        "Leitor biométrico na própria maçaneta (destravamento instantâneo em um toque)",
        "Teclado numérico touch screen luminoso com senhas configuráveis",
        "Integração com app Mibo Smart para comandos remotos e relatórios de entrada",
        "Mecanismo de embutir padrão ABNT com trinco rolete e alarme anti-arrombamento"
      ]
    },
    {
      title: "Fechadura Digital de Sobrepor",
      model: "Intelbras FR 101 / FR 201 Touch",
      category: "Fechadura de Sobrepor",
      img: IMAGES.FECHADURA_SOBREPOR,
      description: "Fechadura digital compacta de sobrepor oficial Intelbras. Instalação rápida e limpa sem precisar substituir a maçaneta existente. Painel preto espelhado com teclado touch numérico luminoso, abertura por senha ou chaveiro de aproximação RFID.",
      features: [
        "Instalação prática de sobrepor sem necessidade de trocar a maçaneta da porta",
        "Abertura por senha de 4 a 12 dígitos ou chaveiros de aproximação RFID",
        "Travamento automático da porta assim que ela se fecha",
        "Alarme sonoro em caso de tentativa de violação ou digitação errada"
      ]
    },
    {
      title: "Automatização de Portão e Controle de Acesso",
      model: "Motores Rápidos Fast Intelbras",
      category: "Automatização de Acessos",
      img: IMAGES.SERVICE_PORTEIRO,
      description: "Automatizadores rápidos para portões deslizantes, basculantes e pivotantes. Abertura em até 4 segundos para você não ficar exposto na rua, além de interfones coletivos prediais.",
      features: [
        "Motores de alta durabilidade com destravamento manual com chave para falta de luz",
        "Placa eletrônica inteligente com parada suave e sensor anti-esmagamento",
        "Controles remotos anticlonagem com frequência criptografada",
        "Integração com fechaduras magnéticas (eletroímãs) e botoeiras no-touch"
      ]
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Vídeo Porteiro e Automação de Portões em Brasília",
    "serviceType": "Instalação de Vídeo Porteiro e Fechaduras Digitais",
    "provider": {
      "@type": "LocalBusiness",
      "name": "NDS CFTV Digital",
      "image": IMAGES.LOGO,
      "telephone": "+55-61-99830-8655",
      "url": "https://ndscftvdigital.com.br/video-porteiro-automacao",
      "areaServed": [
        "Guará", "Taguatinga", "Asa Sul", "Asa Norte", "Lago Sul", "Lago Norte", "Park Way", "Noroeste", "Sudoeste", "Brasília"
      ]
    },
    "description": "Instalação de vídeo porteiro Intelbras Allo WT7, fechaduras digitais, automatização de portões rápidos e interfonia em Brasília e DF."
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-cyan-500 selection:text-white">
      <SEOHelper 
        title="Vídeo Porteiro & Fechaduras Digitais em Brasília | NDS CFTV Digital"
        description="Instalação de vídeo porteiro Intelbras Allo, fechadura eletrônica por biometria e motores de portão no DF. Atendemos Asa Sul, Asa Norte, Guará, Taguatinga e região."
        schema={schema}
      />
      <SiteHeader />

      <main className="flex-grow pt-24">
        {/* HERO SECTION */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-3/5 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest">
                <BellRing className="w-4 h-4 text-amber-400" /> Praticidade & Controle Moderno
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                Vídeo Porteiro & <br />
                <span className="text-cyan-400">Fechaduras Digitais</span> no DF
              </h1>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
                Controle o acesso à sua residência na palma da mão. Atenda visitas e abra o portão pelo smartphone com os vídeo porteiros <strong className="text-white">Intelbras Allo</strong> e desfrute do conforto das fechaduras biométricas sem chaves.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => openWhatsApp()}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>Pedir Orçamento de Vídeo Porteiro</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Instalação Limpa com Configuração no Celular</span>
                </div>
              </div>
            </div>

            <div className="md:w-2/5 w-full flex justify-center">
              <div className="relative group cursor-pointer" onClick={() => setSelectedImage(EQUIPMENTS[0])}>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-75 transition duration-500" />
                <div className="relative bg-slate-900 border border-cyan-500/30 p-4 rounded-2xl">
                  <img
                    src={IMAGES.PORTFOLIO_PORTEIRO}
                    alt="Vídeo Porteiro Allo WT7 Intelbras"
                    className="w-full max-h-[300px] object-contain rounded-xl"
                  />
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-bold text-white">Allo WT7 Intelbras Touch</span>
                    <span className="text-cyan-400 flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" /> Ampliar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUTOS INTELBRAS INTERATIVOS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">
              Conforto & Automação Inteligente
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              Sistemas Intelbras de Acesso e Vídeo Interfonia
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Descubra os modelos mais procurados para casas, condomínios e consultórios em Brasília. Clique nas fotos para conferir os recursos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EQUIPMENTS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/90 border border-white/10 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between group transition-all hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div>
                  <div className="relative bg-slate-950 rounded-xl p-4 mb-5 border border-white/5 flex items-center justify-center overflow-hidden">
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

                  <h3 className="text-xl font-black uppercase text-white group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-amber-400 text-xs font-bold mt-1">
                    {item.model}
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed mt-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Ver Detalhes <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openWhatsApp(item.title);
                    }}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 p-2.5 rounded-xl shadow-md"
                    title="Orçamento no WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="bg-slate-900/60 border-y border-white/10 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Smartphone className="w-8 h-8 text-cyan-400" />
              <h4 className="text-lg font-black uppercase text-white">Atendimento no Smartphone</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Esteja você no trabalho ou viajando, atenda a campainha, veja quem está na porta e libere a entrada para entregas ou visitas autorizadas pelo app.
              </p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Key className="w-8 h-8 text-amber-400" />
              <h4 className="text-lg font-black uppercase text-white">Nunca Mais Esqueça a Chave</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Com fechaduras digitais por biometria ou senha, você nunca mais precisará de chaveiro ou ficará trancado para fora.
              </p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Sliders className="w-8 h-8 text-cyan-400" />
              <h4 className="text-lg font-black uppercase text-white">Abertura Rápida de Portão</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Motores com velocidade rápida Fast que abrem seu portão de garagem em até 4 segundos, reduzindo o tempo de vulnerabilidade na calçada.
              </p>
            </div>
          </div>
        </section>

        {/* ATENDIMENTO DF */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 md:p-12 rounded-3xl border border-cyan-500/30 space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-4 h-4" /> Atendimento Especializado no Distrito Federal
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase text-white">
              Quer Instalar um Vídeo Porteiro ou Fechadura Digital?
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto">
              Equipes técnicas especializadas no <strong>Guará, Taguatinga, Asa Sul, Asa Norte, Lago Sul, Lago Norte, Park Way, Noroeste e Sudoeste</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => openWhatsApp()}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 mx-auto shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Solicitar Orçamento no WhatsApp</span>
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
