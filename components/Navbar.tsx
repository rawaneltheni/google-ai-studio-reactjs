
import React, { useContext, useState } from 'react';
import { LanguageContext } from '../App';
import { User } from '../types';
import { Menu, X, Globe, User as UserIcon, LogOut, ChevronDown } from 'lucide-react';

interface NavbarProps {
  view: string;
  setView: (v: any) => void;
  user: User | null;
  loginUser: () => void;
  loginAdmin: () => void;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ view, setView, user, loginUser, loginAdmin, logout }) => {
  const { lang, setLang, t } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  const navItems = [
    { id: 'home', label: t('nav_home') },
    { id: 'services', label: t('nav_services'), scroll: 'services-section' },
    { id: 'portfolio', label: t('nav_portfolio'), scroll: 'portfolio-section' },
  ];

  const handleNavClick = (item: any) => {
    if (item.id === 'home') {
      setView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.scroll) {
      if (view !== 'home') setView('home');
      setTimeout(() => {
        const el = document.getElementById(item.scroll);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-white/10 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => setView('home')} className="text-2xl font-bold flex items-center gap-2" dir="ltr">
            <span className="text-yellow-400">HA</span>WEYA
          </button>
          
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium hover:text-yellow-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1 text-xs uppercase font-bold text-yellow-400 border border-yellow-400/30 px-2 py-1 rounded hover:bg-yellow-400/10 transition-colors"
          >
            <Globe size={14} />
            {lang === 'en' ? 'Arabic' : 'English'}
          </button>


        { /* <div className="hidden md:flex items-center gap-3"> 
            {!user ? (
              <div className="flex gap-2">
                <button 
                  onClick={loginUser}
                  className="px-4 py-2 rounded-full text-xs font-bold border border-white/20 hover:border-yellow-400 transition-colors"
                >
                  {t('login')}
                </button>
                <button 
                  onClick={loginAdmin}
                  className="px-4 py-2 rounded-full bg-yellow-400 text-black text-xs font-bold hover:bg-yellow-500 transition-all"
                >
                  Admin
                </button>
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:border-yellow-400"
                >
                  <UserIcon size={16} className="text-yellow-400" />
                  <span className="text-xs font-medium">{user.name}</span>
                  <ChevronDown size={14} />
                </button>
                {showProfileMenu && (
                  <div className={`absolute top-12 ${lang === 'ar' ? 'left-0' : 'right-0'} w-48 bg-zinc-900 border border-white/10 rounded-lg shadow-2xl py-2`}>
                    <button 
                      onClick={() => { setView(user.role === 'admin' ? 'admin' : 'dashboard'); setShowProfileMenu(false); }}
                      className="w-full text-start px-4 py-2 text-sm hover:bg-white/5 flex items-center gap-2"
                    >
                      <UserIcon size={14} /> {user.role === 'admin' ? t('admin_panel') : t('nav_dashboard')}
                    </button>
                    <hr className="my-1 border-white/5" />
                    <button 
                      onClick={() => { logout(); setShowProfileMenu(false); }}
                      className="w-full text-start px-4 py-2 text-sm hover:bg-white/5 text-red-400 flex items-center gap-2"
                    >
                      <LogOut size={14} /> {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
*/}

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-zinc-900 border-b border-white/10 py-6 px-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className="block w-full text-start text-lg font-medium"
            >
              {item.label}
            </button>
          ))}
          { /* !user ? (
             <div className="flex gap-2">
                <button onClick={loginUser} className="flex-1 px-4 py-3 rounded-lg border border-white/20">{t('login')}</button>
                <button onClick={loginAdmin} className="flex-1 px-4 py-3 rounded-lg bg-yellow-400 text-black">Admin</button>
             </div>
          ) : (
             <div className="space-y-4">
                <button onClick={() => setView(user.role === 'admin' ? 'admin' : 'dashboard')} className="block w-full text-start text-lg font-medium text-yellow-400">
                  {user.role === 'admin' ? t('admin_panel') : t('nav_dashboard')}
                </button>
                <button onClick={logout} className="block w-full text-start text-lg font-medium text-red-400">{t('logout')}</button>
             </div>
          )*/}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
