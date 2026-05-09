import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
}

const FAQ = [
  { q: 'Quantas sessões são necessárias?', a: 'Trabalhamos com combos completos de 10 sessões, garantindo melhores resultados e mais eficiência no tratamento. O número de sessões necessárias varia conforme a área e tipo de pelo.' },
  { q: 'Dói durante o procedimento?', a: 'A maioria dos clientes relata um leve incômodo. Nossos equipamentos têm sistema de resfriamento integrado para máximo conforto durante a sessão.' },
  { q: 'Qual é o valor do tratamento?', a: 'Os valores variam conforme a área. Facilitamos o pagamento com parcelamento em até 18x sem juros no cartão de crédito! Entre em contato para uma cotação personalizada.' },
  { q: 'Há cuidados antes e depois?', a: 'Sim! Antes: evite sol e não se depile. Depois: use protetor solar e evite exercício por 24h. Nossa equipe fornece orientações completas.' },
  { q: 'Como agendar uma sessão?', a: 'Você pode agendar diretamente pelo nosso site na seção "Agendamento" ou pelo WhatsApp: (14) 9 9999-9999' },
  { q: 'Vocês fazem estética facial e corporal?', a: 'Sim! Além da depilação a laser, oferecemos tratamentos de estética corporal e facial. Consulte nossos serviços para conhecer todas as opções.' },
  { q: 'Onde vocês ficam?', a: 'Estamos na Rua Arco Verde, esquina com a Av. Santo Antônio, em Marília, SP. Venha nos visitar!' },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'bot', text: 'Olá! Bem-vinda à Evolutti Laser & Estética. Como posso ajudar você hoje?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findAnswer = (question: string): string | null => {
    const lowerQ = question.toLowerCase();
    for (const faq of FAQ) {
      const keywords = faq.q.toLowerCase().split(' ').filter(w => w.length > 3);
      if (keywords.some(kw => lowerQ.includes(kw)) || lowerQ.includes(faq.q.toLowerCase().split(' ')[0])) {
        return faq.a;
      }
    }
    return null;
  };

  const handleSend = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), type: 'user', text: msg };
    setMessages(m => [...m, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const answer = findAnswer(msg);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: answer || 'Ótima pergunta! Para dúvidas mais específicas, fale com nossa equipe pelo WhatsApp: (14) 9 9999-9999',
      };
      setMessages(m => [...m, botMessage]);
      setLoading(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
          open ? 'bg-gold text-black' : 'bg-gold hover:bg-gold-light hover:scale-110'
        } shadow-lg`}
        aria-label="Chat"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      <div className={`fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-24px)] border border-gold/20 bg-black rounded-lg shadow-xl transition-all duration-300 transform origin-bottom-right ${
        open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 border-b border-gold/20 p-4">
          <h3 className="text-white font-medium">Assistente Evolutti</h3>
          <p className="text-gold text-xs">Online</p>
        </div>

        <div className="h-80 overflow-y-auto p-4 space-y-3 flex flex-col">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                msg.type === 'user' ? 'bg-gold text-black' : 'bg-white/5 text-white/80 border border-white/10'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                <Loader size={14} className="animate-spin text-gold" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="border-t border-white/10 p-3 space-y-2">
            {['Quantas sessões preciso?', 'Como agendar?', 'Onde ficam?'].map(qa => (
              <button
                key={qa}
                onClick={() => handleSend(qa)}
                className="w-full text-left text-xs px-3 py-2 rounded bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                {qa}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="border-t border-white/10 p-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
            placeholder="Digite sua pergunta..."
            className="flex-1 bg-transparent text-white text-sm placeholder-white/30 focus:outline-none border-b border-gold/20 focus:border-gold transition-colors duration-200 pb-1"
          />
          <button type="submit" disabled={loading || !input.trim()} className="text-gold hover:text-gold-light disabled:opacity-40 transition-all duration-200">
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
}
