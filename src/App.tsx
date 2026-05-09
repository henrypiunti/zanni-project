import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Scheduling from './pages/Scheduling';
import Contact from './pages/Contact';
import Login from './pages/client/Login';
import Register from './pages/client/Register';
import Dashboard from './pages/client/Dashboard';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-white">Carregando...</div>;
  return user ? <>{children}</> : <Navigate to="/cliente/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/servicos" element={<Services />} />
      <Route path="/agendamento" element={<Scheduling />} />
      <Route path="/contato" element={<Contact />} />
      <Route path="/cliente/login" element={<Login />} />
      <Route path="/cliente/cadastro" element={<Register />} />
      <Route path="/cliente" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function AppContent() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
      <Chatbot />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
