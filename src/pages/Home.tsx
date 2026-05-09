import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Clock, Star, ChevronDown, CheckCircle, CreditCard, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Testimonial } from '../types';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const benefits = [
  { icon: Zap, title: 'Tecnologia Avançada', desc: 'Equipamentos de última geração com laser de alta potência para máxima eficácia na depilação definitiva.' },
  { icon: Shield, title: '14 Anos de Experiência', desc: 'Mais de uma década de expertise, começando como franquia Diolaser e hoje com marca própria consolidada.' },
  { icon: Clock, title: 'Combos de 10 Sessões', desc: 'Tratamentos completos em combos de 10 sessões para garantir resultados definitivos e duradouros.' },
  { icon: CreditCard, title: '18x Sem Juros', desc: 'Facilitamos o acesso com parcelamento em até 18x sem juros no cartão de crédito.' },
];

const areas = ['Buço', 'Axilas', 'Virilha Completa', 'Pernas', 'Barba', 'Costas', 'Braços', 'Corpo Inteiro', 'Estética Facial', 'Estética Corporal'];

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const heroSection = useInView(0.1);
  const benefitsSection = useInView(0.1);
  const areasSection = useInView(0.1);
  const testimonialsSection = useInView(0.1);

  useEffect(() => {
    supabase.from('testimonials').select('*').eq('active', true).limit(4).then(({ data }) => {
      if (data) setTestimonials(data);
    });
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Laser treatment" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

        <div ref={heroSection.ref} className={`relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${heroSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 border border-gold/40 px-4 py-1.5 mb-8 text-gold text-xs tracking-[0.3em] uppercase">
            <Sparkles size={12} /> Marília — 14 Anos de Excelência
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] mb-6">
            Transformando<br /><span className="text-gradient-gold">Autoestima</span> em Resultados
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Depilação a laser com combos de 10 sessões, estética corporal e facial. Mais de 14 anos cuidando de você em Marília. Parcele em até 18x sem juros.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/agendamento" className="group flex items-center gap-3 bg-gold text-black px-8 py-4 font-medium tracking-widest text-sm uppercase hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/30">
              Agende Sua Sessão <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link to="/servicos" className="flex items-center gap-3 border border-white/30 text-white px-8 py-4 font-medium tracking-widest text-sm uppercase hover:border-gold hover:text-gold transition-all duration-300">
              Ver Serviços
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[{ num: '14+', label: 'Anos' }, { num: '10k+', label: 'Sessões' }, { num: '18x', label: 'Sem Juros' }].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl md:text-3xl font-display text-gold font-light">{num}</div>
                <div className="text-white/40 text-xs tracking-widest uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-black" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* BENEFITS */}
      <section className="py-24 relative">
        <div ref={benefitsSection.ref} className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${benefitsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="text-gold text-xs tracking-[0.3em] uppercase">Por que escolher</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 font-light">O Padrão <span className="text-gradient-gold">Evolutti</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="group relative border border-white/10 p-8 hover:border-gold/40 transition-all duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="absolute top-0 left-0 w-12 h-px bg-gold transition-all duration-500 group-hover:w-full" />
                <Icon size={28} className="text-gold mb-5" strokeWidth={1.5} />
                <h3 className="text-white font-medium mb-3 tracking-wide">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-black" />
        <div className="absolute top-0 left-0 right-0 h-20 bg-black" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        <div ref={areasSection.ref} className={`relative z-10 max-w-7xl mx-auto px-6 transition-all duration-1000 ${areasSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold text-xs tracking-[0.3em] uppercase">Tratamentos</span>
              <h2 className="font-display text-4xl md:text-5xl mt-3 mb-6 font-light leading-tight">Depilação Laser &<br /><span className="text-gradient-gold">Estética Completa</span></h2>
              <p className="text-white/50 leading-relaxed mb-8">Do rosto ao corpo inteiro, cobrimos todas as áreas com combos de 10 sessões para resultados definitivos. Também oferecemos tratamentos de estética corporal e facial para cuidar de você por completo.</p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {areas.map((area) => (
                  <div key={area} className="flex items-center gap-2 text-white/70 text-sm">
                    <CheckCircle size={14} className="text-gold shrink-0" />{area}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/servicos" className="group inline-flex items-center gap-3 text-gold text-sm tracking-widest uppercase hover:gap-5 transition-all duration-300">
                  Ver Todos os Serviços <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 border border-gold/10" />
              <img src="https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Laser treatment" className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute -bottom-4 -right-4 bg-black border border-gold/30 p-5">
                <div className="text-3xl font-display text-gold font-light">10</div>
                <div className="text-white/50 text-xs tracking-widest uppercase mt-1">Sessões por Combo</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-black" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* PAYMENT HIGHLIGHT */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border border-gold/20 bg-gradient-to-r from-gold/5 to-transparent p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 border border-gold/40 flex items-center justify-center shrink-0">
                <CreditCard size={28} className="text-gold" />
              </div>
              <div>
                <h3 className="text-white font-display text-2xl font-light mb-1">Até <span className="text-gradient-gold">18x Sem Juros</span></h3>
                <p className="text-white/50 text-sm">No cartão de crédito. Facilitamos o acesso para que você comece seu tratamento agora.</p>
              </div>
            </div>
            <Link to="/agendamento" className="group flex items-center gap-3 bg-gold text-black px-8 py-4 font-medium tracking-widest text-sm uppercase hover:bg-gold-light transition-all duration-300 shrink-0">
              Agendar Agora <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-black">
        <div ref={testimonialsSection.ref} className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${testimonialsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="text-gold text-xs tracking-[0.3em] uppercase">Depoimentos</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 font-light">O que Nossas <span className="text-gradient-gold">Clientes Dizem</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.id} className="border border-white/10 p-6 hover:border-gold/30 transition-all duration-500" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={12} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-5 italic">"{t.content}"</p>
                <div>
                  <div className="text-white text-sm font-medium">{t.client_name}</div>
                  <div className="text-gold/60 text-xs mt-0.5">{t.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Background" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-20 bg-black" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <h2 className="font-display text-4xl md:text-5xl font-light mb-6">Comece Sua <span className="text-gradient-gold">Transformação</span></h2>
          <p className="text-white/50 text-lg mb-10 leading-relaxed">Agende sua avaliação e descubra o tratamento ideal para você. Combos de 10 sessões com parcelamento em até 18x sem juros.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/agendamento" className="group flex items-center gap-3 bg-gold text-black px-10 py-4 font-medium tracking-widest text-sm uppercase hover:bg-gold-light transition-all duration-300 hover:shadow-xl hover:shadow-gold/20">
              Agendar Agora <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <a href="https://wa.me/551499999999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-white/30 text-white px-10 py-4 font-medium tracking-widest text-sm uppercase hover:border-gold hover:text-gold transition-all duration-300">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
