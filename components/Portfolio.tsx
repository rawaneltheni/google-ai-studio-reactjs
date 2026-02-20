
import React, { useContext } from 'react';
import { LanguageContext } from '../App';

const projects = [
  { id: 1, title: 'Luxury Branding', category: 'Graphic Design', image: '/imgs/2.png' },
  { id: 2, title: 'Retail Signage', category: 'Outdoor Printing', image: '/imgs/1.png' },
  { id: 3, title: 'Corporate Identity', category: 'Full Package', image: '/imgs/4.png' },
  { id: 4, title: 'Modern Website', category: 'Web Design', image: '/imgs/5.png' },
  { id: 5, title: 'Product Labels', category: 'Printing', image: '/imgs/3.png' },
  { id: 6, title: 'Exhibition Booth', category: 'Indoor Display', image: '/imgs/6.png' },
];

const Portfolio: React.FC = () => {
  const { lang, t } = useContext(LanguageContext);

  return (
    <section id="portfolio-section" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('nav_portfolio')}</h2>
          <div className="w-20 h-1.5 bg-yellow-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-12 py-4 rounded-full border border-white/20 font-bold hover:bg-white/5 transition-all">
            {lang === 'en' ? 'View Full Gallery' : 'عرض المعرض الكامل'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
