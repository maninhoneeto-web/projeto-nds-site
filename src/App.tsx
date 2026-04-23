import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Menu, X, ChevronDown, MessageCircle, 
  Shield, Camera, Server, Key, Zap, Power, Wifi, Wrench, HelpCircle,
  Smartphone, BellRing, Download, Image
} from 'lucide-react';

/* ============================
   DATA CONFIGURATIONS
============================ */
const TABS = [
  { id: 'cameras', label: 'Câmeras IP', icon: Camera },
  { id: 'smart', label: 'Linha Mibo', icon: Shield },
  { id: 'videoporteiro', label: 'Vídeo Porteiros', icon: BellRing },
  { id: 'dvr', label: 'Gravadores (DVR/NVR)', icon: Server },
  { id: 'acesso', label: 'Acesso e Biometria', icon: Key },
  { id: 'cerca', label: 'Cerca Elétrica', icon: Zap },
  { id: 'portao', label: 'Portões Automáticos', icon: Power },
  { id: 'alarme', label: 'Alarmes', icon: Shield },
  { id: 'ti', label: 'Redes e TI', icon: Wifi },
  { id: 'manutencao', label: 'Manutenção', icon: Wrench },
  { id: 'faq', label: 'Duvidas (FAQ)', icon: HelpCircle },
];

const CAMERAS = [
  { id: 1, type: 'Speed Dome', category: 'Externa', img: "https://m.media-amazon.com/images/I/51wXwEwXYYL._AC_SL1000_.jpg", title: "Speed Dome PTZ", model: "Intelbras VIP 8232 PTZ", specs: ["Zoom Óptico de 32x", "Infravermelho inteligente (150m)", "Auto-tracking e mapa de calor", "IP66 e IK10 Antivandalismo", "Corpo em Alumínio"] },
  { id: 2, type: 'Bullet', category: 'Externa', img: "https://m.media-amazon.com/images/I/41sW95L8HnL._AC_SL1000_.jpg", title: "Câmera Bullet IP HD", model: "Intelbras VIP 1130 B G4", specs: ["Resolução 1 Megapixel (720p)", "Lente fixa de 2.8 mm", "Visão Noturna IR até 30m", "Case de metal IP67"] },
  { id: 3, type: 'Bullet', category: 'Externa', img: "https://m.media-amazon.com/images/I/41D1Xro8-XL._AC_SX679_.jpg", title: "Câmera Full Color Inteligente", model: "Intelbras Mibo iM5 SC", specs: ["Imagens 100% coloridas à noite", "Sirene de Alerta Embutida", "Antena Dupla Wi-Fi", "Qualidade Full HD 1080p"] },
  { id: 4, type: 'Dome', category: 'Interna', img: "https://m.media-amazon.com/images/I/41Q8L4sC0tL._AC_SL1000_.jpg", title: "Câmera Dome Interna IP", model: "Intelbras VIP 1120 D G2", specs: ["Design compacto para teto", "Ângulo de visão amplo de 109°", "Instalação super discreta", "Visão Noturna Inteligente"] }
];

