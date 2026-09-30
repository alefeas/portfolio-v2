'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/app/hooks/useTranslation';
import { TranslationKey } from '@/app/lib/translations';
import { contactLinks } from '@/app/constants/contact';
import { SectionHeader, Card, StatusDot, Input, Toast } from '@/app/components/ui';
import Link from 'next/link';
import { isValidEmail } from '@/app/lib/validation';

export default function Contact() {
  const { t, ts } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email' && emailError) {
      setEmailError('');
    }
    
    if (name === 'message') {
      const remaining = 500 - value.length;
      const counter = e.target.parentElement?.querySelector('.char-counter');
      if (counter) counter.textContent = `${ts('messageLabel')} (${remaining} ${ts('charactersRemaining')})`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    if (!isValidEmail(formData.email)) {
      setEmailError(ts('invalidEmail'));
      return;
    }

    setEmailError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mqajzrzo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json().catch(() => null) as { errors?: { field?: string }[] } | null;
        const hasEmailError = data?.errors?.some((err) => err.field === 'email');
        if (hasEmailError) {
          setEmailError(ts('invalidEmail'));
        } else {
          setSubmitStatus('error');
        }
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => setSubmitStatus('idle'), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const getIcon = (iconType: string) => {
    switch(iconType) {
      case 'email':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        );
      case 'whatsapp':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'github':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-6xl mx-auto">
      <SectionHeader
        icon={<svg width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
          <path d="M224 48H32a8 8 0 0 0-8 8v136a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8ZM203.43 64L128 133.15L52.57 64ZM216 192H40V74.19l82.59 75.71a8 8 0 0 0 10.82 0L216 74.19V192Z"/>
        </svg>}
        badge={t('contact')}
        title={t('letsWorkTogether')}
        description={t('contactDescFull')}
        highlightText={t('collaborateText')}
      />

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Info */}
        <div className="space-y-6 lg:space-y-8 flex flex-col h-full">
          <div>
            <h3 className="heading-3 text-foreground mb-4 lg:mb-6">{t('getInTouchTitle')}</h3>
            
            {/* Contact Methods */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {contactLinks.map((contact, index) => (
                <Link
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card variant="hover" className="p-3 lg:p-4 h-full">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="text-primary transition-colors duration-300 flex-shrink-0">
                        {getIcon(contact.icon)}
                      </div>
                      <div className="min-w-0">
                        <div className="heading-6 text-foreground truncate">{t(contact.labelKey as TranslationKey)}</div>
                        <div className="text-xs lg:text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300 truncate">
                          {contact.value}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Message */}
          <Card className="p-4 lg:p-6 flex-1 flex flex-col justify-center">
            <h4 className="heading-5 text-foreground mb-3 lg:mb-4 flex items-center gap-2">
              <StatusDot />
              {t('quickResponse')}
            </h4>
            <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed mb-3 lg:mb-4">
              {t('responseTime')} <span className="text-emphasis">{t('hours24')}</span>.
              {t('contactFormDesc')}
            </p>
            <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed">
              {t('contactFormDesc2')}
            </p>
          </Card>
        </div>

        <div className="flex flex-col h-full">
          <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between lg:mt-[57.59px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <Input
                type="text"
                name="name"
                maxLength={50}
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={ts('yourName')}
                label={ts('nameLabel')}
              />
              <div>
                <Input
                  type="email"
                  name="email"
                  maxLength={100}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={ts('yourEmail')}
                  label={ts('emailLabel')}
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]{2,}"
                  title={ts('invalidEmail')}
                />
                {emailError && (
                  <p className="text-sm text-red-400 mt-2 ml-1">{emailError}</p>
                )}
              </div>
            </div>
            
            <Input
              type="text"
              name="subject"
              maxLength={80}
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder={ts('whatsAbout')}
              label={ts('subjectLabel')}
            />
            
            <div>
              <textarea
                name="message"
                rows={5}
                maxLength={500}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-background border border-border rounded-xl text-base text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none transition-colors duration-200 resize-none"
                placeholder={ts('tellAboutProject')}
              />
              <p className="text-xs lg:text-sm text-muted-foreground mt-2 ml-1 char-counter">{ts('messageLabel')} (500 {ts('charactersRemaining')})</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 lg:px-6 py-2 lg:py-3 bg-primary text-primary-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm lg:text-base rounded-lg font-medium transition-colors duration-150"
            >
              {isSubmitting ? 'Sending...' : t('sendMessage')}
            </button>
          </form>

          <AnimatePresence>
            {submitStatus === 'success' && (
              <Toast
                type="success"
                title={t('messageSentSuccess') as string}
                description={t('messageSentDesc') as string}
              />
            )}
            {submitStatus === 'error' && (
              <Toast
                type="error"
                title={t('messageSentError') as string}
                description={t('messageSentErrorDesc') as string}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
