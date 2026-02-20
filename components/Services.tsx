
import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import { Monitor, Printer, PenTool, Layout, Gift, FileText, ExternalLink } from 'lucide-react';

const services = [
  {
    id: 'ads',
    icon: <Monitor className="text-yellow-400" size={32} />,
    titleEn: 'Advertising Services',
    titleAr: 'خدمات الإعلان',
    descEn: 'Strategic campaigns that capture attention across all media platforms.',
    descAr: 'حملات استراتيجية تجذب الانتباه عبر جميع المنصات الإعلامية.'
  },
  {
    id: 'design',
    icon: <PenTool className="text-yellow-400" size={32} />,
    titleEn: 'Graphic Design',
    titleAr: 'تصميم جرافيك',
    descEn: 'Visual identities and creative designs that speak your brand’s language.',
    descAr: 'هويات بصرية وتصاميم إبداعية تتحدث لغة علامتك التجارية.'
  },
  {
    id: 'printing_inout',
    icon: <Printer className="text-yellow-400" size={32} />,
    titleEn: 'Indoor & Outdoor Printing',
    titleAr: 'طباعة داخلية وخارجية',
    descEn: 'High-quality banners, signs, and posters for every environment.',
    descAr: 'لافتات ولوحات وبوسترات عالية الجودة لكل البيئات.'
  },
  {
    id: 'paper',
    icon: <FileText className="text-yellow-400" size={32} />,
    titleEn: 'Paper Document Printing',
    titleAr: 'طباعة المستندات الورقية',
    descEn: 'Corporate stationeries, brochures, flyers, and professional documents.',
    descAr: 'قرطاسية الشركات والبروشورات والفلايرز والمستندات المهنية.'
  },
  {
    id: 'gifts',
    icon: <Gift className="text-yellow-400" size={32} />,
    titleEn: 'Promotional Gifts',
    titleAr: 'طباعة الهدايا الدعائية',
    descEn: 'Customized merchandise including pens, mugs, and branded corporate gifts.',
    descAr: 'هدايا مخصصة تشمل الأقلام والأكواب وهدايا الشركات ذات العلامة التجارية.'
  },
  {
    id: 'web',
    icon: <Layout className="text-yellow-400" size={32} />,
    titleEn: 'Website Design',
    titleAr: 'تصميم المواقع',
    descEn: 'Fast, responsive, and modern websites tailored to your business needs.',
    descAr: 'مواقع سريعة ومتجاوبة وعصرية مصممة خصيصاً لاحتياجات عملك.'
  }
];

const Services: React.FC = () => {
  const { lang, t } = useContext(LanguageContext);

  return (
    <section id="services-section" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">{t('services_title')}</h2>
            <div className="w-20 h-1.5 bg-yellow-400 rounded-full"></div>
            <p className="text-zinc-400 max-w-xl text-lg">
              {lang === 'en' 
                ? 'We provide a comprehensive suite of creative services under one roof, maintaining the highest standards of quality.' 
                : 'نقدم مجموعة شاملة من الخدمات الإبداعية تحت سقف واحد، مع الحفاظ على أعلى معايير الجودة.'}
            </p>
          </div>
          <button className="flex items-center gap-2 text-yellow-400 font-bold hover:underline transition-all">
            {lang === 'en' ? 'View Service Catalog' : 'عرض كتالوج الخدمات'}
            <ExternalLink size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group bg-zinc-900 border border-white/5 p-8 rounded-3xl hover:border-yellow-400/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl group-hover:bg-yellow-400/10 transition-colors"></div>
              
              <div className="mb-6 bg-black w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors">
                {lang === 'en' ? service.titleEn : service.titleAr}
              </h3>
              
              <p className="text-zinc-400 leading-relaxed mb-8">
                {lang === 'en' ? service.descEn : service.descAr}
              </p>

              <button className="text-sm font-bold border-b border-white/20 hover:border-yellow-400 pb-1 transition-all">
                {lang === 'en' ? 'Learn More' : 'اقرأ المزيد'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
