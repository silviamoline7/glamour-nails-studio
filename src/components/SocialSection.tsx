/**
 * SocialSection - Sección "Síguenos en nuestras redes"
 * Muestra enlaces a Instagram, TikTok y Facebook con
 * micro-interacciones en hover.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "lucide-react";

/** Icono TikTok custom SVG */
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.19a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.62z" />
  </svg>
);

/** Icono Facebook custom SVG */
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const socials = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/lumierenails", handle: "@lumierenails" },
  { name: "TikTok", icon: TikTokIcon, href: "https://tiktok.com/@lumierenails", handle: "@lumierenails" },
  { name: "Facebook", icon: FacebookIcon, href: "https://facebook.com/lumierenails", handle: "Lumière Nails" },
];

const SocialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20" ref={ref}>
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-lg tracking-[0.3em] uppercase text-gold mb-4">
            Síguenos
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-10">
            Nuestras <span className="italic">redes sociales</span>
          </h2>
        </motion.div>

        <div className="flex justify-center gap-8 md:gap-12">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent border border-border/50 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-300">
                  <Icon className="w-7 h-7 text-muted-foreground group-hover:text-gold transition-colors duration-300" />
                </div>
                <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {social.handle}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
