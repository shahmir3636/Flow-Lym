import React from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram } from 'lucide-react';

const socialLinks = [
  {
    name: 'Email Us',
    href: 'mailto:info@flowlym.tech',
    bgClass: 'bg-[#18181b]',
    shadowClass: 'shadow-[0_4px_24px_rgba(37,99,235,0.45)] hover:shadow-[0_6px_32px_rgba(37,99,235,0.6)]',
    icon: <Mail className="h-7 w-7 text-white" />
  },
  {
    name: 'Follow on Instagram',
    href: 'https://www.instagram.com/flowlym.tech/',
    bgClass: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-zinc-900',
    shadowClass: 'shadow-[0_4px_24px_rgba(225,48,108,0.45)] hover:shadow-[0_6px_32px_rgba(225,48,108,0.6)]',
    icon: <Instagram className="h-7 w-7 text-white" />
  },
  {
    name: 'Chat on WhatsApp',
    href: 'https://wa.me/923367193183',
    bgClass: 'bg-[#25D366]',
    shadowClass: 'shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_32px_rgba(37,211,102,0.6)]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    )
  }
];

export const FloatingContactDock: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {socialLinks.map((link, i) => (
        <motion.div
          key={link.name}
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1.5 + (0.1 * i), type: 'spring', stiffness: 260, damping: 20 }}
          className="relative group flex items-center justify-end"
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-[0_4px_16px_rgba(0,0,0,0.1)] opacity-0 group-hover:opacity-100 transition-all pointer-events-none origin-right transform scale-95 group-hover:scale-100 duration-200">
            {link.name}
          </span>

          <motion.a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.name}
            className={`flex h-14 w-14 items-center justify-center rounded-full transition-shadow ${link.bgClass} ${link.shadowClass}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {link.icon}
          </motion.a>
        </motion.div>
      ))}
    </div>
  );
};
