/**
 * TrustBar - Barra de confianza debajo del hero
 * Muestra indicadores de calidad: higiene, marcas premium, valoraciones.
 * Animaciones escalonadas al entrar en el viewport.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Award, Star } from "lucide-react";

/** Elementos de confianza que se muestran al usuario */
const elementosConfianza = [
  {
    icono: ShieldCheck,
    titulo: "Higiene y Esterilización",
    descripcion: "Protocolos certificados de seguridad e higiene",
  },
  {
    icono: Award,
    titulo: "Marcas Premium",
    descripcion: "Solo trabajamos con productos de primera calidad",
  },
  {
    icono: Star,
    titulo: "4.9 ★ Valoración",
    descripcion: "Más de 500 reseñas de clientas satisfechas",
  },
];

const TrustBar = () => {
  const referencia = useRef(null);
  const enVista = useInView(referencia, { once: true, margin: "-50px" });

  return (
    <section
      className="py-12 md:py-14 bg-accent/30 border-y border-border/50"
      ref={referencia}
    >
      <div className="container mx-auto px-6">
        {/* Vertical en móvil, horizontal en desktop */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-8 md:gap-16">
          {elementosConfianza.map((elemento, indice) => {
            const Icono = elemento.icono;
            return (
              <motion.div
                key={elemento.titulo}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={enVista ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: indice * 0.12 }}
                className="flex items-center gap-4 justify-center"
              >
                {/* Icono con fondo dorado sutil */}
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icono className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-base md:text-lg font-medium text-foreground">
                    {elemento.titulo}
                  </h3>
                  <p className="font-body text-sm md:text-base text-muted-foreground">
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
