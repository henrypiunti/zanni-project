import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/agendamento', label: 'Agendamento' },
  { to: '/contato', label: 'Contato' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-gold/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          <Zap size={28} className="text-gold animate-pulse-gold" strokeWidth={1.5} />
          <span className="font-display text-xl tracking-widest text-white">
            EVOLUTTI<span className="text-gold">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm tracking-widest font-medium transition-all duration-300 relative group ${
                pathname === to ? 'text-gold' : 'text-white/70 hover:text-white'
              }`}
            >
              {label}
              <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${pathname === to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
          <Link
            to={user ? '/cliente' : '/cliente/login'}
            className="ml-2 px-5 py-2 border border-gold text-gold text-sm tracking-widest font-medium hover:bg-gold hover:text-black transition-all duration-300"
          >
            {user ? 'MINHA ÁREA' : 'ENTRAR'}
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2" aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-black/98 backdrop-blur-md border-t border-gold/20 px-6 py-8 flex flex-col gap-6">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className={`text-base tracking-widest font-medium ${pathname === to ? 'text-gold' : 'text-white/70'}`}>
              {label}
            </Link>
          ))}
          <Link
            to={user ? '/cliente' : '/cliente/login'}
            className="mt-2 px-5 py-3 border border-gold text-gold text-sm tracking-widest font-medium text-center hover:bg-gold hover:text-black transition-all duration-300"
          >
            {user ? 'MINHA ÁREA' : 'ENTRAR'}
          </Link>
        </div>
      </div>
    </nav>
  );
}
