
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Language, User, Order } from './types';
import { translations } from './translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIDesignGenerator from './components/AIDesignGenerator';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import OrderSystem from './components/OrderSystem';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LightPillar from './components/LightPillar';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: () => '',
});

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<'home' | 'dashboard' | 'admin'>('home');

  const t = (key: string) => translations[key]?.[lang] || key;

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Handle fake auth for demo
  const loginAsUser = () => {
    setCurrentUser({ id: 'u1', name: 'John Doe', email: 'john@example.com', role: 'user' });
    setView('dashboard');
  };

  const loginAsAdmin = () => {
    setCurrentUser({ id: 'a1', name: 'Admin', email: 'admin@haweya.com', role: 'admin' });
    setView('admin');
  };

  const logout = () => {
    setCurrentUser(null);
    setView('home');
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div className={`min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black relative overflow-x-hidden`}>
        {/* Background Light Pillar */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
          <LightPillar
            topColor="#000000"
            bottomColor="#ffc800"
            intensity={1}
            rotationSpeed={5.0}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </div>

        <div className="relative z-10">
          <Navbar 
            view={view} 
            setView={setView} 
            user={currentUser} 
            loginUser={loginAsUser} 
            loginAdmin={loginAsAdmin} 
            logout={logout} 
          />
          
          <main className="pt-16">
          {view === 'home' && (
            <>
              <Hero onStartOrder={() => {
                const el = document.getElementById('order-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }} />
              <AIDesignGenerator />
              <Services />
              <div id="order-section">
                <OrderSystem user={currentUser} onLoginRequired={loginAsUser} />
              </div>
              <Portfolio />
              <Contact />
            </>
          )}

          {view === 'dashboard' && currentUser && (
            <Dashboard user={currentUser} />
          )}

          {view === 'admin' && currentUser?.role === 'admin' && (
            <AdminPanel />
          )}
        </main>

        <Footer />
        </div>
        
        {/* Quick WhatsApp Toggle */}
        <a 
          href="https://wa.me/218942926128" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.402 0 6.556-5.332 11.891-11.891 11.891-2.01 0-3.987-.512-5.741-1.486L0 24zm6.538-3.713c1.556.924 3.082 1.411 4.792 1.411 5.21 0 9.451-4.241 9.451-9.451 0-2.527-1.01-4.902-2.842-6.733-1.831-1.832-4.204-2.841-6.726-2.841-5.21 0-9.451 4.241-9.451 9.451 0 1.831.528 3.567 1.528 5.032l-.991 3.616 3.739-.98z" />
          </svg>
        </a>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
