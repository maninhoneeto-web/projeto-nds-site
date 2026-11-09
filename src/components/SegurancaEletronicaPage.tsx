import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Camera, Shield, Eye, Server, Cpu, Bell, CheckCircle2, MessageCircle, 
  ZoomIn, ArrowRight, MapPin, Award 
} from 'lucide-react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { SEOHelper } from './SEOHelper';
import { ImageModal, ModalImageData } from './ImageModal';
import { IMAGES } from '../constants/images';

export function SegurancaEletronicaPage() {
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
        ? `Olá NDS! Vim pela página de Segurança Eletrônica e gostaria de um orçamento para: ${equipment}.`
        : "Olá NDS! Vim pela página de Segurança Eletrônica e gostaria de um orçamento para CFTV em Brasília."
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const EQUIPMENTS: ModalImageData[] = [
    {
      title: "Câmera Speed Dome PTZ",
      model: "VIP 8232 SD IA Intelbras",
      category: "CFTV IP Profissional",
      img: IMAGES.PORTFOLIO_PTZ,
      description: "Câmera PTZ profissional com zoom óptico de 32x e inteligência artificial para detecção de veículos e pessoas, rastreamento automático (autotracking) e proteção perimetral.",
      features: [
        "Resolução 4K com zoom óptico de alta precisão",
        "Detecção de rostos e leitura de placas de veículos",
        "Visão noturna Starlight colorida mesmo com baixa luminosidade",
        "Resistente a intempéries IP67 e proteção contra vandalismo IK10"
      ]
    },
    {
      title: "Câmera Bullet IP Inteligente",
      model: "VIP 1130 B Full HD",
      category: "Câmeras IP Externas",
      img: IMAGES.PORTFOLIO_BULLET,
      description: "Câmera Bullet IP de alta definição com infravermelho de longo alcance e analíticos inteligentes de linha e cerca virtual.",
      features: [
        "Sensor de imagem de alta sensibilidade e nitidez",
        "Alimentação PoE (energia e dados no mesmo cabo de rede)",
        "Infravermelho inteligente com alcance de até 30 metros",
        "Corpo metálico reforçado resistente a chuva e sol forte no DF"
      ]
    },
    {
      title: "Câmera Wi-Fi Inteligente Mibo",
      model: "iM5 Full HD Intelbras",
      category: "Linha Smart Residencial",
      img: IMAGES.SERVICE_MIBO,
      description: "Câmera Wi-Fi inteligente para residências e pequenos comércios. Alerta de movimento no celular em tempo real com áudio bidirecional.",
      features: [
        "Conexão Wi-Fi rápida com app Mibo Cam",
        "Microfone e alto-falante integrados para comunicação remota",
        "Armazenamento em cartão MicroSD ou gravação em nuvem",
        "Compatível com Alexa e Google Assistente"
      ]
    },
    {
      title: "Gravador Digital Multi-HD 16 Canais",
      model: "Intelbras MHDX 3116 Multi-HD",
      category: "Gravadores e Centrais",
      img: IMAGES.PORTFOLIO_NVR,
      description: "Gravador oficial Intelbras MHDX 3116 com 16 canais Multi-HD, chassi 1U metálico para rack ou bancada com aletas de refrigeração, LEDs frontais (Power, Net, HDD), porta USB e inteligência artificial perimetral. Gravação contínua 24h com acesso remoto criptografado via Intelbras Cloud e iSIC Lite.",
      features: [
        "16 canais Multi-HD oficiais Intelbras em chassi metálico 1U",
        "Compressão H.265+ que economiza até 70% de espaço em disco",
        "LEDs frontais de diagnóstico (Power, Net, HDD) e porta USB para backup",
        "Busca forense inteligente por pessoas ou veículos gravados"
      ]
    },
    {
      title: "Central de Alarme Sem Fio Smart",
      model: "AMT 8000 Intelbras",
      category: "Alarmes e Sensores",
      img: IMAGES.SERVICE_ALARME,
      description: "Sistema de alarme corporativo e residencial sem fio com transmissão de longo alcance e bateria de longa duração para máxima proteção.",
      features: [
        "Comunicação criptografada imune a interferências",
        "Disparo imediato com notificação no smartphone",
        "Sensores infravermelhos com imunidade a animais domésticos (PET)",
        "Sirene sem fio de alta potência para intimidação"
      ]
    },
    {
      title: "Controle de Acesso Biométrico e Facial",
      model: "SS 3530 MF Facial",
      category: "Controle de Acesso",
      img: IMAGES.SERVICE_ACESSO,
      description: "Controlador de acesso de alta velocidade com leitura facial precisa mesmo com máscara e liberação instantânea de portas e catracas.",
      features: [
        "Reconhecimento facial ultrarrápido em menos de 0,2 segundos",
        "Capacidade para milhares de usuários cadastrados",
        "Relatórios de entrada e saída em tempo real",
        "Integração com portas automáticas, eletroímãs e catracas"
      ]
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Segurança Eletrônica e CFTV Inteligente em Brasília",
    "serviceType": "Instalação e Manutenção de Segurança Eletrônica",
    "provider": {
      "@type": "LocalBusiness",
      "name": "NDS CFTV Digital",
      "image": IMAGES.LOGO,
      "telephone": "+55-61-99830-8655",
      "url": "https://ndscftvdigital.com.br/seguranca-eletronica",
      "areaServed": [
        "Guará", "Taguatinga", "Asa Sul", "Asa Norte", "Lago Sul", "Lago Norte", "Park Way", "Noroeste", "Sudoeste", "Brasília"
      ]
    },
    "description": "Projetos completos de segurança eletrônica com câmeras de CFTV IP Intelbras, gravação em NVR/DVR 4K, centrais de alarme e controle de acesso biométrico no Distrito Federal."
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-cyan-500 selection:text-white">
      <SEOHelper 
        title="Segurança Eletrônica & CFTV Inteligente em Brasília | NDS CFTV Digital"
        description="Instalação de câmeras CFTV IP Intelbras, DVR, NVR 4K, alarmes e controle de acesso no DF. Atendemos Asa Sul, Asa Norte, Guará, Taguatinga, Lago Sul e região."
        schema={schema}
      />
      <SiteHeader />

      <main className="flex-grow pt-24">
        {/* HERO SECTION */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border-b border-cyan-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-3/5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest">
                <Shield className="w-4 h-4 text-amber-400" /> Segurança Eletrônica Profissional
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                CFTV Inteligente & <br />
                <span className="text-cyan-400">Proteção Avançada</span> em Brasília
              </h1>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
                Projetos completos de monitoramento em alta definição com equipamentos oficiais <strong className="text-white">Intelbras</strong>. Câmeras IP com inteligência artificial, gravação contínua 24h, reconhecimento facial e acesso remoto no celular.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => openWhatsApp()}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>Solicitar Orçamento Grátis</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Garantia de Instalação e Suporte</span>
                </div>
              </div>
            </div>

            <div className="md:w-2/5 w-full flex justify-center">
              <div className="relative group cursor-pointer" onClick={() => setSelectedImage(EQUIPMENTS[0])}>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-75 transition duration-500" />
                <div className="relative bg-slate-900 border border-cyan-500/30 p-4 rounded-2xl">
                  <img
                    src={IMAGES.PORTFOLIO_PTZ}
                    alt="Speed Dome VIP PTZ Intelbras"
                    className="w-full max-h-[320px] object-contain rounded-xl"
                  />
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-bold text-white">VIP 8232 SD IA Intelbras</span>
                    <span className="text-cyan-400 flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" /> Clique p/ Ampliar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EQUIPAMENTOS INTELBRAS INTERATIVOS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">
              Catálogo Tecnológico
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              Equipamentos Oficiais Intelbras de Alta Performance
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Clique em qualquer fotografia para ampliar com zoom, ver especificações técnicas detalhadas e solicitar orçamento direto com instalação em Brasília.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <p className="text-slate-400 text-xs leading-relaxed mt-3 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Ver Detalhes Técnicos <ArrowRight className="w-3.5 h-3.5" />
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

        {/* BENEFÍCIOS E ENGENHARIA NDS */}
        <section className="bg-slate-900/60 border-y border-white/10 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Eye className="w-8 h-8 text-cyan-400" />
              <h4 className="text-lg font-black uppercase text-white">Visualização Remota 24h</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Acesse suas câmeras em tempo real pelo celular, tablet ou computador de qualquer lugar do mundo com aplicativo oficial Intelbras sem travas.
              </p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Cpu className="w-8 h-8 text-amber-400" />
              <h4 className="text-lg font-black uppercase text-white">Inteligência Artificial Ativa</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filtre falsos alarmes causados por animais ou vento. Receba alertas imediatos apenas quando pessoas ou veículos suspeitos invadirem seu perímetro.
              </p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Award className="w-8 h-8 text-cyan-400" />
              <h4 className="text-lg font-black uppercase text-white">Instalação Limpa e Certificada</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cabeamento 100% cobreado em eletrodutos e canaletas sem fios aparentes, com garantia total de serviço em todo o Distrito Federal.
              </p>
            </div>
          </div>
        </section>

        {/* ATENDIMENTO REGIONAL DF */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 md:p-12 rounded-3xl border border-cyan-500/30 space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-4 h-4" /> Atendimento Técnico no Distrito Federal
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase text-white">
              Precisando de Câmeras ou Segurança na sua Região?
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto">
              Realizamos visitas técnicas ágeis no <strong>Guará, Taguatinga, Asa Sul, Asa Norte, Lago Sul, Lago Norte, Park Way, Noroeste, Sudoeste</strong> e demais regiões de Brasília.
            </p>
            <div className="pt-4">
              <button
                onClick={() => openWhatsApp()}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 mx-auto shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Agendar Visita Técnica pelo WhatsApp</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL DE IMAGEM AMPLIADA */}
      <ImageModal
        item={selectedImage}
        onClose={() => setSelectedImage(null)}
        onContactWhatsApp={(title) => openWhatsApp(title)}
      />

      <SiteFooter />
    </div>
  );
}
