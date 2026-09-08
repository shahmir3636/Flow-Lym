import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { PageRoute, ContactFormData } from '../types';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

const SERVICE_ID = 'service_z2cawow';
const TEMPLATE_ID = 'template_shrj5qc';
const PUBLIC_KEY = 'cbq-0Y3kT9sr8-k7K';

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    selectedServices: ['AI Automation'],
    budgetRange: '$1.5k - $5k',
    timeline: 'Flexible / to be discussed',
    message: ''
  });

  const availableServices = [
    'AI Automation',
    'Web Development',
    'Mobile Apps',
    'AI Solutions',
    'Automation',
    'Maintenance & Support'
  ];

  const handleServiceToggle = (svc: string) => {
    setFormData(prev => {
      const exists = prev.selectedServices.includes(svc);
      if (exists) {
        return { ...prev, selectedServices: prev.selectedServices.filter(s => s !== svc) };
      } else {
        return { ...prev, selectedServices: [...prev.selectedServices, svc] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      company: formData.company || 'Not provided',
      service: formData.selectedServices.join(', '),
      timeline: formData.timeline,
      budget: formData.budgetRange,
      message: formData.message || 'No additional details provided'
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to send email:', err);
      setErrorMessage('Failed to send message via email. Please contact us directly at info@flowlym.tech.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 space-y-16">
      
      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-medium">
            Contact Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900">
            Let's discuss your project.
          </h1>
          <p className="text-zinc-500 text-sm sm:text-base max-w-2xl leading-relaxed">
            Fill out the form below or email us directly at info@flowlym.tech.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/80">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 bg-zinc-100 text-zinc-800 rounded-full flex items-center justify-center mx-auto border border-zinc-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
                    Message Received
                  </h2>
                  <p className="text-zinc-500 text-xs max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold">{formData.name}</span>. Your inquiry has been sent to <span className="font-semibold">info@flowlym.tech</span>. We will get back to you shortly.
                  </p>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-zinc-800 text-white text-xs font-medium rounded-full hover:bg-zinc-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {errorMessage && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-medium text-zinc-600">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Marcus Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-400 focus:bg-white transition-all text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-zinc-600">Work Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="m.vance@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-400 focus:bg-white transition-all text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-medium text-zinc-600">Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-400 focus:bg-white transition-all text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-zinc-600">Company</label>
                    <input
                      type="text"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-400 focus:bg-white transition-all text-xs"
                    />
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-1.5">
                  <label className="font-medium text-zinc-600 block">Services Required</label>
                  <div className="flex flex-wrap gap-1.5">
                    {availableServices.map((svc) => {
                      const isSelected = formData.selectedServices.includes(svc);
                      return (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => handleServiceToggle(svc)}
                          className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all border ${
                            isSelected
                              ? 'bg-zinc-800 text-white border-zinc-800'
                              : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '} {svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="font-medium text-zinc-600">Project Overview</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your technical requirements, goals, or timeline expectations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-400 focus:bg-white transition-all text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-zinc-800 text-white text-xs font-medium rounded-full hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-zinc-800 text-white rounded-2xl space-y-6">
              <h3 className="text-base font-semibold tracking-tight">Direct Channels</h3>

              <div className="space-y-4 text-xs text-zinc-300">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-white block">Email</span>
                    <a href="mailto:info@flowlym.tech" className="hover:underline font-mono text-zinc-300">
                      info@flowlym.tech
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-2">
              <h4 className="text-xs font-semibold text-zinc-900">NDA & Security Policy</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                We sign mutual non-disclosure agreements before reviewing proprietary project codebases or sensitive business logic.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};