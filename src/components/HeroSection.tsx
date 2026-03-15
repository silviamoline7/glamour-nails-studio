import { motion } from "framer-motion";
import heroImage from "@/assets/hero-salon.jpg";

const HeroSection = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Lumière Nails Studio - Salón de uñas de lujo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
      </div>

      <div className="relative container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg tracking-[0.3em] uppercase text-gold mb-6"
          >
            Nail Studio & Spa
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.2, 0, 0, 1] }}
            className="font-display text-5xl md:text-7xl font-semibold text-foreground leading-[1.1] text-balance mb-8"
          >
            El arte de la
            <br />
            <span className="italic gold-text">elegancia</span>
            <br />
            en tus manos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-body text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg mb-10"
          >
            Experimenta el lujo de un servicio personalizado con técnicas de vanguardia y productos premium.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo("#reservar")}
              className="gold-gradient px-8 py-4 rounded-full font-body text-xl text-primary-foreground shadow-elevated hover:scale-105 transition-transform duration-300"
            >
              Reservar Cita
            </button>
            <button
              onClick={() => scrollTo("#servicios")}
              className="px-8 py-4 rounded-full font-body text-xl text-foreground border border-gold/30 hover:border-gold hover:bg-accent transition-all duration-300"
            >
              Ver Servicios
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative gold line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.2, 0, 0, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px gold-gradient origin-left"
      />
    </section>
  );
};

export default HeroSection;
