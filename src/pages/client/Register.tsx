import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('As senhas não coincidem.'); return; }
    if (form.password.length < 6) { setError('A senha deve ter pelo menos 6 caracteres.'); return; }
    setLoading(true);
    setError('');
    const { error: err } = await signUp(form.email, form.password, form.fullName, form.phone);
    setLoading(false);
    if (err) {
      if (err.message?.includes('already registered')) setError('Este e-mail já está cadastrado.');
      else setError('Erro ao criar conta. Tente novamente.');
      return;
    }
    navigate('/cliente');
  };

  return (
    <div className="bg-black text-white min-h-screen pt-20 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap size={24} className="text-gold" strokeWidth={1.5} />
            <span className="font-display text-xl tracking-widest text-white">EVOLUTTI<span className="text-gold">.</span></span>
          </div>
          <h1 className="font-display text-3xl font-light mb-2">Criar sua Conta</h1>
          <p className="text-white/50 text-sm">Cadastre-se e gerencie seus agendamentos</p>
        </div>
        <form onSubmit={handleSubmit} className="border border-white/10 p-8 space-y-5">
          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">Nome Completo</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Seu nome completo" className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-200" />
          </div>
          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">E-mail</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="seu@email.com" className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-200" />
          </div>
          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">Telefone</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="(11) 9 9999-9999" className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-200" />
          </div>
          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">Senha</label>
            <div className="relative">
              <input name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange} required placeholder="Mínimo 6 caracteres" className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-200 pr-12" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-200">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">Confirmar Senha</label>
            <input name="confirm" type="password" value={form.confirm} onChange={handleChange} required placeholder="••••••••" className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-200" />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-gold text-black py-4 font-medium tracking-widest text-sm uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-60">
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>
        <p className="text-center text-white/40 text-sm mt-6">Já tem conta? <Link to="/cliente/login" className="text-gold hover:underline">Fazer login</Link></p>
      </div>
    </div>
  );
}
