import { Link } from 'react-router-dom';
import { Zap, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gold/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Zap size={24} className="text-gold" strokeWidth={1.5} />
              <span className="font-display text-lg tracking-widest text-white">EVOLUTTI<span className="text-gold">.</span></span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Referência em cuidados estéticos em Marília. Mais de 14 anos de experiência em depilação a laser e estética corporal e facial.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 border border-gold/30 flex items-center justify-center text-gold/60 hover:border-gold hover:text-gold transition-all duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 border border-gold/30 flex items-center justify-center text-gold/60 hover:border-gold hover:text-gold transition-all duration-300">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium tracking-widest text-xs mb-5 uppercase">Navegação</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Início' },
                { to: '/sobre', label: 'Sobre' },
                { to: '/servicos', label: 'Serviços' },
                { to: '/agendamento', label: 'Agendamento' },
                { to: '/contato', label: 'Contato' },
              ].map(({ to, label }) => (
                <li key={to}><Link to={to} className="text-white/50 text-sm hover:text-gold transition-colors duration-200">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium tracking-widest text-xs mb-5 uppercase">Serviços</h4>
            <ul className="space-y-3">
              {['Buço', 'Axilas', 'Virilha Completa', 'Pernas Completas', 'Barba', 'Corpo Inteiro'].map((s) => (
                <li key={s}><Link to="/servicos" className="text-white/50 text-sm hover:text-gold transition-colors duration-200">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium tracking-widest text-xs mb-5 uppercase">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm">Rua Arco Verde, esq. com Av. Santo Antônio — Marília, SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold shrink-0" />
                <a href="tel:+551499999999" className="text-white/50 text-sm hover:text-gold transition-colors duration-200">(14) 9 9999-9999</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-gold shrink-0" />
                <a href="mailto:contato@evolutti.com.br" className="text-white/50 text-sm hover:text-gold transition-colors duration-200">contato@evolutti.com.br</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-widest">&copy; {new Date().getFullYear()} EVOLUTTI LASER & ESTÉTICA — Todos os direitos reservados.</p>
          <p className="text-white/20 text-xs tracking-widest">Transformando autoestima em resultados reais.</p>
        </div>
      </div>
    </footer>
  );
}
