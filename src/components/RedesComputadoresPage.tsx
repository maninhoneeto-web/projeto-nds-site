import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Wifi, Server, Network, ShieldCheck, CheckCircle2, MessageCircle, 
  ZoomIn, ArrowRight, MapPin, Award, Activity 
} from 'lucide-react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { SEOHelper } from './SEOHelper';
import { ImageModal, ModalImageData } from './ImageModal';
import { IMAGES } from '../constants/images';

export function RedesComputadoresPage() {
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
        ? `Olá NDS! Vim pela página de Redes de Computadores e gostaria de um orçamento para: ${equipment}.`
        : "Olá NDS! Vim pela página de Redes de Computadores e gostaria de um orçamento para infraestrutura de TI em Brasília."
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const EQUIPMENTS: ModalImageData[] = [
    {
      title: "Rack de TI e Patch Panel Estruturado",
      model: "Rack 19'' Fechado Padrão Telecom",
      category: "Infraestrutura de TI",
      img: IMAGES.PORTFOLIO_RACK,
      description: "Montagem, identificação e organização profissional de racks de telecomunicação para servidores, NVRs de segurança e switches de rede empresarial.",
      features: [
        "Cabeamento organizado com guias horizontais e verticais",
        "Patch panel Cat6 com identificação padronizada por portas",
        "Ventilação forçada para refrigeração de equipamentos críticos",
        "Padrão 19 polegadas com fechadura de segurança com chave"
      ]
    },
    {
      title: "Switch PoE Gerenciável Intelbras",
      model: "SG 2404 PoE Max Intelbras",
      category: "Ativos de Rede",
      img: IMAGES.SERVICE_TI,
      description: "Switch Gigabit com portas PoE de alta potência para alimentar câmeras IP de CFTV, pontos de acesso Wi-Fi e telefones IP sem necessidade de fontes externas.",
      features: [
        "Portas Gigabit Ethernet 10/100/1000 Mbps com PoE 802.3at/af",
        "Gerenciamento avançado de banda e VLAN para isolamento de segurança",
        "Proteção contra surtos elétricos até 15kV nas portas de rede",
        "Alta capacidade de comutação sem perda de pacotes ou congelamento de vídeo"
      ]
    },
    {
      title: "Cabeamento Estruturado Cat6 / Cat6A",
      model: "Cabo UTP 100% Cobre Homologado",
      category: "Cabeamento de Rede",
      img: IMAGES.INSTALACAO,
      description: "Lançamento e conectorização de cabos de rede de alta velocidade para suportar tráfego pesado de dados, CFTV 4K e servidores corporativos.",
      features: [
        "Condutores 100% cobre sólido sem alumínio (livre de perdas de sinal)",
        "Certificação ponto a ponto com emissão de relatório de atenuação",
        "Conectores RJ-45 blindados com capa de proteção",
        "Instalação protegida por canaletas, perfilados e eletrodutos"
      ]
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Redes de Computadores e Cabeamento Estruturado em Brasília",
    "serviceType": "Infraestrutura de Redes e Telecomunicações",
    "provider": {
      "@type": "LocalBusiness",
      "name": "NDS CFTV Digital",
      "image": IMAGES.LOGO,
      "telephone": "+55-61-99830-8655",
      "url": "https://ndscftvdigital.com.br/redes-computadores",
      "areaServed": [
        "Guará", "Taguatinga", "Asa Sul", "Asa Norte", "Lago Sul", "Lago Norte", "Park Way", "Noroeste", "Sudoeste", "Brasília"
      ]
    },
    "description": "Projetos de infraestrutura de TI, cabeamento estruturado Cat6, organização de racks e instalação de switches PoE Intelbras em Brasília e DF."
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-cyan-500 selection:text-white">
      <SEOHelper 
        title="Redes de Computadores & Cabeamento Estruturado em Brasília | NDS CFTV"
        description="Infraestrutura de rede corporativa, organização de racks, switches PoE Intelbras e cabeamento Cat6 no DF. Atendemos Asa Sul, Asa Norte, Guará, Taguatinga e região."
        schema={schema}
      />
      <SiteHeader />

      <main className="flex-grow pt-24">
        {/* HERO SECTION */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-3/5 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest">
                <Network className="w-4 h-4 text-amber-400" /> Infraestrutura de TI & Redes
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                Redes de Computadores & <br />
                <span className="text-cyan-400">Cabeamento Estruturado</span> no DF
              </h1>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
                Alta estabilidade e velocidade para sua empresa, clínica ou condomínio. Montagem e organização de racks, switches industriais PoE Intelbras, conectorização Cat6 e certificação de pontos de rede.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => openWhatsApp()}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>Pedir Proposta de Rede</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Cabos 100% Cobre Homologados</span>
                </div>
              </div>
            </div>

            <div className="md:w-2/5 w-full flex justify-center">
              <div className="relative group cursor-pointer" onClick={() => setSelectedImage(EQUIPMENTS[0])}>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-75 transition duration-500" />
                <div className="relative bg-slate-900 border border-cyan-500/30 p-4 rounded-2xl">
                  <img
                    src={IMAGES.PORTFOLIO_RACK}
                    alt="Rack de TI Organizado"
                    className="w-full max-h-[300px] object-contain rounded-xl"
                  />
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-bold text-white">Rack de TI Padrão Telecom</span>
                    <span className="text-cyan-400 flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" /> Ampliar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EQUIPAMENTOS E SERVIÇOS DE REDE */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">
              Engenharia de Conectividade
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              Soluções Completas de Infraestrutura de Rede
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Elimine quedas de sinal, lentidão no CFTV e cabos desorganizados. Estruturamos sua rede para suportar tráfego pesado com máxima confiabilidade.
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
                    Ver Especificações <ArrowRight className="w-3.5 h-3.5" />
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

        {/* DIFERENCIAIS TÉCNICOS */}
        <section className="bg-slate-900/60 border-y border-white/10 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Activity className="w-8 h-8 text-cyan-400" />
              <h4 className="text-lg font-black uppercase text-white">Tráfego Gigabit sem Gargalos</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Switches com portas Gigabit dedicadas para garantir transmissão fluida de gravações em 4K e dados corporativos sensíveis.
              </p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Server className="w-8 h-8 text-amber-400" />
              <h4 className="text-lg font-black uppercase text-white">Racks Limpos e Identificados</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cada cabo e porta de patch panel é anilhado e identificado, facilitando manutenções futuras e diagnósticos rápidos pela sua equipe de TI.
              </p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Wifi className="w-8 h-8 text-cyan-400" />
              <h4 className="text-lg font-black uppercase text-white">Wi-Fi Corporativo Unificado</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pontos de acesso com tecnologia Mesh / Roaming para você circular por todo o imóvel sem que a conexão com a internet caia.
              </p>
            </div>
          </div>
        </section>

        {/* ATENDIMENTO DF */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 md:p-12 rounded-3xl border border-cyan-500/30 space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-4 h-4" /> Atendimento Corporativo em Brasília
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase text-white">
              Sua Empresa ou Condomínio Precisa de uma Rede Confiável?
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto">
              Atendemos escritórios, clínicas e galpões no <strong>Guará, Taguatinga, Asa Sul, Asa Norte, Lago Sul, Lago Norte, Park Way, Noroeste e Sudoeste</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => openWhatsApp()}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 mx-auto shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Solicitar Avaliação Técnica pelo WhatsApp</span>
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
