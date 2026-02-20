
import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface HeroProps {
  onStartOrder: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartOrder }) => {
  const { lang, t } = useContext(LanguageContext);

  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background patterns */}
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        <div className="max-w-3xl space-y-8">
          <div className="inline-block px-4 py-1 border border-yellow-400/30 rounded-full bg-yellow-400/5 backdrop-blur-sm">
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">
              {lang === 'en' ? 'Premium Advertising Agency' : 'وكالة دعاية وإعلان فاخرة'}
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight">
            <span className="text-white block">HAWEYA</span>
            <span className="text-yellow-400 block">{t('hero_tagline')}</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-xl">
            {lang === 'en' 
              ? 'Providing innovative solutions in advertising, premium printing, and digital identity for businesses that stand out.' 
              : 'نقدم حلولاً مبتكرة في الإعلانات، والطباعة الفاخرة، والهوية الرقمية للشركات التي تسعى للتميز.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={onStartOrder}
              className="group bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-all flex items-center gap-2 yellow-glow"
            >
              {t('hero_cta')}
              {lang === 'en' ? <ArrowRight className="group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />}
            </button>
            <button className="px-8 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/5 transition-all">
              {lang === 'en' ? 'Our Portfolio' : 'أعمالنا السابقة'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Large Decorative Text in BG */}
      <div className="absolute -bottom-10 right-0 select-none pointer-events-none hidden">
        <span className="text-[20rem] font-black italic">HAWEYA</span>
      </div>
    </section>
  );
};

export default Hero;
