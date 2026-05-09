import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle, CreditCard, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Service } from '../types';

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

const categoryLabels: Record<string, string> = { face: 'Rosto', body: 'Corpo', intimate: 'Íntimo', facial_aesthetics: 'Estética Facial', body_aesthetics: 'Estética Corporal', package: 'Combos' };

const serviceImages: Record<string, string> = {
  'Buço': 'https://images.pexels.com/photos/3762874/pexels-photo-3762874.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Axilas': 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Virilha Completa': 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Pernas Completas': 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Barba': 'https://images.pexels.com/photos/3800538/pexels-photo-3800538.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Costas': 'https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Braços Completos': 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Combo Corpo Inteiro': 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=600',
};

const perks = [
  'Combos completos de 10 sessões',
  'Parcelamento em até 18x sem juros',
  'Avaliação gratuita antes de iniciar',
  'Protocolos personalizados por tipo de pele',
  'Equipamentos com certificação ANVISA',
  'Equipe qualificada e humanizada',
  'Ambiente climatizado e privativo',
  'Mais de 14 anos de experiência',
];

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const s1 = useInView(); const s2 = useInView(); const s3 = useInView();

  useEffect(() => {
    supabase.from('services').select('*').eq('active', true).order('sort_order').then(({ data }) => {
      if (data) setServices(data);
    });
  }, []);

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))];
  const filtered = activeCategory === 'all' ? services : services.filter(s => s.category === activeCategory);

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <section className="relative py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
        <div ref={s1.ref} className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${s1.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-gold text-xs tracking-[0.3em] uppercase">O que Oferecemos</span>
          <h1 className="font-display text-5xl md:text-6xl mt-4 mb-6 font-light leading-tight">Nossos <span className="text-gradient-gold">Serviços</span></h1>
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">Depilação a laser em combos de 10 sessões, estética corporal e facial. Tudo com parcelamento em até 18x sem juros no cartão.</p>
        </div>
      </section>

      {/* PAYMENT BANNER */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="border border-gold/20 bg-gradient-to-r from-gold/5 to-transparent p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CreditCard size={24} className="text-gold" />
            <div>
              <span className="text-white font-medium">Parcelamento em até 18x sem juros</span>
              <span className="text-white/50 text-sm ml-2">no cartão de crédito</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gold text-sm">
            <Sparkles size={14} /> Combos de 10 sessões
          </div>
        </div>
      </div>

      <section ref={s2.ref} className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${s2.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2 text-xs tracking-widest uppercase font-medium transition-all duration-300 border ${activeCategory === cat ? 'bg-gold text-black border-gold' : 'border-white/20 text-white/60 hover:border-gold/50 hover:text-white'}`}>
              {cat === 'all' ? 'Todos' : categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
          {filtered.map((service) => (
            <div key={service.id} className="group border border-white/10 hover:border-gold/40 transition-all duration-500 overflow-hidden">
              <div className="relative overflow-hidden h-48">
                <img src={serviceImages[service.name] || 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=600'} alt={service.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                {service.category === 'package' && <div className="absolute top-3 right-3 bg-gold text-black text-xs font-bold px-2 py-1 tracking-wider">COMBO 10</div>}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gold/60 text-xs tracking-widest uppercase">{categoryLabels[service.category] || service.category}</span>
                  <div className="flex items-center gap-1 text-white/40 text-xs"><Clock size={10} />{service.duration_minutes}min</div>
                </div>
                <h3 className="text-white font-medium mb-2">{service.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{service.description}</p>
                <div className="flex items-center justify-between">
                  {service.price_from ? (
                    <div>
                      <span className="text-white/30 text-xs">a partir de</span>
                      <div className="text-gold font-display text-lg">R$ {service.price_from.toFixed(0)}</div>
                    </div>
                  ) : <span className="text-white/40 text-xs">Sob consulta</span>}
                  <Link to="/agendamento" className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest hover:gap-3 transition-all duration-300">
                    Agendar <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div ref={s3.ref} className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${s3.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold text-xs tracking-[0.3em] uppercase">Nossos Diferenciais</span>
              <h2 className="font-display text-4xl mt-3 mb-8 font-light">Por que Somos <span className="text-gradient-gold">Diferentes</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {perks.map(perk => (
                  <div key={perk} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-gold shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-white/50 text-lg leading-relaxed mb-8">Pronta para transformar sua relação com a depilação? Nossa equipe em Marília está esperando por você.</p>
              <Link to="/agendamento" className="group inline-flex items-center gap-3 bg-gold text-black px-8 py-4 font-medium tracking-widest text-sm uppercase hover:bg-gold-light transition-all duration-300">
                Agendar Avaliação Gratuita <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
