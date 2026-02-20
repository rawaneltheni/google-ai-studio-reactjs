
import React, { useContext, useState, useRef } from 'react';
import { LanguageContext } from '../App';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const { lang, t } = useContext(LanguageContext);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    setError(null);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check environment variables.');
      }

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      setIsSent(true);
      formRef.current.reset();
      setTimeout(() => setIsSent(false), 5000);
    } catch (err: any) {
      console.error('EmailJS Error:', err);
      setError(lang === 'en' ? 'Failed to send message. Please try again later.' : 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقاً.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <h2 className="text-5xl font-black mb-6">{t('contact_us')}</h2>
              <div className="w-20 h-2 bg-yellow-400 mb-8"></div>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                {lang === 'en' 
                  ? 'Have a specific project in mind? Our team of experts is ready to bring your vision to life.' 
                  : 'لديك مشروع معين في بالك؟ فريق خبرائنا مستعد لتحويل رؤيتك إلى حقيقة.'}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center shrink-0 border border-white/5">
                  <MapPin className="text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">{lang === 'en' ? 'Address' : 'العنوان'}</h4>
                  <p className="text-zinc-500">{lang === 'en' ? 'Benghazi, Libya' : 'بنغازي، ليبيا'}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center shrink-0 border border-white/5">
                  <Phone className="text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">{lang === 'en' ? 'Phone' : 'الهاتف'}</h4>
                  <p className="text-zinc-500" dir="ltr">+218 94 292 6128</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center shrink-0 border border-white/5">
                  <Mail className="text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">{lang === 'en' ? 'Email' : 'البريد الإلكتروني'}</h4>
                  <p className="text-zinc-500">info@haweyaadv.ly</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5 backdrop-blur-sm">
            {isSent ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={40} className="text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {lang === 'en' ? 'Message Sent!' : 'تم إرسال الرسالة!'}
                </h3>
                <p className="text-zinc-400">
                  {lang === 'en' 
                    ? 'Thank you for reaching out. We will get back to you as soon as possible.' 
                    : 'شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.'}
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{lang === 'en' ? 'Name' : 'الاسم'}</label>
                    <input 
                      name="user_name"
                      required
                      className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 focus:border-yellow-400 outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{lang === 'en' ? 'Email' : 'البريد'}</label>
                    <input 
                      type="email"
                      name="user_email"
                      required
                      className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 focus:border-yellow-400 outline-none transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{lang === 'en' ? 'Subject' : 'الموضوع'}</label>
                  <input 
                    name="subject"
                    required
                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 focus:border-yellow-400 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{lang === 'en' ? 'Message' : 'الرسالة'}</label>
                  <textarea 
                    name="message"
                    required
                    rows={5} 
                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 focus:border-yellow-400 outline-none transition-all resize-none" 
                  />
                </div>
                
                {error && (
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                )}

                <button 
                  disabled={isSending}
                  className="w-full bg-yellow-400 text-black py-5 rounded-2xl font-black text-lg hover:bg-yellow-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      {lang === 'en' ? 'Sending...' : 'جاري الإرسال...'}
                    </>
                  ) : (
                    <>
                      {lang === 'en' ? 'Send Message' : 'إرسال الرسالة'}
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
