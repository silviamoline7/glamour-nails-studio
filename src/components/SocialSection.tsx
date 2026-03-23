/**
 * SocialSection - Sección "Síguenos en nuestras redes"
 * Iconos grandes con efecto glow dorado al hover,
 * nombre de cada red social visible y animaciones escalonadas.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "lucide-react";

/** Icono TikTok personalizado */
const IconoTikTok = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.19a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.62z" />
  </svg>
);

/** Icono Facebook personalizado */
const IconoFacebook = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

/** Lista de redes sociales del salón */
const redesSociales = [
  { nombre: "Instagram", icono: Instagram, enlace: "https://instagram.com/lumierenails", usuario: "@lumierenails" },
  { nombre: "TikTok", icono: IconoTikTok, enlace: "https://tiktok.com/@lumierenails", usuario: "@lumierenails" },
  { nombre: "Facebook", icono: IconoFacebook, enlace: "https://facebook.com/lumierenails", usuario: "Lumière Nails" },
];

const SocialSection = () => {
  const referencia = useRef(null);
  const enVista = useInView(referencia, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20" ref={referencia}>
      <div className="container mx-auto px-6 text-center">
        {/* ── Encabezado ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={enVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-base md:text-lg tracking-[0.3em] uppercase text-gold mb-4">
            Síguenos
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-10 md:mb-14">
            Nuestras <span className="italic">redes sociales</span>
          </h2>
        </motion.div>

        {/* ── Iconos de redes sociales ── */}
        <div className="flex justify-center gap-10 md:gap-16">
          {redesSociales.map((red, indice) => {
            const Icono = red.icono;
            return (
              <motion.a
                key={red.nombre}
                href={red.enlace}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={enVista ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + indice * 0.12 }}
                whileHover={{ scale: 1.1, y: -6 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 group"
              >
                {/* Icono grande con efecto glow dorado */}
                <div className="w-20 h-20 rounded-2xl bg-accent border border-border/50 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/40 group-hover:shadow-[0_0_20px_hsl(38_65%_50%/0.15)] transition-all duration-300">
                  <Icono className="w-9 h-9 text-muted-foreground group-hover:text-gold transition-colors duration-300" />
                </div>
                {/* Nombre de la red */}
                <span className="font-display text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {red.nombre}
                </span>
                {/* Usuario/handle */}
                <span className="font-body text-xs text-muted-foreground/60 group-hover:text-gold/80 transition-colors duration-300">
                  {red.usuario}
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
