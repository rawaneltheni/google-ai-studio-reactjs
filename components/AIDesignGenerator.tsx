
import React, { useState, useContext } from 'react';
import { LanguageContext } from '../App';
import { Sparkles, Download, Send, Loader2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { generateDesignImage } from '../services/gemini';
import { motion, AnimatePresence } from 'motion/react';

const designTypes = [
  { id: 'logo', labelEn: 'Logo Design', labelAr: 'تصميم شعار' },
  { id: 'business_card', labelEn: 'Business Card Design', labelAr: 'تصميم كرت شخصي' },
  { id: 'social_media', labelEn: 'Social Media Post Design', labelAr: 'تصميم منشور تواصل اجتماعي' },
];

const styles = [
  { id: 'minimal', labelEn: 'Minimal', labelAr: 'بسيط', enhancement: 'in a clean minimal simple professional style' },
  { id: 'luxury', labelEn: 'Luxury', labelAr: 'فاخر', enhancement: 'in a luxury premium elegant style with gold accents' },
  { id: 'modern', labelEn: 'Modern', labelAr: 'عصري', enhancement: 'in a sleek modern high-tech contemporary style' },
  { id: 'arabic', labelEn: 'Arabic Calligraphy', labelAr: 'خط عربي', enhancement: 'with elegant Arabic calligraphy and cultural artistic elements' },
  { id: 'corporate', labelEn: 'Corporate', labelAr: 'مؤسسي', enhancement: 'in a professional corporate formal business style' },
  { id: 'bold', labelEn: 'Bold & Creative', labelAr: 'جريء وإبداعي', enhancement: 'in a bold creative vibrant artistic unique style' },
];

const AIDesignGenerator: React.FC = () => {
  const { lang, t } = useContext(LanguageContext);
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState(designTypes[0].id);
  const [selectedStyle, setSelectedStyle] = useState(styles[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError(lang === 'en' ? 'Please describe your idea first.' : 'يرجى وصف فكرتك أولاً.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    const typeLabel = designTypes.find(t => t.id === selectedType)?.labelEn;
    const styleEnhancement = styles.find(s => s.id === selectedStyle)?.enhancement;
    const fullPrompt = `${typeLabel} for ${description}, ${styleEnhancement}`;

    try {
      const imageUrl = await generateDesignImage(fullPrompt);
      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {
        throw new Error('No image generated');
      }
    } catch (err) {
      setError(lang === 'en' ? 'Failed to generate design. Please try again.' : 'فشل إنشاء التصميم. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `haweya-design-${Date.now()}.png`;
    link.click();
  };

  const handleAttachToOrder = () => {
    // In a real app, we'd pass this to the OrderSystem state
    // For now, we'll just show a success message or scroll to order
    const orderSection = document.getElementById('order-section');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
      // We could also set a global state if needed, but the request says "store image reference in state"
      // which we are doing in generatedImage.
    }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold"
          >
            {lang === 'en' ? 'Generate Your Design Idea' : 'أنشئ فكرة تصميمك'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            {lang === 'en' 
              ? 'Create a quick visual preview for your logo or business card before submitting your order.' 
              : 'أنشئ معاينة بصرية سريعة لشعارك أو كرتك الشخصي قبل تقديم طلبك.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Input Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl space-y-8"
          >
            {/* Description Input */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-zinc-500 uppercase tracking-widest">
                {lang === 'en' ? 'Describe Your Idea' : 'صف فكرتك'}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={lang === 'en' ? 'Modern Arabic logo for a coffee shop in black and gold' : 'شعار عربي حديث لمقهى باللونين الأسود والذهبي'}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-yellow-400 transition-colors resize-none h-32 text-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Design Type Selector */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-zinc-500 uppercase tracking-widest">
                  {lang === 'en' ? 'Design Type' : 'نوع التصميم'}
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-yellow-400 transition-colors appearance-none cursor-pointer"
                >
                  {designTypes.map(type => (
                    <option key={type.id} value={type.id} className="bg-zinc-900">
                      {lang === 'en' ? type.labelEn : type.labelAr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Style Selector */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-zinc-500 uppercase tracking-widest">
                  {lang === 'en' ? 'Visual Style' : 'النمط البصري'}
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-yellow-400 transition-colors appearance-none cursor-pointer"
                >
                  {styles.map(style => (
                    <option key={style.id} value={style.id} className="bg-zinc-900">
                      {lang === 'en' ? style.labelEn : style.labelAr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-yellow-400 text-black py-5 rounded-2xl font-black text-xl hover:bg-yellow-500 transition-all yellow-glow disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {isGenerating ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <Sparkles className="group-hover:rotate-12 transition-transform" size={24} />
              )}
              {isGenerating 
                ? (lang === 'en' ? 'Generating...' : 'جاري الإنشاء...') 
                : (lang === 'en' ? 'Generate Design' : 'إنشاء التصميم')}
            </button>
          </motion.div>

          {/* Preview Area */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="aspect-square bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden flex items-center justify-center relative shadow-2xl">
              <AnimatePresence mode="wait">
                {generatedImage ? (
                  <motion.div
                    key="image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full h-full"
                  >
                    <img 
                      src={generatedImage} 
                      alt="Generated design" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button 
                        onClick={handleDownload}
                        className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl"
                        title={lang === 'en' ? 'Download' : 'تحميل'}
                      >
                        <Download size={24} />
                      </button>
                      <button 
                        onClick={handleAttachToOrder}
                        className="p-4 bg-yellow-400 text-black rounded-full hover:scale-110 transition-transform shadow-xl"
                        title={lang === 'en' ? 'Attach to Order' : 'إرفاق بالطلب'}
                      >
                        <Send size={24} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-4 p-12"
                  >
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ImageIcon size={40} className="text-zinc-600" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-400">
                      {lang === 'en' ? 'Your Preview Will Appear Here' : 'ستظهر المعاينة هنا'}
                    </h3>
                    <p className="text-zinc-600 text-sm">
                      {lang === 'en' 
                        ? 'Describe your idea and click generate to see the magic.' 
                        : 'صف فكرتك واضغط على إنشاء لترى السحر.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {isGenerating && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="animate-spin text-yellow-400" size={48} />
                  <p className="text-yellow-400 font-bold animate-pulse">
                    {lang === 'en' ? 'Creating your masterpiece...' : 'جاري إنشاء تحفتك الفنية...'}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons for Mobile (Visible when image exists) */}
            {generatedImage && !isGenerating && (
              <div className="mt-6 flex md:hidden gap-4">
                <button 
                  onClick={handleDownload}
                  className="flex-1 bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Download size={20} /> {lang === 'en' ? 'Download' : 'تحميل'}
                </button>
                <button 
                  onClick={handleAttachToOrder}
                  className="flex-1 bg-yellow-400 text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Send size={20} /> {lang === 'en' ? 'Attach' : 'إرفاق'}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIDesignGenerator;
