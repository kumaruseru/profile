import React, { useState, useEffect } from 'react';
import { 
  Send, CheckCircle, AlertCircle, User, Mail, 
  MessageSquare, Loader2, FileText 
} from 'lucide-react';
import { Card, SectionTitle } from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

// --- 1. Định nghĩa Types ---
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactCardProps {
  initialSubject?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({ initialSubject = '' }) => {
  const { data } = useLanguage();
  const [status, setStatus] = useState<SubmitStatus>('idle');

  // --- 2. Effect Auto-fill & Focus ---
  useEffect(() => {
    if (initialSubject) {
      const subjectInput = document.getElementById('subject') as HTMLInputElement;
      if (subjectInput) {
        subjectInput.value = initialSubject;
        
        // Focus vào ô message để nhập nội dung ngay
        const messageInput = document.getElementById('message') as HTMLTextAreaElement;
        if (messageInput) messageInput.focus();
      }
    }
  }, [initialSubject]);

  // --- 3. Handle Submit ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      await fetch('/form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      
      setStatus('success');
      form.reset();
      
      // Reset trạng thái sau 5s
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Form submit error:", error);
      setStatus('error');
    }
  };

  return (
    <Card span="md:col-span-2" className="relative overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
            <SectionTitle icon={Send} title={data?.labels?.contact || "Contact"} className="!mb-0" />
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Available for new projects</span>
            </div>
        </div>
        
        {/* Form */}
        <form 
          name="contact" 
          method="POST" 
          data-netlify="true" 
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input type="hidden" name="form-name" value="contact" />

          {/* Name & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name Input */}
            <div className="space-y-1.5 group">
              <label htmlFor="name" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                {data?.labels?.contactName || "Name"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <User size={18} />
                </div>
                <input required type="text" name="name" id="name" placeholder="John Doe" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all hover:bg-white dark:hover:bg-slate-800" />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5 group">
              <label htmlFor="email" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                {data?.labels?.contactEmail || "Email"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Mail size={18} />
                </div>
                <input required type="email" name="email" id="email" placeholder="john@example.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all hover:bg-white dark:hover:bg-slate-800" />
              </div>
            </div>
          </div>

          {/* Subject Input */}
          <div className="space-y-1.5 group">
            <label htmlFor="subject" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
              {data?.labels?.contactSubject || "Subject"}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <FileText size={18} />
              </div>
              <input
                required
                type="text"
                name="subject"
                id="subject"
                placeholder="Project Opportunity"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all hover:bg-white dark:hover:bg-slate-800"
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-1.5 group">
            <label htmlFor="message" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
              {data?.labels?.contactMessage || "Message"}
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <MessageSquare size={18} />
              </div>
              <textarea required name="message" id="message" rows={4} placeholder="Tell me about your project..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none hover:bg-white dark:hover:bg-slate-800"></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className={`
                relative overflow-hidden group flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform active:scale-95
                ${status === 'success' 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 w-full justify-center' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 w-full sm:w-auto'
                }
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
            >
              {status === 'idle' && (
                <>
                  <span>{data?.labels?.send || "Send Message"}</span>
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
              
              {status === 'submitting' && (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>{data?.labels?.sending || "Sending..."}</span>
                </>
              )}

              {status === 'success' && (
                <>
                  <CheckCircle size={18} />
                  <span>{data?.labels?.sent || "Sent!"}</span>
                </>
              )}

              {status === 'error' && (
                <>
                  <AlertCircle size={18} />
                  <span>{data?.labels?.error || "Error"}</span>
                </>
              )}
              
              {/* Shimmer Effect */}
              {status === 'idle' && (
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
              )}
            </button>

            {status === 'error' && (
                <p className="text-sm text-red-500 animate-in fade-in slide-in-from-left-2">
                    Something went wrong. Please try again.
                </p>
            )}
          </div>
        </form>
      </div>
    </Card>
  );
};