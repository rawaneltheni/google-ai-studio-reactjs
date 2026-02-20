
import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import { Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const { lang, t } = useContext(LanguageContext);

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="text-3xl font-black" dir="ltr">
              <span className="text-yellow-400">HA</span>WEYA
            </div>
            <p className="text-zinc-500 leading-relaxed">
              {lang === 'en' 
                ? 'Elevating brand identities through creative excellence and premium craftsmanship.' 
                : 'رفع هويات العلامات التجارية من خلال التميز الإبداعي والحرفية العالية.'}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/share/1F7xXHfuhN/?mibextid=wwXIfr" className="p-3 bg-zinc-900 rounded-xl hover:bg-yellow-400 hover:text-black transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/haweya.adv?igsh=dWZ3cTB1NHYxZnB3&utm_source=qr" className="p-3 bg-zinc-900 rounded-xl hover:bg-yellow-400 hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 bg-zinc-900 rounded-xl hover:bg-yellow-400 hover:text-black transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-3 bg-zinc-900 rounded-xl hover:bg-yellow-400 hover:text-black transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8">{lang === 'en' ? 'Services' : 'خدماتنا'}</h4>
            <ul className="space-y-4 text-zinc-500">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Advertising</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Graphic Design</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Indoor/Outdoor Printing</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Promotional Gifts</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Website Design</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8">{lang === 'en' ? 'Company' : 'الشركة'}</h4>
            <ul className="space-y-4 text-zinc-500">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">News & Press</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8">{lang === 'en' ? 'Newsletter' : 'النشرة البريدية'}</h4>
            <p className="text-zinc-500 mb-6">{lang === 'en' ? 'Stay updated with our latest creative projects.' : 'ابق على اطلاع بآخر مشاريعنا الإبداعية.'}</p>
            <div className="relative">
              <input 
                placeholder={lang === 'en' ? 'Enter email' : 'أدخل البريد'} 
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-yellow-400"
              />
              <button className={`absolute top-2 ${lang === 'ar' ? 'left-2' : 'right-2'} bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-sm`}>
                {lang === 'en' ? 'Join' : 'انضم'}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-600 text-sm">{t('footer_rights')}</p>
          <div className="flex items-center gap-8 text-xs font-bold text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</a>
            <a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Terms of Service' : 'شروط الخدمة'}</a>
            <a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Cookie Settings' : 'إعدادات الكوكيز'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
