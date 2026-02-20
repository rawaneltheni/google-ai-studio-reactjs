
import React, { useState, useContext, useEffect, useRef } from 'react';
import { LanguageContext } from '../App';
import { Service, User } from '../types';
import { Upload, CheckCircle, Calculator, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { getCreativeSuggestion } from '../services/gemini';
import emailjs from '@emailjs/browser';

const availableServices: Service[] = [
  { id: '1', titleEn: 'Business Cards', titleAr: 'كروت شخصية', descriptionEn: 'Premium paper, various sizes', descriptionAr: 'ورق فاخر، مقاسات متنوعة', icon: 'FileText', basePrice: 20 },
  { id: '2', titleEn: 'Banners', titleAr: 'بنرات إعلانية', descriptionEn: 'Outdoor durable vinyl', descriptionAr: 'فينيل متين للمساحات الخارجية', icon: 'Printer', basePrice: 45 },
  { id: '3', titleEn: 'Logo Design', titleAr: 'تصميم شعار', descriptionEn: 'Creative branding identity', descriptionAr: 'هوية تجارية إبداعية', icon: 'PenTool', basePrice: 150 },
  { id: '4', titleEn: 'Flyers', titleAr: 'فلايرز', descriptionEn: 'A4/A5, Glossy or Matte', descriptionAr: 'A4/A5، لامع أو مطفي', icon: 'FileText', basePrice: 15 },
  { id: '5', titleEn: 'Rollup Stands', titleAr: 'رول اب', descriptionEn: 'Easy to carry displays', descriptionAr: 'منصات عرض سهلة الحمل', icon: 'Layout', basePrice: 80 }
];

interface OrderSystemProps {
  user: User | null;
  onLoginRequired: () => void;
}

const OrderSystem: React.FC<OrderSystemProps> = ({ user, onLoginRequired }) => {
  const { lang, t } = useContext(LanguageContext);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [quantity, setQuantity] = useState(100);
  const [size, setSize] = useState('Standard');
  const [material, setMaterial] = useState('Premium');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // AI Suggestions
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const calculateEstimate = () => {
    if (!selectedService) return 0;
    let total = selectedService.basePrice;
    if (quantity > 100) total += (quantity - 100) * (selectedService.basePrice * 0.1);
    if (material === 'Luxury') total *= 1.5;
    return total.toFixed(2);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const fetchAiSuggestions = async () => {
    if (!selectedService) return;
    setLoadingAi(true);
    const result = await getCreativeSuggestion(selectedService.titleEn, lang);
    setAiSuggestion(result);
    setLoadingAi(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auth was removed by user, but let's keep the prop for now or handle it gracefully
    // The user manually removed the auth check in Step 40, so we proceed without user check if needed
    
    setIsSubmitting(true);
    setError(null);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing.');
      }

      const templateParams = {
        service_name: selectedService ? (lang === 'en' ? selectedService.titleEn : selectedService.titleAr) : 'Unknown',
        quantity: quantity,
        material: material,
        notes: notes,
        estimated_price: calculateEstimate(),
        file_name: file?.name || 'No file uploaded',
        // If we had user info, we'd add it here
        customer_name: user?.name || 'Guest',
        customer_email: user?.email || 'Not provided'
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      // Construct WhatsApp Message
      const whatsappNumber = '218942926128';
      const serviceName = selectedService ? (lang === 'en' ? selectedService.titleEn : selectedService.titleAr) : 'Unknown';
      const message = encodeURIComponent(
        `*New Order from Haweya Website*\n\n` +
        `*Service:* ${serviceName}\n` +
        `*Quantity:* ${quantity}\n` +
        `*Material:* ${material}\n` +
        `*Estimated Price:* $${calculateEstimate()}\n` +
        `*Notes:* ${notes || 'None'}\n` +
        `*File:* ${file?.name || 'No file uploaded'}\n\n` +
        `*Customer:* ${user?.name || 'Guest'}\n` +
        `*Email:* ${user?.email || 'Not provided'}`
      );
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');

      setOrderDone(true);
      
      // Save order locally for dashboard if user exists
      if (user) {
        const newOrder = {
          id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          userId: user.id,
          serviceId: selectedService?.id,
          specs: { size, quantity, material },
          price: Number(calculateEstimate()),
          status: 'Pending',
          createdAt: new Date().toISOString(),
          fileName: file?.name,
          notes
        };
        const existing = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([...existing, newOrder]));
      }
    } catch (err: any) {
      console.error('Order Email Error:', err);
      setError(lang === 'en' ? 'Failed to submit order. Please try again.' : 'فشل تقديم الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderDone) {
    return (
      <div className="max-w-4xl mx-auto p-12 bg-zinc-900 border border-yellow-400 rounded-3xl text-center space-y-6 my-24">
        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={40} className="text-black" />
        </div>
        <h2 className="text-4xl font-bold">{t('order_success')}</h2>
        <p className="text-zinc-400">{lang === 'en' ? 'Our team will review your requirements and contact you shortly.' : 'سيقوم فريقنا بمراجعة طلبك والتواصل معك قريباً.'}</p>
        <button 
          onClick={() => { setOrderDone(false); setSelectedService(null); setFile(null); }}
          className="bg-white text-black px-8 py-3 rounded-full font-bold"
        >
          {lang === 'en' ? 'Place Another Order' : 'اطلب مرة أخرى'}
        </button>
      </div>
    );
  }

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold">{lang === 'en' ? 'Direct Order System' : 'نظام الطلب المباشر'}</h2>
          <p className="text-zinc-400">{lang === 'en' ? 'Select specifications and get instant estimates' : 'اختر المواصفات واحصل على تقدير فوري'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-2 bg-zinc-950 border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">{t('order_select_service')}</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {availableServices.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedService(s)}
                      className={`p-4 rounded-2xl border-2 text-start transition-all ${
                        selectedService?.id === s.id 
                          ? 'border-yellow-400 bg-yellow-400/5' 
                          : 'border-white/5 bg-zinc-900 hover:border-white/20'
                      }`}
                    >
                      <div className="text-xs font-bold mb-1 opacity-70">{lang === 'en' ? s.titleEn : s.titleAr}</div>
                      <div className="text-[10px] text-zinc-400 truncate">{lang === 'en' ? s.descriptionEn : s.descriptionAr}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              {selectedService && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-zinc-500 uppercase tracking-widest">{t('order_quantity')}</label>
                    <input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-zinc-500 uppercase tracking-widest">{t('order_material')}</label>
                    <select 
                      value={material} 
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                    >
                      <option value="Premium">Premium Quality</option>
                      <option value="Luxury">Luxury / Executive</option>
                      <option value="Eco">Eco-Friendly Paper</option>
                    </select>
                  </div>
                </div>
              )}

              {/* File Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-zinc-500 uppercase tracking-widest">{t('order_upload')}</label>
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-yellow-400/50 transition-colors relative group">
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="mx-auto mb-4 text-zinc-600 group-hover:text-yellow-400" size={40} />
                  <p className="text-zinc-400">
                    {file ? <span className="text-yellow-400 font-bold">{file.name}</span> : (lang === 'en' ? 'Drag & drop or click to upload (PDF, AI, PSD, JPG, PNG)' : 'اسحب وأفلت أو اضغط للرفع (PDF, AI, PSD, JPG, PNG)')}
                  </p>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-zinc-500 uppercase tracking-widest">{lang === 'en' ? 'Additional Notes' : 'ملاحظات إضافية'}</label>
                <textarea 
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                  placeholder={lang === 'en' ? 'Tell us more about your design needs...' : 'أخبرنا المزيد عن احتياجات التصميم الخاصة بك...'}
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm font-medium">{error}</p>
              )}

              <button 
                type="submit"
                disabled={isSubmitting || !selectedService}
                className="w-full bg-yellow-400 text-black py-4 rounded-xl font-bold text-xl hover:bg-yellow-500 transition-all yellow-glow disabled:opacity-50 disabled:hover:bg-yellow-400 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : null}
                {t('order_submit')}
              </button>
            </form>
          </div>

          {/* Right Column: Estimate & AI */}
          <div className="space-y-8">
            <div className="bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] shadow-xl h-fit">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="text-yellow-400" />
                <h3 className="text-xl font-bold">{t('order_estimate')}</h3>
              </div>
              
              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex justify-between">
                  <span className="text-zinc-400">{lang === 'en' ? 'Service' : 'الخدمة'}</span>
                  <span className="font-bold">{selectedService ? (lang === 'en' ? selectedService.titleEn : selectedService.titleAr) : '--'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">{t('order_quantity')}</span>
                  <span className="font-bold">{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">{t('order_material')}</span>
                  <span className="font-bold">{material}</span>
                </div>
                
                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between items-end">
                    <span className="text-zinc-400 text-lg">{lang === 'en' ? 'Total Price' : 'السعر الإجمالي'}</span>
                    <span className="text-4xl font-black text-yellow-400">
                      ${calculateEstimate()}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-2">
                    {lang === 'en' ? '* Prices are estimates and subject to final review.' : '* الأسعار تقديرية وتخضع للمراجعة النهائية.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSystem;