const PRODUCTS = {
  smart: [
    { title: "Mibo Wi-Fi Full HD", model: "Intelbras iM5 SC", img: "https://m.media-amazon.com/images/I/41D1Xro8-XL._AC_SX679_.jpg", specs: ["Versatilidade Externa Mibo", "Visão Noturna Otimizada", "Antena Wi-Fi Dupla", "Alarme e Sirene Integrados"] },
    { title: "Mibo Robô Integrada", model: "Intelbras iM4 C", img: "https://m.media-amazon.com/images/I/41D9K3K32-L._AC_SY879_.jpg", specs: ["Cobertura Total de 360°", "Interação por Voz Bidirecional", "Auto-Tracking de Pessoas", "Visão Noturna Avançada"] },
    { title: "Mibo 360° Externa", model: "Intelbras iM7 Full Color", img: "https://m.media-amazon.com/images/I/51r5I8PihqL._AC_SL1000_.jpg", specs: ["Imagens Coloridas no Escuro Real", "Visão Robotizada Completa", "Detecção Humana (IA)", "Resistência IP66"] },
    { title: "Kit Mesh Wi-Fi Exclusivo", model: "Twibi Force (Kit)", img: "https://m.media-amazon.com/images/I/413dKz8Mv5L._AC_SX679_.jpg", specs: ["Rede Integrada Unificada", "Alta velocidade e cobertura", "Suporta múltiplas câmeras", "Instalação super fáil via App"] }
  ],
  videoporteiro: [
    { title: "Vídeoporteiro Wi-Fi", model: "Intelbras Allo w3 Lite", img: "https://m.media-amazon.com/images/I/51zXtz27mZL._AC_SL1000_.jpg", specs: ["Atendimento direto no Smartphone", "Conexão totalmente Wi-Fi", "Gravação Automática de Foto", "Módulo de Campainha Interna"] },
    { title: "Vídeoporteiro Monitor 7\"", model: "Intelbras WT7", img: "https://m.media-amazon.com/images/I/61Uv5I5dFGL._AC_SL1000_.jpg", specs: ["Monitor Touch Screen Completo", "Telas touch extra HD", "Controle Total App Allo", "Acionamento Duplo (2 portões)"] }
  ],
  dvr: [
    { title: "Gravador de Vídeo Digital", model: "DVR Intelbras Básico a 32CH", img: "https://m.media-amazon.com/images/I/51j1WnLqVlL._AC_SL1000_.jpg", specs: ["Visualização em 4K e Full HD", "Reconhecimento Facial (Série i)", "Suporte Multi-Tecnologia (Pentabrid)", "HDs de Alta Capacidade (WD Purple)"] },
    { title: "Gravador IP Central (NVR)", model: "Intelbras NVD", img: "https://m.media-amazon.com/images/I/51j1WnLqVlL._AC_SL1000_.jpg", specs: ["Para Projetos 100% IP", "Entradas PoE Incorporadas", "Gestão Inteligente H.265+", "Gravação sem perda de frames"] }
  ],
  acesso: [
    { title: "Fechadura Digital Biométrica", model: "Intelbras FR 201", img: "https://m.media-amazon.com/images/I/51d6S9T27wL._AC_SL1000_.jpg", specs: ["Abertura por Senha, Tag ou Digital", "Proteção Antiarrombamento", "Teclado Touch Integrado", "Funcionamento a Pilhas (Inclusas)"] },
    { title: "Relé de Automação", model: "Intelbras IGD 110", img: "https://m.media-amazon.com/images/I/41Jk96Zq67L._AC_SY879_.jpg", specs: ["Automatize luzes e portões", "Compatível com Alexa / Google", "App Inteligente Izy Smart", "Comunicação Bivolt Automática"] }
  ],
  cerca: [
    { title: "Eletrificador Central", model: "Intelbras ELC 5002", img: "https://m.media-amazon.com/images/I/51YJmP9z2wL._AC_SL1000_.jpg", specs: ["Descarga Violenta de 18 Mil Volts", "Setores de alarme embutidos", "Configuração Simplificada", "Monitoramento Contínuo do Fio"] },
    { title: "Kit Hastes Industriais", model: "Hastes Estrela / Big Haste", img: "https://m.media-amazon.com/images/I/61D79E7y59L._AC_SL1000_.jpg", specs: ["Produzidas em Alumínio Maciço", "Isoladores grossos contra quebra", "Máxima durabilidade UV", "Estética profissional no muro"] }
  ],
  portao: [
    { title: "Motor Deslizante Rápido", model: "Intelbras DR 600", img: "https://m.media-amazon.com/images/I/516m124zQLL._AC_SL1000_.jpg", specs: ["Movimenta Portões até 600 Kilos", "Abertura Expressa e Inteligente", "Chassis Robusto em Alumínio", "Inclui cremalheiras"] },
    { title: "Módulo Portão Smart", model: "Intelbras IGD 110 (Izy)", img: "https://m.media-amazon.com/images/I/41Jk96Zq67L._AC_SY879_.jpg", specs: ["Transforma seu motor antigo em Smart", "Abra ou Feche pelo seu Celular 4G", "Verifique se o portão está aberto", "Receba notificações em tempo real"] }
  ],
  alarme: [
    { title: "Central de Alarme Intelbras", model: "Série AMT 8000 Pro", img: "https://m.media-amazon.com/images/I/41zK61c9DUL._AC_SL1000_.jpg", specs: ["Estrutura 100% Wireless (Sem Fios)", "Longo Alcance entre Sensores", "Detecção Avançada (Presença/Abertura)", "Integração Celular via Nuvem"] }
  ],
  ti: [
    { title: "Cabeamento & Rack Servidor", model: "Estrutura Rack Padrão 19\"", img: "https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&q=80&w=400&h=300", specs: ["Organização Total de Fios de Rede", "Patch Panels de Alta Performance", "Proteção Contra Poeira e Impactos", "Garantia de Velocidade Gigabit"] },
    { title: "Switch PoE Alta Potência", model: "Switches Gerenciáveis", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=400&h=300", specs: ["PoE+ (Energia via cabo de rede)", "Conexão Estável em Larga Escala", "Isolamento Físico de Circuito", "Para complexos de grande porte"] }
  ],
  manutencao: [
    { title: "Reparo Profundo (Câmeras)", model: "Serviços em Geral", img: "https://images.unsplash.com/photo-1534944415848-0ca1a6ec0409?auto=format&fit=crop&q=80&w=400&h=300", specs: ["Substituição de Lentes", "Refação de Rede Rompida", "Troca Baluns e Conversor", "Alinhamento Físico de Ângulo"] },
    { title: "Otimização DVR/HD", model: "Serviço Pós-Pânico", img: "https://images.unsplash.com/photo-1616423640778-28d1b53229b1?auto=format&fit=crop&q=80&w=400&h=300", specs: ["Troca de HD Danificado", "Backup de Incidentes Grave", "Recuperação de Senha Mestra", "Integração Celular Novamente"] }
  ]
};

const FAQS = [
  { q: "A NDS CFTV atende quais regiões?", a: "Nosso foco corporativo e condominial está no DF (Asa Sul, Norte, Águas Claras, Guará, Lago Sul). Atendemos emergências rapidamente nestas zonas." },
  { q: "Qual a garantia nas instalações?", a: "Todos os equipamentos fornecidos (Intelbras) possuem prazo mínimo de 1 ano. Nossos serviços contam com garantia integral de alinhamento e mão de obra de 90 dias." },
  { q: "Posso acessar pelo celular de fora do país?", a: "Sim. A integração via Intelbras Cloud ou No-IP permite visualização segura de qualquer lugar do mundo pelo app iSIC." },
  { q: "Funciona numa queda de energia?", a: "Apenas se solicitada a inclusão de um Nobreak Dedicado para segurança. Sugerimos Nobreaks na central do DVR e do Alarme para 24h sem interrupção." }
];

/* ============================
   COMPONENTS
============================ */

// Componente de Faq Accordion Animado
function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      layout
      className="bg-[#0f172a]/60 backdrop-blur-md border border-cyan-500/20 shadow-lg rounded-xl overflow-hidden mb-4"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-cyan-900/20 transition-colors"
      >
        <span className="text-white font-semibold">{question}</span>
        <ChevronDown className={`text-cyan-400 w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 pb-5 text-slate-300 text-sm overflow-hidden"
          >
            <div className="pt-2 border-t border-cyan-800/50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// O NOVO CÓDIGO DO PRODUCT CARD -> Estático e Blindado para carregar sempre
function ProductCard({ id, img, title, model, specs }: { id: string | number, img: string, title: string, model: string, specs: string[] }) {
  return (
    <motion.div 
      layout
      whileHover="hover"
      className="bg-[#0f172a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col items-start relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 bg-cyan-600 shadow-[0_0_10px_#0891b2] text-white text-[10px] font-black px-4 py-1 rounded-bl-lg z-20 uppercase">
        Intelbras
      </div>

      <div className="w-full h-48 mb-4 overflow-hidden rounded-lg bg-slate-900 border border-slate-800 relative group/img">
        <motion.img 
          src={img}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1557597774-9d2739f85a94?auto=format&fit=crop&q=80&w=400&h=300";
          }}
          referrerPolicy="no-referrer"
          variants={{
            hover: { scale: 1.15, rotate: 1, filter: "brightness(1.2) contrast(1.1)" },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />

        <motion.div 
          className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400 shadow-[0_0_15px_#22d3ee] z-10 pointer-events-none"
          variants={{
            hover: { y: [0, 192, 0], opacity: 1 },
          }}
          initial={{ opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-0 opacity-80 pointer-events-none" />
      </div>

      <h3 className="text-white text-lg font-bold z-10 uppercase tracking-tight">{title}</h3>
      <p className="text-cyan-400 text-[10px] font-mono mb-4 mt-1 border-b border-cyan-900/50 pb-2 w-full z-10 uppercase tracking-widest">{model}</p>
      
      <ul className="flex-1 space-y-2 mb-2 z-10 w-full">
        {specs.map((spec, i) => (
          <li key={i} className="text-slate-300 text-[11px] flex items-start gap-2 leading-tight">
            <span className="text-cyan-500 font-bold mt-[1px]">▸</span>
            {spec}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ============================
   COMPONENTES DE LOGO & HEADER
============================ */
function InteractiveLogo({ isMobile }: { isMobile?: boolean }) {
  // Removida lógica de localStorage para evitar erros em navegadores com restrição de cookies
  return (
    <div className={`relative flex items-center p-1 rounded-lg ${isMobile ? 'gap-2' : 'gap-3'}`}>
      <div className="flex items-center gap-2 md:gap-3 relative z-10">
        {isMobile ? (
          <Shield className="text-cyan-500 w-6 h-6" />
        ) : (
          <div className="p-2 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Shield className="text-white w-6 h-6" />
          </div>
        )}
        <div>
          <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-black text-white tracking-widest uppercase`}>NDS<span className="text-cyan-400">CFTV</span></h1>
          {!isMobile && <p className="text-[10px] uppercase text-cyan-500 tracking-widest font-mono font-bold">Segurança Digital</p>}
        </div>
      </div>
    </div>
  );
}

