import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Service } from '../types';

const TIMES = ['08:00','09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];
const MONTH_NAMES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

type Step = 'service' | 'datetime' | 'confirm' | 'done';

export default function Scheduling() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('service');
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.from('services').select('*').eq('active', true).order('sort_order').then(({ data }) => {
      if (data) setServices(data);
    });
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();

  const isDayDisabled = (day: number) => {
    const d = new Date(year, month, day);
    return d < new Date(today.getFullYear(), today.getMonth(), today.getDate()) || d.getDay() === 0;
  };

  const handleBook = async () => {
    if (!user) { navigate('/cliente/login'); return; }
    if (!selectedService || !selectedDay || !selectedTime) return;
    setLoading(true);
    setError('');
    const [h, m] = selectedTime.split(':').map(Number);
    const scheduledAt = new Date(year, month, selectedDay, h, m).toISOString();
    const { error: err } = await supabase.from('appointments').insert({
      user_id: user.id, service_id: selectedService.id, scheduled_at: scheduledAt, notes, status: 'pending',
    });
    setLoading(false);
    if (err) { setError('Erro ao realizar agendamento. Tente novamente.'); return; }
    setStep('done');
  };

  const formatDate = () => {
    if (!selectedDay) return '';
    const d = new Date(year, month, selectedDay);
    return d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <section className="py-16 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-gold text-xs tracking-[0.3em] uppercase">Online</span>
          <h1 className="font-display text-5xl mt-4 mb-4 font-light">Agendamento <span className="text-gradient-gold">Online</span></h1>
          <p className="text-white/50">Escolha seu serviço, data e horário em minutos.</p>
        </div>

        {step !== 'done' && (
          <div className="flex items-center justify-center gap-0 mb-12">
            {(['service','datetime','confirm'] as Step[]).map((s, i) => {
              const labels = ['Serviço','Data e Hora','Confirmação'];
              const active = step === s;
              const done = (step === 'datetime' && i === 0) || (step === 'confirm' && i < 2);
              return (
                <div key={s} className="flex items-center">
                  <div className={`flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300 ${active ? 'text-gold' : done ? 'text-white/40' : 'text-white/20'}`}>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${active ? 'border-gold text-gold' : done ? 'border-white/30 text-white/30' : 'border-white/10 text-white/10'}`}>
                      {done ? <CheckCircle size={12} /> : i + 1}
                    </span>
                    {labels[i]}
                  </div>
                  {i < 2 && <div className="w-8 h-px bg-white/10" />}
                </div>
              );
            })}
          </div>
        )}

        {step === 'service' && (
          <div>
            <h2 className="font-display text-2xl font-light mb-6 text-center">Escolha o <span className="text-gradient-gold">Serviço</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map(s => (
                <button key={s.id} onClick={() => setSelectedService(s)} className={`text-left border p-5 transition-all duration-300 ${selectedService?.id === s.id ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-white/30'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-white font-medium">{s.name}</span>
                    {selectedService?.id === s.id && <CheckCircle size={16} className="text-gold" />}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <span className="flex items-center gap-1"><Clock size={10} /> {s.duration_minutes} min</span>
                    {s.price_from && <span className="text-gold">R$ {s.price_from.toFixed(0)}+</span>}
                  </div>
                  <p className="text-white/40 text-xs mt-2 line-clamp-1">{s.description}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-8">
              <button disabled={!selectedService} onClick={() => setStep('datetime')} className="group flex items-center gap-3 bg-gold text-black px-8 py-4 font-medium tracking-widest text-sm uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
                Próximo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        )}

        {step === 'datetime' && (
          <div>
            <h2 className="font-display text-2xl font-light mb-6 text-center">Escolha <span className="text-gradient-gold">Data e Horário</span></h2>
            <div className="border border-white/10 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="text-white/50 hover:text-gold transition-colors duration-200 p-1"><ChevronLeft size={20} /></button>
                <span className="font-display text-lg text-white">{MONTH_NAMES[month]} {year}</span>
                <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="text-white/50 hover:text-gold transition-colors duration-200 p-1"><ChevronRight size={20} /></button>
              </div>
              <div className="grid grid-cols-7 mb-3">
                {['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(d => (
                  <div key={d} className="text-center text-white/30 text-xs py-2 tracking-widest">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                  const disabled = isDayDisabled(day);
                  const selected = selectedDay === day;
                  return (
                    <button key={day} disabled={disabled} onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                      className={`aspect-square flex items-center justify-center text-sm transition-all duration-200 font-medium ${selected ? 'bg-gold text-black' : disabled ? 'text-white/15 cursor-not-allowed' : 'text-white/70 hover:text-gold hover:bg-white/5'}`}>
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedDay && (
              <div className="border border-white/10 p-6 mb-6">
                <div className="flex items-center gap-2 mb-4 text-white/50 text-xs tracking-widest uppercase">
                  <Clock size={12} /> Horários disponíveis — {formatDate()}
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {TIMES.map(t => (
                    <button key={t} onClick={() => setSelectedTime(t)}
                      className={`py-2 text-sm font-medium border transition-all duration-200 ${selectedTime === t ? 'bg-gold text-black border-gold' : 'border-white/20 text-white/70 hover:border-gold/50 hover:text-white'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-8">
              <button onClick={() => setStep('service')} className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors duration-200"><ChevronLeft size={16} /> Voltar</button>
              <button disabled={!selectedDay || !selectedTime} onClick={() => setStep('confirm')} className="group flex items-center gap-3 bg-gold text-black px-8 py-4 font-medium tracking-widest text-sm uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
                Confirmar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div>
            <h2 className="font-display text-2xl font-light mb-6 text-center">Confirme seu <span className="text-gradient-gold">Agendamento</span></h2>
            <div className="border border-gold/20 p-8 mb-6 space-y-4">
              <div className="flex items-start gap-3 border-b border-white/10 pb-4">
                <Calendar size={16} className="text-gold mt-0.5" />
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Data e Horário</div>
                  <div className="text-white capitalize">{formatDate()} às {selectedTime}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 border-b border-white/10 pb-4">
                <Clock size={16} className="text-gold mt-0.5" />
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Serviço</div>
                  <div className="text-white">{selectedService?.name}</div>
                  <div className="text-white/40 text-sm">{selectedService?.duration_minutes} minutos</div>
                </div>
              </div>
              {selectedService?.price_from && (
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 mt-0.5 flex items-center justify-center"><div className="w-1 h-1 bg-gold rounded-full" /></div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Valor</div>
                    <div className="text-gold font-display text-lg">A partir de R$ {selectedService.price_from.toFixed(0)}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">Observações (opcional)</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Informe alergias, sensibilidades ou outras informações relevantes..."
                className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-200 resize-none" />
            </div>
            {!user && (
              <div className="border border-gold/30 bg-gold/5 p-4 mb-6 text-sm text-white/70">
                Você precisa estar logado para confirmar o agendamento. <button onClick={() => navigate('/cliente/login')} className="text-gold hover:underline">Fazer login</button>
              </div>
            )}
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <div className="flex items-center justify-between">
              <button onClick={() => setStep('datetime')} className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors duration-200"><ChevronLeft size={16} /> Voltar</button>
              <button onClick={handleBook} disabled={loading} className="group flex items-center gap-3 bg-gold text-black px-8 py-4 font-medium tracking-widest text-sm uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-60">
                {loading ? 'Agendando...' : 'Confirmar Agendamento'} <CheckCircle size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 'done' && (
          <div className="text-center py-16">
            <div className="w-20 h-20 border-2 border-gold mx-auto flex items-center justify-center mb-8 animate-pulse"><CheckCircle size={40} className="text-gold" /></div>
            <h2 className="font-display text-4xl font-light mb-4">Agendamento <span className="text-gradient-gold">Confirmado!</span></h2>
            <p className="text-white/50 mb-2">Seu agendamento foi realizado com sucesso.</p>
            <p className="text-white/40 text-sm mb-10">{selectedService?.name} • {formatDate()} às {selectedTime}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/cliente')} className="px-8 py-4 border border-gold text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-300">Ver Meus Agendamentos</button>
              <button onClick={() => { setStep('service'); setSelectedService(null); setSelectedDay(null); setSelectedTime(null); setNotes(''); }} className="px-8 py-4 border border-white/20 text-white/60 text-sm tracking-widest uppercase hover:border-white/40 hover:text-white transition-all duration-300">Novo Agendamento</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
