import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Plus, Search, ChevronRight, Phone, MapPin, 
  Settings, LogOut, Shield, Calendar, Camera, Bell,
  PlusCircle, Trash2, CheckCircle2, Clock, QrCode,
  Image as ImageIcon, Loader2, ArrowLeft, BarChart2, TrendingUp, Eye,
  Github
} from 'lucide-react';
import { 
  collection, query, getDocs, addDoc, serverTimestamp, 
  where, orderBy, deleteDoc, doc, updateDoc, onSnapshot
} from 'firebase/firestore';
import { auth, db, googleProvider, githubProvider, handleFirestoreError } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User, GithubAuthProvider } from 'firebase/auth';
import { QRCodeSVG } from 'qrcode.react';

// TYPES
interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  createdAt: any;
}

interface Installation {
  id: string;
  customerId: string;
  type: string;
  description: string;
  status: 'Em andamento' | 'Concluído' | 'Manutenção';
  photosBefore: string[];
  photosAfter: string[];
  qrCodeData?: string;
  createdAt: any;
}

interface Maintenance {
  id: string;
  customerId: string;
  installationId?: string;
  taskType: string;
  dueDate: any;
  completed: boolean;
  notes?: string;
}

export const ServiceManager: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [maintenance, setMaintenance] = useState<Maintenance[]>([]);
  const [visits, setVisits] = useState<any[]>([]);
  
  // UI States
  const [currentTab, setCurrentTab] = useState<'customers' | 'analytics'>('customers');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showAddInstallation, setShowAddInstallation] = useState(false);
  const [showAddMaintenance, setShowAddMaintenance] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [globalLoading, setGlobalLoading] = useState(false);

  const AUTHORIZED_EMAILS = [
    'maninhoneeto@gmail.com',
    'maninhoneeto-web@users.noreply.github.com',
    'maninhoneeto-web' // Adicionado como fallback
  ];

  const isAuthorized = user && (
    AUTHORIZED_EMAILS.some(e => user.email?.toLowerCase().trim() === e.toLowerCase().trim()) ||
    user.providerData.some(p => p.email?.toLowerCase().trim() === 'maninhoneeto@gmail.com') ||
    user.displayName?.toLowerCase().includes('maninhoneeto') ||
    user.email?.toLowerCase().includes('maninhoneeto')
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      console.log('AUTHORIZATION DEBUG:', {
        email: user.email,
        displayName: user.displayName,
        isAuthorized: !!isAuthorized,
        uid: user.uid,
        providers: user.providerData.map(p => ({ id: p.providerId, email: p.email }))
      });
    }
  }, [user, isAuthorized]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'customers'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setCustomers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Customer)));
      }, (error) => {
        console.error('Firestore Error (Customers):', error);
      });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (user && isAuthorized) {
      const q = query(collection(db, 'visits'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setVisits(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, (error) => {
        console.error('Firestore Error (Visits):', error);
      });
      return () => unsubscribe();
    }
  }, [user, isAuthorized]);

  useEffect(() => {
    if (selectedCustomer) {
      const instQ = query(collection(db, 'installations'), where('customerId', '==', selectedCustomer.id));
      const unsubInst = onSnapshot(instQ, (s) => {
         setInstallations(s.docs.map(d => ({ id: d.id, ...d.data() } as Installation)));
      }, (error) => {
        console.error('Erro no Firestore (Instalações):', error);
      });

      const maintQ = query(collection(db, 'maintenance'), where('customerId', '==', selectedCustomer.id));
      const unsubMaint = onSnapshot(maintQ, (s) => {
         setMaintenance(s.docs.map(d => ({ id: d.id, ...d.data() } as Maintenance)));
      }, (error) => {
        console.error('Erro no Firestore (Manutenção):', error);
      });

      return () => { unsubInst(); unsubMaint(); };
    }
  }, [selectedCustomer]);

  const login = async (provider: 'google' | 'github' = 'google') => {
    try {
      setGlobalLoading(true);
      const authProvider = provider === 'google' ? googleProvider : githubProvider;
      await signInWithPopup(auth, authProvider);
    } catch (e: any) {
      if (e.code === 'auth/popup-closed-by-user') {
        console.log('Login cancelado pelo usuário');
      } else {
        console.error(e);
      }
    } finally {
      setGlobalLoading(false);
    }
  };

  const logout = () => signOut(auth);

  const handleAddCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
      createdAt: serverTimestamp()
    };
    try {
      await addDoc(collection(db, 'customers'), data);
      setShowAddCustomer(false);
    } catch (e) {
      handleFirestoreError(e, 'create', 'customers');
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleAddInstallation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    setGlobalLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      customerId: selectedCustomer.id,
      type: formData.get('type') as string,
      description: formData.get('description') as string,
      status: 'Em andamento',
      photosBefore: [],
      photosAfter: [],
      qrCodeData: `https://wa.me/5561998308655?text=Suporte Tecnico para ${selectedCustomer.name}`,
      createdAt: serverTimestamp()
    };
    try {
      await addDoc(collection(db, 'installations'), data);
      setShowAddInstallation(false);
    } catch (e) {
      handleFirestoreError(e, 'create', 'installations');
    } finally {
      setGlobalLoading(false);
    }
  };

  const toggleMaintenance = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, 'maintenance', id), { completed: !current });
    } catch (e) {
      handleFirestoreError(e, 'update', 'maintenance');
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
    </div>
  );

  if (!user || !isAuthorized) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-cyan-500/20 shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)]">
          <Shield className="w-10 h-10 text-cyan-500" />
        </div>
        
        {user && !isAuthorized ? (
          <>
            <h1 className="text-3xl font-black text-rose-500 uppercase tracking-tighter mb-4">Acesso Negado</h1>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-4">Informações do Login:</p>
              <div className="space-y-2">
                <p className="text-sm text-white font-medium flex justify-between"><span className="text-slate-500">E-mail:</span> {user.email || 'Não informado'}</p>
                <p className="text-sm text-white font-medium flex justify-between"><span className="text-slate-500">Nome:</span> {user.displayName || 'Não informado'}</p>
                <p className="text-sm text-white font-medium flex justify-between"><span className="text-slate-500">Provedor:</span> {user.providerData[0]?.providerId}</p>
              </div>
            </div>
            <p className="text-slate-400 mb-8 font-medium tracking-wide text-sm">
              Esta conta não está na lista de administradores.
            </p>
            <div className="space-y-4">
              <button 
                onClick={logout}
                className="w-full py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest transition-all hover:bg-white/10 flex items-center justify-center gap-3"
              >
                <LogOut className="w-5 h-5" />
                Trocar de Conta
              </button>
              <button 
                onClick={() => login('github')}
                className="w-full py-4 bg-slate-800 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest transition-all hover:bg-slate-700 flex items-center justify-center gap-3 group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Tentar com GitHub
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">NDS Service Manager</h1>
            <p className="text-slate-400 mb-10 font-medium tracking-wide">Área exclusiva para gestão de clientes e manutenções.</p>
            <div className="space-y-4">
              <button 
                onClick={() => login('google')}
                className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl flex items-center justify-center gap-3"
              >
                Acessar com Google
              </button>
              <button 
                onClick={() => login('github')}
                className="w-full py-5 bg-slate-800 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest transition-all hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 group"
              >
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="opacity-90">Acessar com GitHub</span>
              </button>
            </div>
          </>
        )}

        <button 
          onClick={() => window.location.hash = ''}
          className="mt-8 text-slate-500 font-bold uppercase tracking-widest text-[10px] hover:text-cyan-500 transition-colors"
        >
          Voltar para o site público
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      {/* Sidebar Desktop / Top Bar Mobile */}
      <div className="flex flex-col lg:flex-row h-screen">
        
        {/* SIDEBAR */}
        <aside className="w-full lg:w-80 bg-slate-900 border-b lg:border-r border-white/5 p-6 flex flex-col shrink-0">
          <div className="flex items-center gap-4 mb-10 px-2 lg:px-0">
            <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-black text-lg uppercase tracking-tight leading-none">NDS Manager</h2>
              <span className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">Painel Administrativo</span>
            </div>
          </div>

          <div className="space-y-2 flex-grow overflow-y-auto">
            <button 
              onClick={() => {
                setSelectedCustomer(null);
                setCurrentTab('customers');
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentTab === 'customers' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-white/5'}`}
            >
              <Users className="w-5 h-5" />
              <span className="font-bold text-sm uppercase tracking-wider">Clientes</span>
            </button>
              <button 
                onClick={() => {
                  setSelectedCustomer(null);
                  setCurrentTab('analytics');
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentTab === 'analytics' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-white/5'}`}
              >
                <BarChart2 className="w-5 h-5" />
                <span className="font-bold text-sm uppercase tracking-wider">Acessos</span>
              </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 transition-all">
              <Bell className="w-5 h-5" />
              <span className="font-bold text-sm uppercase tracking-wider">Lembretes</span>
            </button>
          </div>

          <div className="pt-6 border-t border-white/5 space-y-4">
            <div className="flex items-center gap-3 px-2">
              <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-lg" />
              <div className="flex-grow min-w-0">
                <p className="font-bold text-xs truncate uppercase tracking-tight text-white">{user.displayName}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all font-bold text-xs uppercase tracking-widest"
            >
              <LogOut className="w-4 h-4" />
              Sair do Sistema
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow overflow-y-auto bg-slate-950">
          <div className="max-w-6xl mx-auto p-6 md:p-10">
            
            <AnimatePresence mode="wait">
              {!selectedCustomer ? (
                currentTab === 'customers' ? (
                  <motion.div
                    key="customer-list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                      <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">Base de Clientes</h1>
                        <p className="text-slate-400 font-medium tracking-wide">Gerencie todos os seus parceiros e instalações.</p>
                      </div>
                      <button 
                        onClick={() => setShowAddCustomer(true)}
                        className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-3"
                      >
                        <Plus className="w-5 h-5" />
                        Novo Cliente
                      </button>
                    </div>

                    {/* SEARCH */}
                    <div className="relative mb-8 group">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-500 transition-colors" />
                      <input 
                        type="text"
                        placeholder="Buscar por nome ou telefone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-medium text-lg placeholder:text-slate-600"
                      />
                    </div>

                    {/* CUSTOMER GRID */}
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredCustomers.map((customer) => (
                        <motion.div
                          key={customer.id}
                          layoutId={customer.id}
                          onClick={() => setSelectedCustomer(customer)}
                          className="group bg-slate-900 border border-white/5 p-6 rounded-[2rem] hover:border-cyan-500/30 transition-all cursor-pointer relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-5 h-5 text-cyan-500" />
                          </div>
                          <div className="flex items-center gap-4 mb-6">
                             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                                <Users className="w-6 h-6 text-slate-500 group-hover:text-cyan-500" />
                             </div>
                             <div>
                                <h3 className="font-black text-lg uppercase tracking-tight text-white leading-none mb-1">{customer.name}</h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{customer.phone}</p>
                             </div>
                          </div>
                          <div className="space-y-3">
                             <div className="flex items-center gap-2 text-slate-400 text-xs">
                                <MapPin className="w-4 h-4 text-slate-600" />
                                <span className="truncate">{customer.address || 'Endereço não informado'}</span>
                             </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {filteredCustomers.length === 0 && !globalLoading && (
                      <div className="py-20 text-center">
                        <Users className="w-16 h-16 text-slate-800 mx-auto mb-4" />
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Nenhum cliente encontrado</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="analytics-dashboard"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="mb-12">
                      <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">Relatório de Acessos</h1>
                      <p className="text-slate-400 font-medium tracking-wide">Monitoramento de acessos e tráfego do site.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                      <div className="bg-slate-900 border border-white/5 p-8 rounded-[2rem] flex items-center gap-6">
                        <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center">
                          <Eye className="w-8 h-8 text-cyan-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total de Acessos</p>
                          <h4 className="text-3xl font-black text-white leading-none mt-1">{visits.length}</h4>
                        </div>
                      </div>
                      
                      <div className="bg-slate-900 border border-white/5 p-8 rounded-[2rem] flex items-center gap-6">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                          <TrendingUp className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Últimas 24h</p>
                          <h4 className="text-3xl font-black text-white leading-none mt-1">
                            {visits.filter(v => v.timestamp?.toDate ? v.timestamp.toDate() > new Date(Date.now() - 24 * 60 * 60 * 1000) : false).length}
                          </h4>
                        </div>
                      </div>

                      <div className="bg-slate-900 border border-white/5 p-8 rounded-[2rem] flex items-center gap-6">
                        <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                          <Plus className="w-8 h-8 text-purple-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Sessões Únicas</p>
                          <h4 className="text-3xl font-black text-white leading-none mt-1">
                            {new Set(visits.map(v => v.userAgent)).size}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden">
                      <div className="p-8 border-b border-white/5">
                        <h3 className="text-xl font-black uppercase tracking-tighter">Log de Acessos Recentes</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-white/5">
                              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Data e Hora</th>
                              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Página</th>
                              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Dispositivo/Navegador</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {visits.slice(0, 10).map((visit) => (
                              <tr key={visit.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-8 py-6 text-sm font-medium text-slate-300">
                                  {visit.timestamp?.toDate ? visit.timestamp.toDate().toLocaleString('pt-BR') : 'Processando...'}
                                </td>
                                <td className="px-8 py-6">
                                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-[10px] font-black uppercase tracking-widest rounded-lg">
                                    {visit.page}
                                  </span>
                                </td>
                                <td className="px-8 py-6 text-xs text-slate-500 font-mono max-w-xs truncate">
                                  {visit.userAgent}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )
              ) : (
                <motion.div
                  key="customer-detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button 
                    onClick={() => setSelectedCustomer(null)}
                    className="flex items-center gap-2 text-cyan-500 font-black uppercase text-xs tracking-widest mb-8 hover:gap-3 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para lista
                  </button>

                  <div className="flex flex-col lg:flex-row gap-10 items-start mb-16">
                    <div className="flex-grow">
                      <h1 className="text-5xl font-black uppercase tracking-tighter text-white mb-4">{selectedCustomer.name}</h1>
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2 text-slate-400 font-medium">
                          <Phone className="w-5 h-5 text-cyan-500" />
                          {selectedCustomer.phone}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-medium">
                          <MapPin className="w-5 h-5 text-cyan-500" />
                          {selectedCustomer.address}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                        <Settings className="w-6 h-6 text-slate-400" />
                      </button>
                      <button className="p-4 bg-rose-500/10 rounded-2xl hover:bg-rose-500/20 transition-all">
                        <Trash2 className="w-6 h-6 text-rose-500" />
                      </button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-10">
                    {/* INSTALLATIONS */}
                    <div className="lg:col-span-2 space-y-8">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                          <Camera className="w-6 h-6 text-cyan-500" />
                          Instalações
                        </h2>
                        <button 
                          onClick={() => setShowAddInstallation(true)}
                          className="flex items-center gap-2 text-cyan-500 font-black uppercase text-xs tracking-widest hover:text-white transition-colors"
                        >
                          <PlusCircle className="w-5 h-5" />
                          Adicionar
                        </button>
                      </div>

                      <div className="space-y-6">
                        {installations.map((inst) => (
                          <div key={inst.id} className="bg-slate-900 border border-white/5 rounded-3xl p-8">
                            <div className="flex items-center justify-between mb-8">
                              <div>
                                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-[10px] font-black uppercase tracking-widest rounded-lg mb-2 inline-block">
                                  {inst.type}
                                </span>
                                <h3 className="text-xl font-black uppercase tracking-tight">{inst.description}</h3>
                              </div>
                              <div className="text-right">
                                <QrCode className="w-10 h-10 text-white/20 mb-2 cursor-pointer hover:text-cyan-500 transition-colors" tabIndex={0} />
                                <div className="hidden group-focus:block">
                                  <QRCodeSVG value={inst.qrCodeData || ''} size={128} />
                                </div>
                              </div>
                            </div>

                            {/* PHOTOS BEFORE/AFTER PLACEHOLDER */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Antes</p>
                                <div className="aspect-square bg-slate-800 rounded-2xl flex flex-col items-center justify-center border border-dashed border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer">
                                  <Plus className="w-5 h-5 text-slate-600 mb-2" />
                                  <ImageIcon className="w-6 h-6 text-slate-700" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Depois</p>
                                <div className="aspect-square bg-slate-800 rounded-2xl flex flex-col items-center justify-center border border-dashed border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer">
                                  <Plus className="w-5 h-5 text-slate-600 mb-2" />
                                  <ImageIcon className="w-6 h-6 text-slate-700" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* MAINTENANCE / REMINDERS */}
                    <div className="space-y-8">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                          <Clock className="w-6 h-6 text-cyan-500" />
                          Próximas Visitas
                        </h2>
                      </div>
                      <div className="space-y-4">
                        {maintenance.map(m => (
                          <div key={m.id} className={`p-6 rounded-[2rem] border transition-all ${m.completed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-900 border-white/5'}`}>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-grow">
                                <p className={`font-black uppercase tracking-tight mb-1 ${m.completed ? 'text-emerald-400 line-through' : 'text-white'}`}>{m.taskType}</p>
                                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {m.dueDate?.toDate ? m.dueDate.toDate().toLocaleDateString('pt-BR') : 'Sem data'}
                                </div>
                              </div>
                              <button 
                                onClick={() => toggleMaintenance(m.id, m.completed)}
                                className={`p-2 rounded-xl transition-all ${m.completed ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-500 hover:text-white'}`}
                              >
                                <CheckCircle2 className="w-6 h-6" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </main>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {showAddCustomer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 w-full max-w-lg rounded-[3rem] p-10 border border-white/10 shadow-2xl relative"
            >
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Novo Cliente</h2>
              <form onSubmit={handleAddCustomer} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Nome Completo</label>
                  <input name="name" required className="w-full bg-slate-800 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">WhatsApp</label>
                    <input name="phone" required className="w-full bg-slate-800 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">E-mail</label>
                    <input name="email" type="email" className="w-full bg-slate-800 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Endereço da Instalação</label>
                  <input name="address" className="w-full bg-slate-800 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowAddCustomer(false)} className="flex-grow py-4 border border-white/10 rounded-2xl font-black uppercase tracking-widest hover:bg-white/5 transition-all">Cancelar</button>
                  <button type="submit" disabled={globalLoading} className="flex-grow py-4 bg-cyan-600 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:bg-cyan-500 transition-all disabled:opacity-50">
                    {globalLoading ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showAddInstallation && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 w-full max-w-lg rounded-[3rem] p-10 border border-white/10 shadow-2xl relative"
            >
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Nova Instalação</h2>
              <form onSubmit={handleAddInstallation} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Tipo de Serviço</label>
                  <select name="type" required className="w-full bg-slate-800 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer">
                    <option value="Câmera">Câmera (Intelbras IP)</option>
                    <option value="Alarme">Sistema de Alarme</option>
                    <option value="Cerca Elétrica">Cerca Elétrica</option>
                    <option value="Interfone">Interfone / Vídeo Porteiro</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Breve Descrição</label>
                  <input name="description" required placeholder="Ex: Kit 4 Câmeras Full HD" className="w-full bg-slate-800 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowAddInstallation(false)} className="flex-grow py-4 border border-white/10 rounded-2xl font-black uppercase tracking-widest hover:bg-white/5 transition-all">Cancelar</button>
                  <button type="submit" disabled={globalLoading} className="flex-grow py-4 bg-cyan-600 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:bg-cyan-500 transition-all disabled:opacity-50">
                    {globalLoading ? 'Adicionar' : 'Adicionar'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* OVERLAY LOADING */}
      {globalLoading && (
        <div className="fixed inset-0 z-[200] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
        </div>
      )}
    </div>
  );
};
