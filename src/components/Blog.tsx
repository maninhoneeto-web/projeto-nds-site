import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOHelper } from './SEOHelper';
import { 
  ArrowLeft, Calendar, User, ArrowRight, X, MessageCircle, Clock, BookOpen, CheckCircle 
} from 'lucide-react';
import { IMAGES } from '../constants/images';

interface ArticleData {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string[];
}

export function Blog() {
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openWhatsApp = () => {
    const phone = "5561998308655";
    const msg = encodeURIComponent("Olá NDS! Vim pelo blog e gostaria de uma proposta.");
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const ARTICLES: ArticleData[] = [
    {
      id: "como-escolher-cftv-brasilia",
      title: "Como escolher uma empresa de CFTV em Brasília",
      excerpt: "Encontre o parceiro de segurança eletrônica ideal no DF. Saiba quais critérios técnicos exigir e evite dores de cabeça com instalações amadoras.",
      date: "18 de Junho de 2026",
      readTime: "5 min de leitura",
      category: "Guia de Compra",
      image: IMAGES.PORTFOLIO_PTZ,
      content: [
        "A escolha de uma empresa de CFTV (Circuito Fechado de Televisão) em Brasília é uma decisão crucial para proteger seu patrimônio corporativo ou residencial. Instalações mal planejadas, fiações expostas e equipamentos incompatíveis geram brechas graves de segurança e custos recorrentes com manutenção técnica.",
        "Para não errar na contratação, o primeiro critério é verificar o tempo de mercado do fornecedor. Empresas renomadas possuem parcerias oficiais com grandes marcas, como a Intelbras, o que garante acesso direto a equipamentos homologados e canais de garantia rápida.",
        "Em segundo lugar, exija assessoria técnica prévia. Uma empresa séria enviará um projetista especializado para realizar um mapeamento dos pontos cegos da sua edificação antes de formular qualquer proposta comercial. Fujas de orçamentos padronizados elaborados puramente por mensagens virtuais.",
        "Por fim, certifique-se da assistência pós-venda. Sistemas eletrônicos devem operar ininterruptamente. Contar com uma empresa que ofereça agilidade no suporte presencial e manutenção preventiva periódica (SLA prioritário) faz toda a diferença para o seu bem-estar."
      ]
    },
    {
      id: "seguranca-eletronica-condominios",
      title: "Segurança eletrônica para condomínios: O guia definitivo",
      excerpt: "Descubra como integrar câmeras inteligentes, cercas eletrônicas eficientes e controle de fluxo biométrico para proteger residências coletivas com eficiência.",
      date: "12 de Junho de 2026",
      readTime: "7 min de leitura",
      category: "Condomínios",
      image: IMAGES.INSTALACAO,
      content: [
        "Condomínios residenciais e empresariais no Distrito Federal têm buscado na tecnologia uma aliada contra invasões e incidentes de segurança. No entanto, a instalação de equipamentos dispersos e sem sincronia reduz consideravelmente a efeicácia do monitoramento.",
        "A segurança condominial de excelência reside na integração. Câmeras IP com inteligência perimetral ativa de borda formam a primeira linha de proteção. Ao identificarem o cruzamento de linhas virtuais nos muros em horários impróprios, elas disparam alertas à central de maneira instantânea.",
        "Complementando as câmeras, as conexões físicas devem estar seguras: fiações subterrâneas e no-breaks industriais robustos garantem a continuidade dos serviços mesmo durante blecautes elétricos frequentes em épocas de chuvas.",
        "Implementar portarias digitais autônomas, onde moradores liberam visitantes por tags RFID ou QR Codes provisórios no aplicativo celular, reduz o atrito e documenta cada fluxo de forma digital e inalterável."
      ]
    },
    {
      id: "controle-acesso-empresas",
      title: "Controle de acesso para empresas: Produtividade e Defesa",
      excerpt: "Os incríveis benefícios de migrar para chaves por reconhecimento facial e biometria digital. Proteja dados empresariais e restrinja acessos indesejados.",
      date: "05 de Junho de 2026",
      readTime: "4 min de leitura",
      category: "Corporativo",
      image: IMAGES.SERVICE_ACESSO,
      content: [
        "Para as grandes corporações e escritórios, controlar quem entra e sai das instalações não é apenas uma questão de segurança física, mas também de proteção de ativos intangíveis, como servidores de dados e segredos industriais.",
        "Substituir fechaduras mecânicas tradicionais por leituras de biometria ou reconhecimento facial impede a cópia indevida de chaves físicas e audita o fluxo. Cada acesso é registrado com data, hora e identificação exata do colaborador.",
        "Os sistemas integrados atuais permitem definir permissões granulares: determinados colaboradores acessam apenas escritórios comuns, enquanto a gerência e o TI possuem autorização exclusiva para entrar em almoxarifados e CPDs.",
        "Além disso, em condomínios comerciais de alta densidade no Sudoeste ou Asa Sul, a liberação por reconhecimento facial diminui filas na recepção, gerando uma experiência de elegância e fluidez para clientes de alto padrão."
      ]
    },
    {
      id: "beneficios-rede-estruturada",
      title: "Benefícios do cabeamento e rede estruturada corporativa",
      excerpt: "Por que uma rede robusta de TI é o alicerce essencial para que suas câmeras IP e sistemas de gestão funcionem com velocidade máxima e zero travamento.",
      date: "29 de Maio de 2026",
      readTime: "6 min de leitura",
      category: "Redes e TI",
      image: IMAGES.PORTFOLIO_RACK,
      content: [
        "A rede de computadores e fiação de TI é frequentemente negligenciada durante reformas, sendo tratada apenas como um detalhe de acabamento. Contudo, ela representa o esqueleto invisible que sustenta todos os sistemas da sua organização.",
        "Ao instalar câmeras IP modernas com gravações em resoluções UHD 4K, uma rede instável sofrerá latência extrema, resultando em perdas de quadros nas gravações exatamente nos momentos mais necessários. O cabeamento estruturado homologado (Cat 6 ou Cat 6A) resolve este gargalo de banda.",
        "Racks de TI organizados e com correta identificação visual facilitam a manutenção preventiva rápida do seu suporte de informática, prevenindo que um cabo desconectado acidentalmente derrube seu banco de dados ou suas conexões de segurança.",
        "Investir em infraestrutura de rede robusta garante estabilidade para sua empresa acompanhar as evoluções tecnológicas sem a necessidade de readequações de alvenaria por décadas."
      ]
    },
    {
      id: "monitoramento-inteligente-ia",
      title: "Monitoramento inteligente com Inteligência Artificial",
      excerpt: "Adeus aos falsos alarmes gerados por ventanias ou animais. Entenda como algoritmos de aprendizado de máquina revolucionaram o mercado de CFTV.",
      date: "20 de Maio de 2026",
      readTime: "5 min de leitura",
      category: "Novas Tecnologias",
      image: IMAGES.SERVICE_MIBO,
      content: [
        "A inteligência artificial transformou radicalmente os sistemas de segurança globais. Câmeras tradicionais geravam centenas de e-mails de alerta inúteis por capturarem o movimento de animais de estimação ou folhagens trazidas pelo vento.",
        "As câmeras dotadas de IA embarcada contam com algoritmos de aprendizagem rápida treinados para diferenciar formas humanas e veículos de ruídos ambientais. Assim, o alarme de segurança perimetral só tocará em situações de perigo real.",
        "Com o reconhecimento de placas (LPR) integrado na ponta, as cancelas automotivas de indústrias e galpões abrem-se espontaneamente para caminhões homologados, dispensando interações humanas e agilizando a logística empresarial.",
        "Nós, da NDS CFTV Digital, somos pioneiros na implantação desse ecossistema avançado em Brasília. Desenvolvemos projetos inteligentes focados em segurança preditiva que antecipam cenários de sinistro."
      ]
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog de Segurança Eletrônica NDS CFTV",
    "url": "https://nds-cftv-digital.com.br/blog",
    "publisher": {
      "@type": "Organization",
      "name": "NDS CFTV Digital",
      "logo": IMAGES.LOGO
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      <SEOHelper 
        title="Blog sobre Segurança e Monitoramento CFTV no DF | NDS"
        description="Leia artigos técnicos e dicas práticas sobreCFTV inteligente com IA, segurança para condomínios residenciais, cabeamento estruturado e redes corporativas em Brasília."
        schema={schema}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
            <img src={IMAGES.LOGO} alt="NDS" className="w-12 h-12 object-cover rounded-xl" />
            <div className="leading-none text-left">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white">NDS<span className="text-cyan-500">CFTV</span></span>
              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-500">Digital</p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 border border-white/10 hover:bg-white/5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao Início
          </button>
        </div>
      </nav>

      {/* HERO HERO PAGE */}
      <header className="relative pt-36 pb-16 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(6,182,212,0.1),transparent)] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-[10px] uppercase font-black tracking-widest">Conteúdo Estratégico Técnico</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none mb-4">
            Blog da Segurança Inteligente
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Mantenha-se informado com artigos de engenheiros especializados sobre inovações em câmeras com IA, biometrias prediais e infraestrutura de rede corporativa.
          </p>
        </div>
      </header>

      {/* ARTICLES LIST */}
      <main className="py-12 max-w-7xl mx-auto px-6 md:px-12 flex-grow">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article 
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-slate-900/40 rounded-3xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-48 relative overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-cyan-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full">{article.category}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-slate-500 text-[10px] uppercase tracking-wider font-bold mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-cyan-500" /> {article.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-cyan-500" /> {article.readTime}</span>
                  </div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-snug hover:text-cyan-400 transition-colors mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                </div>
              </div>
              
              <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between text-cyan-400 text-xs font-black uppercase tracking-widest group">
                <span>Ler Artigo Completo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* BLOG FOOTER */}
      <footer className="bg-slate-950 border-t border-white/5 py-12 px-6 md:px-12 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img src={IMAGES.LOGO} alt="NDS" className="w-12 h-12 object-cover rounded-xl" />
            <div className="leading-none text-left">
              <span className="text-lg font-black tracking-tighter text-white">NDS<span className="text-cyan-500">CFTV</span></span>
              <p className="text-[8px] uppercase tracking-widest font-bold text-slate-500">Digital © 2026</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 max-w-md text-center md:text-right">
            Dicas práticas e conceitos avançados de CFTV IP, fechaduras inteligentes e fibras ópticas em Brasília.
          </p>
        </div>
      </footer>

      {/* READING MODAL */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-sm"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-50 bg-slate-800 shadow-lg p-2.5 rounded-full text-white border border-white/10 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ART BANNER */}
            <div className="h-56 md:h-72 relative w-full shrink-0">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-cyan-600 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 inline-block">{selectedArticle.category}</span>
                <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none">{selectedArticle.title}</h2>
              </div>
            </div>

            {/* ART CONTENT */}
            <div className="p-8 md:p-12 overflow-y-auto space-y-6 text-slate-300 leading-relaxed text-base">
              <div className="flex items-center gap-6 text-slate-500 text-xs uppercase tracking-wider font-bold border-b border-white/5 pb-4">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-cyan-400" /> {selectedArticle.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-cyan-400" /> {selectedArticle.readTime}</span>
                <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-cyan-400" /> Autor: Consultoria NDS</span>
              </div>
              
              {selectedArticle.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}

              <div className="bg-slate-950/40 p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 mt-8">
                <div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-1">Gostaria de uma proposta sob medida?</h4>
                  <p className="text-xs text-slate-500">Desenvolvemos projetos de monitoramento e redes com os melhores equipamentos do país.</p>
                </div>
                <button 
                  onClick={openWhatsApp}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all w-full md:w-auto text-center"
                >
                  Falar no WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP */}
      <button 
        onClick={openWhatsApp}
        className="fixed bottom-8 right-8 z-[150] bg-green-500 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
    </div>
  );
}
