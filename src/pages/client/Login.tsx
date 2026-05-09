import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) { setError('E-mail ou senha incorretos. Tente novamente.'); return; }
    navigate('/cliente');
  };

  return (
    <div className="bg-black text-white min-h-screen pt-20 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap size={24} className="text-gold" strokeWidth={1.5} />
            <span className="font-display text-xl tracking-widest text-white">EVOLUTTI<span className="text-gold">.</span></span>
          </div>
          <h1 className="font-display text-3xl font-light mb-2">Bem-vinda de volta</h1>
          <p className="text-white/50 text-sm">Acesse sua área exclusiva</p>
        </div>
        <form onSubmit={handleSubmit} className="border border-white/10 p-8 space-y-5">
          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="seu@email.com" className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-200" />
          </div>
          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">Senha</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-200 pr-12" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-200">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-gold text-black py-4 font-medium tracking-widest text-sm uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-60">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="text-center text-white/40 text-sm mt-6">Não tem conta? <Link to="/cliente/cadastro" className="text-gold hover:underline">Cadastre-se</Link></p>
      </div>
    </div>
  );
}
