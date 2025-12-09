// app/components/sections/ContactCard.jsx
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, SectionTitle } from '~/components/ui/Card';
import { useLanguage } from '~/contexts/LanguageContext';

export const ContactCard = () => {
  const { data } = useLanguage();
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.target);
    
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });
      setStatus('success');
      e.target.reset();
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <Card span="md:col-span-2" className="bg-white dark:bg-slate-900">
      <SectionTitle icon={Send} title={data.labels.contact} />
      
      <form 
        name="contact" 
        method="POST" 
        data-netlify="true" 
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Input ẩn bắt buộc để Netlify nhận diện form */}
        <input type="hidden" name="form-name" value="contact" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {data.labels.contactName}
            </label>
            <input
              required
              type="text"
              name="name"
              id="name"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {data.labels.contactEmail}
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {data.labels.contactMessage}
          </label>
          <textarea
            required
            name="message"
            id="message"
            rows="4"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
            status === 'success' 
              ? 'bg-emerald-500 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {status === 'idle' && <>{data.labels.send} <Send size={16} /></>}
          {status === 'submitting' && data.labels.sending}
          {status === 'success' && <>{data.labels.sent} <CheckCircle size={16} /></>}
          {status === 'error' && <>{data.labels.error} <AlertCircle size={16} /></>}
        </button>
      </form>
    </Card>
  );
};