/* ============================
   MAIN APPLICATION
============================ */
export default function App() {
  const [activeTab, setActiveTab] = useState('cameras');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [cameraFilter, setCameraFilter] = useState('Todos');

  const sendQuoteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "5561998308655"; // Número NDS CFTV Digital correto
    const msg = "Olá NDS! Preciso de um orçamento técnico.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col md:flex-row overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* BGM & Partículas */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #0891b2 0%, #020617 60%)' }} />

      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0f172a]/90 backdrop-blur-md border-b border-cyan-900/50 z-50 sticky top-0">
        <InteractiveLogo isMobile={true} />
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white p-2">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* SIDEBAR INTELIGENTE (ANIMADA) */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 768) && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#0f172a]/80 backdrop-blur-2xl border-r border-cyan-900/50 shadow-[4px_0_40px_rgba(6,182,212,0.05)] z-40 flex flex-col ${isSidebarOpen ? 'block' : 'hidden md:flex'}`}
          >
            <div className="p-6 border-b border-cyan-900/50 hidden md:flex items-center gap-3">
              <InteractiveLogo />
            </div>

            <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
              <ul className="space-y-1 px-3">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsSidebarOpen(false);
                          setCameraFilter('Todos');
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                          isActive 
                          ? 'bg-cyan-900/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                          : 'text-slate-400 hover:bg-slate-800/50 justify-start hover:text-white'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                        {tab.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-6 border-t border-cyan-900/50 bg-[#020617]/50 mt-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-cyan-950/80 flex items-center justify-center border border-cyan-800">
                  <Shield className="w-5 h-5 text-cyan-500" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-white">Parceiro Autorizado</p>
                  <p className="text-xs text-slate-400">Instalação & Configuração</p>
                </div>
              </div>
              <button 
                onClick={() => setIsQuoteOpen(true)}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)] transition-all flex items-center justify-center gap-2"
              >
                <Wrench className="w-5 h-5" />
                Manutenção de Urgência
              </button>
              
              <div 
                className="text-center text-[10px] text-slate-500 mt-8 pb-2 transition-colors"
              >
                <p className="font-bold tracking-widest text-slate-400 uppercase mb-1">© 2026 NDS Tecnologia</p>
                <p>Todos os direitos reservados.</p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* CONTEÚDO PRINCIPAL TELA */}
      <main className="flex-1 w-full bg-transparent min-h-screen relative z-10 flex flex-col">
        {/* Banner Simples / Breadcrumb */}
        <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto flex-1">
          
          <AnimatePresence mode="wait">
            
            {/* TELA DE CÂMERAS - ESPECIAL COM FILTRO */}
            {activeTab === 'cameras' && (
              <motion.div key="cameras" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-3xl lg:text-4xl font-black mb-2 text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">Câmeras IP Inteligentes</h2>
                <p className="text-slate-400 mb-8 border-b border-cyan-900/50 pb-6">Catálogo de imagens cristalinas via protocolos IP para ambientes que exigem precisão.</p>
                
                {/* Filtros Animados Dinâmicos */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {['Todos', 'Speed Dome', 'Bullet', 'Dome', 'Externa', 'Interna'].map(filter => (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      key={filter}
                      onClick={() => setCameraFilter(filter)}
                      className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                        cameraFilter === filter 
                        ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                        : 'bg-[#0f172a]/60 text-slate-400 border-cyan-900 hover:border-cyan-500 hover:text-cyan-300'
                      }`}
                    >
                      {filter}
                    </motion.button>
                  ))}
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {CAMERAS.filter(c => cameraFilter === 'Todos' || c.type === cameraFilter || c.category === cameraFilter).map((cam) => (
                      <ProductCard key={cam.id} id={`cam-${cam.id}`} img={cam.img} title={cam.title} model={cam.model} specs={cam.specs} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}

            {/* Renderizador de Outras Categorias */}
            {Object.keys(PRODUCTS).map(categoryKey => (
              activeTab === categoryKey && (
                <motion.div key={categoryKey} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-3xl lg:text-4xl font-black mb-2 text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.3)] capitalize">
                    {TABS.find(t => t.id === categoryKey)?.label}
                  </h2>
                  <p className="text-slate-400 mb-8 border-b border-cyan-900/50 pb-6">Equipamentos e Serviços de Alta Performance e Garantia de Funcionamento.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PRODUCTS[categoryKey as keyof typeof PRODUCTS].map((prod, i) => (
                      <ProductCard key={i} id={`${categoryKey}-${i}`} img={prod.img} title={prod.title} model={prod.model} specs={prod.specs} />
                    ))}
                  </div>
                </motion.div>
              )
            ))}

            {/* ABA DE FAQ ISOLADA */}
            {activeTab === 'faq' && (
              <motion.div key="faq" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-3xl lg:text-4xl font-black mb-2 text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">Dúvidas Frequentes</h2>
                <p className="text-slate-400 mb-8 border-b border-cyan-900/50 pb-6">Encontre respostas rápidas sobre nossa atuação e garantias de rede.</p>
                <div className="max-w-4xl">
                  {FAQS.map((f, i) => (
                    <FaqItem key={i} question={f.q} answer={f.a} />
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* OVERLAY MODAL */}
      <AnimatePresence>
        {isQuoteOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#020617]/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0f172a] border-t-2 border-cyan-500 rounded-2xl p-6 lg:p-8 w-full max-w-lg shadow-[0_0_50px_rgba(6,182,212,0.15)] relative"
            >
              <button 
                onClick={() => setIsQuoteOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <Wrench className="w-8 h-8 text-red-500" />
                <h2 className="text-2xl font-black text-white">Emergência NDS</h2>
              </div>
              <p className="text-sm text-slate-400 mb-6 border-b border-slate-800 pb-4">
                Seu sistema parou? Chame nossa equipe técnica imediatamente via WhatsApp para agendamento de Manutenção de Urgência no local.
              </p>

              <button 
                onClick={sendQuoteRequest}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]"
              >
                <MessageCircle className="w-5 h-5" />
                Solicitar Manutenção Imediata
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHATSAPP FLUTUANTE ANIMADO */}
      <motion.button
        onClick={sendQuoteRequest}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[990] bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white p-4 rounded-full shadow-[0_4px_30px_rgba(37,211,102,0.6)] flex items-center justify-center group border border-[#25D366]/50"
        title="Atendimento Rápido via WhatsApp"
      >
        <motion.div
           animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="absolute inset-0 rounded-full bg-[#25D366] z-0 pointer-events-none"
        />
        <MessageCircle className="w-8 h-8 lg:w-10 lg:h-10 relative z-10 drop-shadow-md" />
        
        {/* Balão Indicativo Opcional aparecendo no hover */}
        <span className="absolute right-full mr-4 bg-white text-[#128C7E] font-bold text-sm px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Fale Conosco!
        </span>
      </motion.button>

    </div>
  );
}
