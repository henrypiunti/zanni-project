import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const s1 = useInView(); const s2 = useInView();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const { error: err } = await supabase.from('contact_messages').insert(form);
    setSending(false);
    if (err) { setError('Erro ao enviar mensagem. Tente novamente.'); return; }
    setSent(true);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <section className="relative py-24">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gold/5 blur-[80px] rounded-full pointer-events-none" />
        <div ref={s1.ref} className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${s1.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-gold text-xs tracking-[0.3em] uppercase">Fale Conosco</span>
          <h1 className="font-display text-5xl md:text-6xl mt-4 mb-6 font-light">Entre em <span className="text-gradient-gold">Contato</span></h1>
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">Estamos em Marília, prontos para atender você. Tire suas dúvidas ou agende sua avaliação.</p>
        </div>
      </section>

      <section className="pb-24">
        <div ref={s2.ref} className={`max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-1000 ${s2.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <h2 className="font-display text-3xl font-light mb-8">Informações de <span className="text-gradient-gold">Contato</span></h2>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0"><MapPin size={16} className="text-gold" /></div>
                <div>
                  <div className="text-white font-medium mb-1">Endereço</div>
                  <div className="text-white/50 text-sm">Rua Arco Verde, esquina com Av. Santo Antônio<br />Marília, SP</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0"><Phone size={16} className="text-gold" /></div>
                <div>
                  <div className="text-white font-medium mb-1">Telefone / WhatsApp</div>
                  <a href="tel:+551499999999" className="text-white/50 text-sm hover:text-gold transition-colors duration-200">(14) 9 9999-9999</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0"><Mail size={16} className="text-gold" /></div>
                <div>
                  <div className="text-white font-medium mb-1">E-mail</div>
                  <a href="mailto:contato@evolutti.com.br" className="text-white/50 text-sm hover:text-gold transition-colors duration-200">contato@evolutti.com.br</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0"><Clock size={16} className="text-gold" /></div>
                <div>
                  <div className="text-white font-medium mb-1">Horários</div>
                  <div className="text-white/50 text-sm">Seg — Sex: 8h às 20h<br />Sábado: 8h às 16h</div>
                </div>
              </div>
            </div>
            <a href="https://wa.me/551499999999" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 border border-[#25D366] text-[#25D366] px-6 py-3 text-sm tracking-widest uppercase font-medium hover:bg-[#25D366] hover:text-black transition-all duration-300 mb-10">
              <MessageCircle size={16} /> Falar no WhatsApp
            </a>
            <div className="border border-white/10 overflow-hidden h-48 relative">
              <iframe title="Localização Evolutti Laser" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0!2d-49.95!3d-22.21!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDEyJzM2LjAiUyA0OcKwNTcnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%" height="100%" style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }} allowFullScreen={false} loading="lazy" />
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-light mb-8">Envie uma <span className="text-gradient-gold">Mensagem</span></h2>
            {sent ? (
              <div className="border border-gold/30 bg-gold/5 p-8 text-center">
                <div className="w-12 h-12 border border-gold mx-auto flex items-center justify-center mb-4"><Send size={20} className="text-gold" /></div>
                <h3 className="text-white font-medium mb-2">Mensagem Enviada!</h3>
                <p className="text-white/50 text-sm">Entraremos em contato em breve. Obrigada pelo interesse na Evolutti Laser & Estética!</p>
                <button onClick={() => setSent(false)} className="mt-6 text-gold text-xs tracking-widest uppercase hover:underline">Enviar outra mensagem</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">Nome *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Seu nome completo" className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">Telefone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="(14) 9 9999-9999" className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-200" />
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">E-mail *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="seu@email.com" className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-200" />
                </div>
                <div>
                  <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">Mensagem *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Como podemos ajudar você?" className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-200 resize-none" />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button type="submit" disabled={sending} className="group flex items-center gap-3 bg-gold text-black px-8 py-4 font-medium tracking-widest text-sm uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-60">
                  {sending ? 'Enviando...' : 'Enviar Mensagem'} <Send size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
