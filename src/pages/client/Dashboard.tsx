import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, Plus, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Appointment, Service } from '../../types';

export default function Dashboard() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<(Appointment & { service: Service })[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) navigate('/cliente/login');
    fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data } = await supabase.from('appointments').select('*, service:service_id(name, duration_minutes, price_from)').eq('user_id', user?.id).order('scheduled_at', { ascending: false });
    if (data) setAppointments(data);
    setLoading(false);
  };

  const handleCancel = async (id: string) => {
    await supabase.from('appointments').update({ status: 'cancelled' }).eq('id', id);
    setAppointments(a => a.map(ap => ap.id === id ? { ...ap, status: 'cancelled' } : ap));
    setCancelId(null);
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const statusColor: Record<string, string> = {
    pending: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    confirmed: 'text-green-500 bg-green-500/10 border-green-500/20',
    completed: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    cancelled: 'text-red-500 bg-red-500/10 border-red-500/20',
  };

  const statusLabel: Record<string, string> = { pending: 'Pendente', confirmed: 'Confirmado', completed: 'Realizado', cancelled: 'Cancelado' };

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className="font-display text-4xl font-light mb-2">Bem-vinda, <span className="text-gradient-gold">{profile?.full_name?.split(' ')[0]}</span></h1>
            <p className="text-white/50 text-sm">Gerencie seus agendamentos e preferências</p>
          </div>
          <button onClick={async () => { await signOut(); navigate('/'); }} className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors duration-200 text-sm tracking-widest uppercase">
            <LogOut size={16} /> Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 border border-white/10 p-6 hover:border-gold/30 transition-all duration-300">
            <h3 className="text-white font-medium mb-4 tracking-widest text-xs uppercase">Dados da Conta</h3>
            <div className="space-y-4">
              <div><label className="text-white/40 text-xs uppercase tracking-widest">Nome</label><p className="text-white">{profile?.full_name}</p></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-white/40 text-xs uppercase tracking-widest">E-mail</label><p className="text-white text-sm">{user?.email}</p></div>
                <div><label className="text-white/40 text-xs uppercase tracking-widest">Telefone</label><p className="text-white text-sm">{profile?.phone || '—'}</p></div>
              </div>
            </div>
          </div>
          <div className="border border-gold/20 bg-gold/3 p-6">
            <h3 className="text-white font-medium mb-4 tracking-widest text-xs uppercase">Próximo Agendamento</h3>
            {appointments.length > 0 && appointments[0].status !== 'cancelled' ? (
              <div className="text-center">
                <p className="text-gold font-display text-lg">{appointments[0].service?.name}</p>
                <p className="text-white/50 text-xs mt-2">{formatDate(appointments[0].scheduled_at)}</p>
              </div>
            ) : <p className="text-white/50 text-sm">Nenhum agendamento próximo</p>}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <h2 className="font-display text-2xl font-light flex items-center gap-3"><Calendar size={24} className="text-gold" /> Meus <span className="text-gradient-gold">Agendamentos</span></h2>
            <button onClick={() => navigate('/agendamento')} className="flex items-center gap-2 bg-gold text-black px-5 py-2 text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-all duration-300"><Plus size={16} /> Novo</button>
          </div>

          {loading ? <div className="text-center py-12 text-white/40">Carregando agendamentos...</div> : appointments.length === 0 ? (
            <div className="border border-white/10 p-12 text-center">
              <AlertCircle size={32} className="text-gold/30 mx-auto mb-4" />
              <p className="text-white/50 mb-6">Você ainda não tem agendamentos.</p>
              <button onClick={() => navigate('/agendamento')} className="inline-flex items-center gap-2 bg-gold text-black px-6 py-3 text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-all duration-300">Agendar Agora <Plus size={14} /></button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map(apt => (
                <div key={apt.id} className={`border p-5 transition-all duration-300 ${apt.status === 'cancelled' ? 'border-white/5 opacity-50' : 'border-white/10 hover:border-gold/30'}`}>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-medium">{apt.service?.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded border ${statusColor[apt.status]}`}>{statusLabel[apt.status]}</span>
                      </div>
                      <p className="text-white/50 text-sm">{formatDate(apt.scheduled_at)} • {apt.service?.duration_minutes} min</p>
                      {apt.notes && <p className="text-white/40 text-xs mt-2 italic">Obs: {apt.notes}</p>}
                    </div>
                    {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                      <button onClick={() => setCancelId(apt.id)} className="px-4 py-2 border border-red-500/30 text-red-400 text-xs tracking-widest uppercase hover:bg-red-500/10 transition-all duration-300">Cancelar</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cancelId && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="border border-white/10 bg-black p-8 max-w-sm w-full">
              <h3 className="text-white font-medium mb-4">Cancelar Agendamento?</h3>
              <p className="text-white/50 text-sm mb-6">Tem certeza que deseja cancelar? Esta ação não pode ser desfeita.</p>
              <div className="flex gap-3">
                <button onClick={() => setCancelId(null)} className="flex-1 px-4 py-3 border border-white/20 text-white text-xs tracking-widest uppercase hover:border-white/40 transition-all duration-300">Não, Manter</button>
                <button onClick={() => handleCancel(cancelId)} className="flex-1 px-4 py-3 bg-red-600/20 border border-red-500/30 text-red-400 text-xs tracking-widest uppercase hover:bg-red-600/30 transition-all duration-300">Sim, Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
