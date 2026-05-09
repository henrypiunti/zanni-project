import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Heart, Target, TrendingUp, Users } from 'lucide-react';

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

const timeline = [
  { year: '2010', title: 'Início como Diolaser', desc: 'Começamos nossa trajetória como unidade franqueada da Diolaser, trazendo tecnologia e profissionalismo para Marília.' },
  { year: '2016', title: 'Expansão e Consolidação', desc: 'Após 6 anos de crescimento, nos consolidamos como referência regional em depilação a laser.' },
  { year: '2019', title: 'Marca Própria', desc: 'Com 9 anos de expertise na franquia, demos o passo decisivo e lançamos a Evolutti Laser & Estética.' },
  { year: '2024', title: '14 Anos de Excelência', desc: 'Mais de uma década dedicada a transformar autoestima. Ampliamos para estética corporal e facial com tecnologia de ponta.' },
];

const values = [
  { icon: Award, title: 'Excelência', desc: 'Mais de 14 anos de experiência com os mais altos padrões de qualidade em cada procedimento.' },
  { icon: Heart, title: 'Cuidado Humanizado', desc: 'Atendimento personalizado e acolhedor, onde cada cliente se sente única e especial.' },
  { icon: Target, title: 'Resultado Real', desc: 'Combos completos de 10 sessões para garantir resultados definitivos e mensuráveis.' },
  { icon: TrendingUp, title: 'Inovação Constante', desc: 'Sempre atualizados com as tecnologias mais avançadas do mercado de estética.' },
  { icon: Users, title: 'Acessibilidade', desc: 'Parcelamento em até 18x sem juros no cartão para facilitar o acesso aos tratamentos.' },
];

export default function About() {
  const s1 = useInView(); const s2 = useInView(); const s3 = useInView(); const s4 = useInView(); const s5 = useInView();

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* HERO */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-black/95" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
        <div ref={s1.ref} className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${s1.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-gold text-xs tracking-[0.3em] uppercase">Nossa História</span>
          <h1 className="font-display text-5xl md:text-6xl mt-4 mb-6 font-light leading-tight">Sobre a <span className="text-gradient-gold">Evolutti Laser</span></h1>
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">Referência em cuidados estéticos em Marília, com mais de 14 anos de experiência. Nossa trajetória começou como franquia Diolaser e se transformou em uma marca própria, forte e reconhecida.</p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20">
        <div ref={s2.ref} className={`max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${s2.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <div className="absolute -inset-3 border border-gold/10" />
            <img src="https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Clínica Evolutti" className="w-full h-[450px] object-cover" />
            <div className="absolute -bottom-6 -right-6 border border-gold/30 bg-black p-6">
              <div className="text-3xl font-display text-gold font-light">14+</div>
              <div className="text-white/50 text-xs tracking-widest uppercase mt-1">Anos de Experiência</div>
            </div>
          </div>
          <div>
            <span className="text-gold text-xs tracking-[0.3em] uppercase">Nossa Trajetória</span>
            <h2 className="font-display text-4xl mt-3 mb-6 font-light">De Franquia a <span className="text-gradient-gold">Marca Própria</span></h2>
            <p className="text-white/60 leading-relaxed mb-4">A Evolutti Laser & Estética nasceu da paixão por transformar vidas através da autoestima. Começamos como uma unidade franqueada da Diolaser, onde atuamos por 9 anos, adquirindo expertise, tecnologia e excelência em atendimento.</p>
            <p className="text-white/60 leading-relaxed mb-4">Com o crescimento e consolidação, seguimos com nossa própria marca, fortalecendo ainda mais nosso compromisso com resultados e qualidade. Hoje, somos especializados em depilação a laser e estética corporal e facial.</p>
            <p className="text-white/60 leading-relaxed mb-8">Oferecemos tratamentos modernos, seguros e eficazes, sempre com foco no bem-estar e satisfação dos nossos clientes. Nosso espaço foi pensado para oferecer conforto, acolhimento e tecnologia.</p>
            <Link to="/agendamento" className="group inline-flex items-center gap-3 bg-gold text-black px-8 py-4 font-medium tracking-widest text-sm uppercase hover:bg-gold-light transition-all duration-300">
              Agende sua Avaliação <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a] to-transparent" />
        <div ref={s3.ref} className={`relative z-10 max-w-4xl mx-auto px-6 transition-all duration-1000 ${s3.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <span className="text-gold text-xs tracking-[0.3em] uppercase">Nossa Evolução</span>
            <h2 className="font-display text-4xl mt-3 font-light">Uma História de <span className="text-gradient-gold">Crescimento</span></h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold/20" />
            {timeline.map((item, i) => (
              <div key={item.year} className={`relative flex items-start mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-1.5 mt-1.5 z-10" />
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="text-gold font-display text-2xl font-light mb-1">{item.year}</div>
                  <h3 className="text-white font-medium mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION / VALUES */}
      <section className="py-20">
        <div ref={s4.ref} className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${s4.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <span className="text-gold text-xs tracking-[0.3em] uppercase">Nossos Pilares</span>
            <h2 className="font-display text-4xl mt-3 font-light">Missão, Visão e <span className="text-gradient-gold">Valores</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="border border-white/10 p-8 hover:border-gold/30 transition-all duration-300">
              <h3 className="text-gold font-display text-xl mb-4">Missão</h3>
              <p className="text-white/60 text-sm leading-relaxed">Oferecer tratamentos estéticos de excelência em depilação a laser, corporal e facial, utilizando tecnologia de ponta e atendimento humanizado para transformar a autoestima de nossos clientes.</p>
            </div>
            <div className="border border-gold/30 p-8 bg-gold/3">
              <h3 className="text-gold font-display text-xl mb-4">Visão</h3>
              <p className="text-white/60 text-sm leading-relaxed">Ser a clínica de referência em estética e depilação a laser no interior de São Paulo, reconhecida pela qualidade, inovação e compromisso com resultados reais.</p>
            </div>
            <div className="border border-white/10 p-8 hover:border-gold/30 transition-all duration-300">
              <h3 className="text-gold font-display text-xl mb-4">Valores</h3>
              <p className="text-white/60 text-sm leading-relaxed">Excelência, transparência, inovação, cuidado genuíno com o cliente e compromisso com resultados que transformam vidas e elevam a autoestima.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-9 h-9 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={16} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">{title}</h4>
                  <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={s5.ref} className={`py-20 border-t border-white/10 transition-all duration-1000 ${s5.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <h2 className="font-display text-4xl font-light mb-6">Transformando Autoestima em <span className="text-gradient-gold">Resultados Reais</span></h2>
          <p className="text-white/50 text-lg mb-10 leading-relaxed">Conheça nossa clínica e descubra por que somos referência em Marília há mais de 14 anos.</p>
          <Link to="/agendamento" className="group inline-flex items-center gap-3 bg-gold text-black px-10 py-4 font-medium tracking-widest text-sm uppercase hover:bg-gold-light transition-all duration-300 hover:shadow-xl hover:shadow-gold/20">
            Agende sua Avaliação <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}
