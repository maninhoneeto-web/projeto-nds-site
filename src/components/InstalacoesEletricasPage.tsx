import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, Power, ShieldAlert, CheckCircle2, MessageCircle, 
  ZoomIn, ArrowRight, MapPin, Award, Lightbulb, Flame 
} from 'lucide-react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { SEOHelper } from './SEOHelper';
import { ImageModal, ModalImageData } from './ImageModal';
import { IMAGES } from '../constants/images';

export function InstalacoesEletricasPage() {
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
        ? `Olá NDS! Vim pela página de Instalações Elétricas e gostaria de um orçamento para: ${equipment}.`
        : "Olá NDS! Vim pela página de Instalações Elétricas e gostaria de um orçamento elétrico em Brasília."
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const EQUIPMENTS: ModalImageData[] = [
    {
      title: "Quadros de Distribuição Elétrica (QDC)",
      model: "Padrão NBR 5410 com DPS e DR",
      category: "Proteção Elétrica",
      img: IMAGES.SERVICE_ELETRICA,
      description: "Montagem e reforma completa de quadros elétricos com balanceamento de fases, disjuntores termomagnéticos, barramento pente e protetor de surtos DPS para proteger equipamentos sensíveis contra raios.",
      features: [
        "Dispositivo DR (Diferencial Residual) para proteção humana contra choques",
        "DPS Classe II para proteção de câmeras, computadores e eletrodomésticos",
        "Balanceamento de cargas para evitar desarmes frequentes e sobreaquecimento",
        "Identificação visual de todos os circuitos (iluminação, tomadas, ar, chuveiro)"
      ]
    },
    {
      title: "Circuitos Dedicados para Segurança e TI",
      model: "Linha de Alimentação Estabilizada / No-break",
      category: "Alimentação Crítica",
      img: IMAGES.PORTFOLIO_ELETRICA,
      description: "Instalação de circuitos elétricos exclusivos e aterramento técnico para centrais de alarme, NVRs de CFTV, motores de portão e servidores, prevenindo queimas por oscilação de tensão.",
      features: [
        "Aterramento elétrico padrão com hastes de cobre cobreadas de alta pureza",
        "Filtros de linha industriais e barramento de equipotencialização (BEP)",
        "Prevenção de ruídos elétricos nas imagens das câmeras de segurança",
        "Conexão direta a bancos de no-break para autonomia ininterrupta"
      ]
    },
    {
      title: "Instalações Elétricas Prediais & Iluminação",
      model: "Projetos Residenciais e Comerciais",
      category: "Infraestrutura Elétrica",
      img: IMAGES.INSTALACAO,
      description: "Lançamento de fiação antichama (norma ABNT), substituição de tomadas, instalação de interruptores inteligentes, refletores de LED com sensor de presença e iluminação de emergência.",
      features: [
        "Cabos flexíveis antichama de bitola certificada pelo INMETRO",
        "Instalação de refletores de segurança com acendimento automático",
        "Correção de curto-circuitos e fuga de corrente que encarecem a conta de luz",
        "Adequação técnica completa para vistorias do Corpo de Bombeiros e seguradoras"
      ]
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Instalações Elétricas Residenciais e Comerciais em Brasília",
    "serviceType": "Serviços Elétricos e Montagem de Quadros",
    "provider": {
      "@type": "LocalBusiness",
      "name": "NDS CFTV Digital",
      "image": IMAGES.LOGO,
      "telephone": "+55-61-99830-8655",
      "url": "https://ndscftvdigital.com.br/instalacoes-eletricas",
      "areaServed": [
        "Guará", "Taguatinga", "Asa Sul", "Asa Norte", "Lago Sul", "Lago Norte", "Park Way", "Noroeste", "Sudoeste", "Brasília"
      ]
    },
    "description": "Instalação e manutenção elétrica em Brasília. Montagem de quadros de distribuição, proteção contra surtos DPS, tomadas, iluminação técnica e circuitos no DF."
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-cyan-500 selection:text-white">
      <SEOHelper 
        title="Instalações Elétricas Residenciais e Comerciais em Brasília | NDS CFTV"
        description="Montagem de quadros de distribuição, proteção DPS contra raios, tomadas, circuitos e iluminação no DF. Atendemos Asa Sul, Asa Norte, Guará, Taguatinga e região."
        schema={schema}
      />
      <SiteHeader />

      <main className="flex-grow pt-24">
        {/* HERO SECTION */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-3/5 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest">
                <Zap className="w-4 h-4 text-amber-400" /> Elétrica Segura & Conforme NBR 5410
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                Instalações Elétricas & <br />
                <span className="text-cyan-400">Quadros de Distribuição</span> no DF
              </h1>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
                Segurança absoluta para sua família e patrimônio. Montagem de quadros de energia organizados com proteção DPS contra raios, circuitos dedicados para segurança e eliminação de riscos de curto-circuito.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => openWhatsApp()}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>Pedir Orçamento de Elétrica</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Materiais Homologados pelo INMETRO</span>
                </div>
              </div>
            </div>

            <div className="md:w-2/5 w-full flex justify-center">
              <div className="relative group cursor-pointer" onClick={() => setSelectedImage(EQUIPMENTS[0])}>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-75 transition duration-500" />
                <div className="relative bg-slate-900 border border-cyan-500/30 p-4 rounded-2xl">
                  <img
                    src={IMAGES.SERVICE_ELETRICA}
                    alt="Quadro Elétrico com DPS e DR"
                    className="w-full max-h-[300px] object-contain rounded-xl"
                  />
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-bold text-white">Quadro de Distribuição NBR 5410</span>
                    <span className="text-cyan-400 flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" /> Ampliar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVIÇOS ELÉTRICOS INTERATIVOS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">
              Engenharia Elétrica & Manutenção
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              Serviços de Alta Precisão e Segurança
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              A eletricidade não aceita improvisos. Nossas intervenções respeitam rigorosamente as normas técnicas para garantir longevidade aos seus aparelhos eletrônicos.
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

        {/* POR QUE MODERNIZAR SEU QUADRO ELÉTRICO */}
        <section className="bg-slate-900/60 border-y border-white/10 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Power className="w-8 h-8 text-cyan-400" />
              <h4 className="text-lg font-black uppercase text-white">Proteção Contra Raios (DPS)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Brasília registra alta incidência de descargas atmosféricas. O DPS desvia os picos de voltagem direto para a terra, salvando TVs, NVRs e computadores.
              </p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Flame className="w-8 h-8 text-amber-400" />
              <h4 className="text-lg font-black uppercase text-white">Prevenção de Incêndios</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fiações antigas superaquecem sob a demanda de novos eletrodomésticos. Dimensionamos fios e disjuntores para operar em temperatura segura.
              </p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Lightbulb className="w-8 h-8 text-cyan-400" />
              <h4 className="text-lg font-black uppercase text-white">Eficiência & Economia</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Identificamos fugas de energia e perdas por conexões frouxas, reduzindo desperdícios na conta mensal de energia da CEB/Neoenergia.
              </p>
            </div>
          </div>
        </section>

        {/* ATENDIMENTO DF */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 md:p-12 rounded-3xl border border-cyan-500/30 space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-4 h-4" /> Eletricistas Especializados em Brasília
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase text-white">
              Precisa Reformar seu Quadro ou Fazer Manutenção Elétrica?
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto">
              Atendimento técnico no <strong>Guará, Taguatinga, Asa Sul, Asa Norte, Lago Sul, Lago Norte, Park Way, Noroeste e Sudoeste</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => openWhatsApp()}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 mx-auto shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Chamar Eletricista no WhatsApp</span>
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
