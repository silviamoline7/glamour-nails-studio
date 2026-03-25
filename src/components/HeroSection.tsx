/**
 * HeroSection - Sección principal (Hero) de la página de inicio
 * H1 con keyword SEO, imagen de fondo con overlay,
 * botones CTA estilizados y animaciones de entrada.
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import imagenHero from "@/assets/hero-salon.jpg";

const HeroSection = () => {
  const referenciaSeccion = useRef(null);

  /* Efecto paralaje suave en la imagen de fondo */
  const { scrollYProgress } = useScroll({
    target: referenciaSeccion,
    offset: ["start start", "end start"],
  });
  const desplazamientoImagen = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  /** Desplazar suavemente a una sección por su selector */
  const irASeccion = (selector: string) => {
    const elemento = document.querySelector(selector);
    elemento?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={referenciaSeccion}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Imagen de fondo con paralaje y overlay ── */}
      <div className="absolute inset-0">
        <motion.img
          src={imagenHero}
          alt="Lumière Nails - Salón de uñas de lujo en Madrid"
          className="w-full h-full object-cover"
          style={{ y: desplazamientoImagen }}
        />
        {/* Overlay más envolvente en móvil para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/60 md:bg-gradient-to-r md:from-background/95 md:via-background/70 md:to-background/20" />
      </div>

      {/* ── Contenido principal ── */}
      <div className="relative container mx-auto px-6 pt-28 md:pt-32 pb-20">
        <div className="max-w-2xl">
          {/* Subtítulo decorativo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-5 md:mb-6"
          >
            <div className="w-8 h-px gold-gradient" />
            <p className="font-body text-sm md:text-lg tracking-[0.3em] uppercase text-gold">
              Nail Studio & Spa
            </p>
            <div className="w-8 h-px gold-gradient" />
          </motion.div>

          {/* H1 con keyword SEO principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.2, 0, 0, 1] }}
            className="font-display text-4xl md:text-7xl font-semibold text-foreground leading-[1.1] text-balance mb-5 md:mb-8"
          >
            Salón de Uñas
            <br />
            en <span className="italic gold-text">Madrid</span>
          </motion.h1>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-body text-base md:text-2xl text-muted-foreground leading-relaxed max-w-lg mb-8 md:mb-10"
          >
            Experimenta el lujo de un servicio personalizado con técnicas de vanguardia y productos premium.
          </motion.p>

          {/* Botones CTA estilizados */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <button
              onClick={() => irASeccion("#reservar")}
              className="group gold-gradient px-7 py-3.5 rounded-full font-body text-base md:text-xl text-primary-foreground shadow-elevated hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              Reservar Cita
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/disenos"
              className="px-7 py-3.5 rounded-full font-body text-base md:text-xl text-foreground border border-gold/40 hover:border-gold hover:bg-accent/50 backdrop-blur-sm transition-all duration-300 text-center"
            >
              Ver Diseños
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Línea decorativa dorada inferior ── */}
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
