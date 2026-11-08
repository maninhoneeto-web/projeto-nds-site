import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, Zap, AlertTriangle, CheckCircle2, MessageCircle, 
  ZoomIn, ArrowRight, MapPin, Award, Siren, Lock 
} from 'lucide-react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { SEOHelper } from './SEOHelper';
import { ImageModal, ModalImageData } from './ImageModal';
import { IMAGES } from '../constants/images';

export function CercaEletricaPage() {
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
        ? `Olá NDS! Vim pela página de Cerca Elétrica e gostaria de um orçamento para: ${equipment}.`
        : "Olá NDS! Vim pela página de Cerca Elétrica e gostaria de um orçamento de proteção perimetral em Brasília."
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const EQUIPMENTS: ModalImageData[] = [
    {
      title: "Central de Choque Intelbras ELC",
      model: "ELC 5002 / 5003 High Power",
      category: "Centrais de Cerca",
      img: IMAGES.SERVICE_CERCA,
      description: "Eletrificador perimetral de alta potência com saída de choque pulsativo de até 20.000 Volts. Monitoramento constante de corte e aterramento dos fios da cerca com acionamento imediato de sirene.",
      features: [
        "Choque pulsativo de efeito moral inibitório não letal (norma ABNT/IEC)",
        "Sensor de aterramento inteligente que detecta sabotagens e aterramentos acidentais",
        "Bateria selada interna para continuar funcionando mesmo se faltar energia na rua",
        "Conexão com centrais de alarme e notificação de disparo no aplicativo do celular"
      ]
    },
    {
      title: "Hastes Industriais em Alumínio e Isoladores",
      model: "Hastes de 4 e 6 Isoladores Policarbonato",
      category: "Estrutura Perimetral",
      img: IMAGES.PORTFOLIO_CERCA,
      description: "Hastes de perfil tubular em alumínio naval ou ferro galvanizado com isoladores reforçados com proteção contra raios solares UV, prevenindo ressecamento e falsos disparos por fuga de corrente.",
      features: [
        "Fios em aço inoxidável que não enferrujam nem rompem com o vento",
        "Isoladores de alta rigidez dielétrica com espaçamento regulamentar de segurança",
        "Fixação por chumbadores metálicos de alta resistência contra tração",
        "Placas de advertência regulamentares 'Cuidado: Cerca Elétrica' inclusas"
      ]
    },
    {
      title: "Sensor Perimetral de Barreira Infravermelho",
      model: "Linha IVA 3000 / 5000 Intelbras",
      category: "Detecção Perimetral",
      img: IMAGES.SERVICE_ALARME,
      description: "Feixe duplo ou quádruplo de infravermelho invisível que cria uma barreira virtual sobre muros e portões. Qualquer tentativa de pular o muro corta os feixes e dispara o alarme antes da invasão.",
      features: [
        "Alcance de até 100 metros de proteção em linha reta",
        "Imunidade a neblina, chuva forte e incidência de luz solar direta",
        "Disparo configurável por tempo de bloqueio (evita alarmes por pássaros)",
        "Integração direta com o sistema de câmeras de CFTV"
      ]
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Instalação e Manutenção de Cerca Elétrica em Brasília",
    "serviceType": "Proteção Perimetral e Eletrificadores",
    "provider": {
      "@type": "LocalBusiness",
      "name": "NDS CFTV Digital",
      "image": IMAGES.LOGO,
      "telephone": "+55-61-99830-8655",
      "url": "https://ndscftvdigital.com.br/cerca-eletrica",
      "areaServed": [
        "Guará", "Taguatinga", "Asa Sul", "Asa Norte", "Lago Sul", "Lago Norte", "Park Way", "Noroeste", "Sudoeste", "Brasília"
      ]
    },
    "description": "Instalação e conserto de cerca elétrica e concertina em Brasília com centrais Intelbras ELC High Power, hastes industriais e certificação no DF."
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-cyan-500 selection:text-white">
      <SEOHelper 
        title="Cerca Elétrica & Proteção Perimetral em Brasília | NDS CFTV Digital"
        description="Instalação e manutenção de cerca elétrica Intelbras com choque pulsativo e sirene no DF. Atendemos Asa Sul, Asa Norte, Guará, Taguatinga, Lago Sul e região."
        schema={schema}
      />
      <SiteHeader />

      <main className="flex-grow pt-24">
        {/* HERO SECTION */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-3/5 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest">
                <ShieldAlert className="w-4 h-4 text-amber-400" /> Proteção Perimetral Homologada
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                Cerca Elétrica & <br />
                <span className="text-cyan-400">Proteção Perimetral</span> no DF
              </h1>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
                A primeira linha de defesa contra invasões no seu muro. Centrais Intelbras de alto impacto com detecção de corte de fios, hastes de alumínio resistentes e disparo sonoro imediato.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => openWhatsApp()}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>Pedir Orçamento de Cerca</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Em conformidade com as Normas ABNT</span>
                </div>
              </div>
            </div>

            <div className="md:w-2/5 w-full flex justify-center">
              <div className="relative group cursor-pointer" onClick={() => setSelectedImage(EQUIPMENTS[0])}>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-75 transition duration-500" />
                <div className="relative bg-slate-900 border border-cyan-500/30 p-4 rounded-2xl">
                  <img
                    src={IMAGES.SERVICE_CERCA}
                    alt="Central de Choque Intelbras ELC"
                    className="w-full max-h-[300px] object-contain rounded-xl"
                  />
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-bold text-white">Central Intelbras ELC High Power</span>
                    <span className="text-cyan-400 flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" /> Ampliar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUTOS E MATERIAIS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">
              Tecnologia de Segurança Física
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              Sistemas Perimetrais com Alta Resistência
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Hastes robustas, arame inox reforçado e eletrificadores com dupla isolação para proteger condomínios, residências e empresas contra invasores.
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
              <Siren className="w-8 h-8 text-amber-400" />
              <h4 className="text-lg font-black uppercase text-white">Disparo Imediato de Sirene</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Qualquer tentativa de corte, quebra de haste ou encosto nos fios aciona a sirene de 120dB na hora, afugentando o suspeito antes que ele toque no chão da sua casa.
              </p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Zap className="w-8 h-8 text-cyan-400" />
              <h4 className="text-lg font-black uppercase text-white">Choque Inibitório Legalizado</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Voltagem pulsativa de alta intensidade moral de acordo com os limites regulamentados por lei, garantindo máxima segurança sem risco à vida.
              </p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-3">
              <Lock className="w-8 h-8 text-cyan-400" />
              <h4 className="text-lg font-black uppercase text-white">Manutenção & Reparos Rápidos</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sua cerca elétrica está disparando falso alarme com chuva ou vento? Nossas equipes no DF fazem troca de isoladores ressecados e esticamento imediato de fios.
              </p>
            </div>
          </div>
        </section>

        {/* ATENDIMENTO DF */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 md:p-12 rounded-3xl border border-cyan-500/30 space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-4 h-4" /> Instalação e Manutenção de Cerca no DF
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase text-white">
              Quer Proteger seu Muro ou Reformar a Cerca Existente?
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto">
              Atendemos condomínios e residências no <strong>Guará, Taguatinga, Asa Sul, Asa Norte, Lago Sul, Lago Norte, Park Way, Noroeste e Sudoeste</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => openWhatsApp()}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-3 mx-auto shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Solicitar Orçamento de Cerca Elétrica</span>
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
