/**
 * TrustBar - Barra de confianza debajo del hero
 * Tarjetas con iconos dorados, animaciones escalonadas.
 * En móvil: cards compactas en columna. Desktop: horizontal.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Award, Star } from "lucide-react";

/** Elementos de confianza */
const elementosConfianza = [
  {
    icono: ShieldCheck,
    titulo: "Higiene Certificada",
    descripcion: "Protocolos de esterilización de grado hospitalario",
  },
  {
    icono: Award,
    titulo: "Marcas Premium",
    descripcion: "Productos de primera calidad certificados",
  },
  {
    icono: Star,
    titulo: "4.9 ★ Valoración",
    descripcion: "Más de 500 clientas satisfechas",
  },
];

const TrustBar = () => {
  const referencia = useRef(null);
  const enVista = useInView(referencia, { once: true, margin: "-50px" });

  return (
    <section className="py-10 md:py-14" ref={referencia}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {elementosConfianza.map((elemento, indice) => {
            const Icono = elemento.icono;
            return (
              <motion.div
                key={elemento.titulo}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={enVista ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: indice * 0.12 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-elevated hover:border-gold/20 transition-all duration-300"
              >
                {/* Icono con fondo dorado */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icono className="w-6 h-6 md:w-7 md:h-7 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-base md:text-lg font-medium text-foreground leading-tight">
                    {elemento.titulo}
                  </h3>
                  <p className="font-body text-sm md:text-base text-muted-foreground leading-snug">
                    {elemento.descripcion}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
