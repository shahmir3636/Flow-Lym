import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, MessageCircle, Calendar } from 'lucide-react';

type FAQCategory = 'All' | 'AI Automation' | 'Pricing & Timelines' | 'WhatsApp & Voice' | 'Tech Stack';

interface FAQItem {
  question: string;
  answer: string;
  categories: FAQCategory[];
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "What exact services does FLOWLYM provide?",
    answer: "FLOWLYM is a full-service AI automation and development agency. We engineer custom n8n & Make workflows, WhatsApp AI agents, voice AI receptionists, CRM automation layers, custom web applications, and API integrations tailored to your operational workflows.",
    categories: ['All', 'AI Automation']
  },
  {
    question: "How much does an AI automation or web development project cost?",
    answer: "Projects are scoped based on complexity. Simple workflow automations start around $500–$1,500. Comprehensive AI employees (combining WhatsApp AI, voice bots, CRM sync, and automated follow-ups) and full custom web applications typically range from $2,500–$8,000+. We provide fixed-price proposals with transparent milestones after our initial discovery call.",
    categories: ['All', 'Pricing & Timelines']
  },
  {
    question: "How long does implementation take?",
    answer: "Focused workflow automations and landing pages typically ship within 1 to 2 weeks. Complex multi-agent systems and custom web platforms usually take 3 to 6 weeks, including rigorous stress testing and team onboarding.",
    categories: ['All', 'Pricing & Timelines']
  },
  {
    question: "How do your WhatsApp and Voice AI agents work?",
    answer: "Our AI agents connect directly to official WhatsApp Business APIs and telephony systems (like Vapi/Twilio). They are trained on your company's proprietary knowledge base, qualify inbound prospects, check availability in real time, create CRM deals, and schedule calendar appointments — escalating edge cases to human agents whenever needed.",
    categories: ['All', 'WhatsApp & Voice', 'AI Automation']
  },
  {
    question: "Can you integrate with our existing legacy software and CRM?",
    answer: "Yes. We specialize in building modern automation layers around existing software — including legacy CRMs, custom SQL databases, HubSpot, Salesforce, Airtable, Shopify, Google Workspace, and proprietary REST APIs — without requiring you to rebuild your core infrastructure.",
    categories: ['All', 'Tech Stack', 'AI Automation']
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Absolutely. Every project includes a 30-day post-launch warranty and monitoring period. We also offer dedicated monthly SLA maintenance packages to continuously optimize prompt performance, add new features, and monitor workflow health 24/7.",
    categories: ['All', 'Pricing & Timelines', 'Tech Stack']
  }
];

const CATEGORIES: FAQCategory[] = ['All', 'AI Automation', 'Pricing & Timelines', 'WhatsApp & Voice', 'Tech Stack'];

interface FAQSectionProps {
  onOpenStartProject?: () => void;
  onNavigateContact?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenStartProject, onNavigateContact }) => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFAQs = FAQ_DATA.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.categories.includes(activeCategory);
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto space-y-8 text-zinc-900 font-sans">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <p className="text-zinc-500 text-sm sm:text-base max-w-2xl mx-auto">
          Everything you need to know about our services, pricing, timelines, and how we integrate AI into your business.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === category
                  ? 'bg-zinc-900 text-white shadow-md'
                  : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-zinc-200 rounded-full text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-100 transition-all text-zinc-800 placeholder:text-zinc-400"
          />
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-12 text-zinc-400 text-sm"
            >
              No questions found for your search criteria.
            </motion.div>
          )}
        </AnimatePresence>

        {filteredFAQs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-zinc-200 bg-zinc-50/30' : 'border-zinc-200 bg-white hover:border-zinc-300 shadow-sm hover:shadow-md'}`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-5 py-5 sm:px-6 flex items-start justify-between gap-4 text-left focus:outline-none cursor-pointer"
              >
                <span className={`font-bold text-sm sm:text-base ${isOpen ? 'text-zinc-900' : 'text-zinc-800'}`}>
                  {faq.question}
                </span>
                <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-zinc-100' : 'bg-zinc-100'}`}>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-zinc-900' : 'text-zinc-400'}`} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 sm:px-6 pt-0 text-sm text-zinc-500 leading-relaxed">
                      <div className="pt-2 border-t border-zinc-100/50 mt-1">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-6 sm:p-8 bg-zinc-50 rounded-2xl border border-zinc-100 text-center space-y-5">
        <h3 className="text-lg font-bold text-zinc-950">Still have questions?</h3>
        <p className="text-sm text-zinc-800 max-w-lg mx-auto">
          Chat with us on WhatsApp for immediate answers, or schedule a free technical consultation to discuss your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {onNavigateContact && (
            <button
              onClick={onNavigateContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BE5C] text-white text-xs font-bold rounded-full transition-colors shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </button>
          )}

          {onOpenStartProject && (
            <button
              onClick={onOpenStartProject}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 text-xs font-bold rounded-full transition-colors shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-zinc-900" />
              <span>Schedule Consultation</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
