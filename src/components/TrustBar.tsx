/**
 * TrustBar - Barra de confianza debajo del hero
 * Muestra indicadores de calidad: higiene, marcas premium, valoraciones.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Award, Star } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Higiene y Esterilización",
    description: "Protocolos certificados de seguridad e higiene",
  },
  {
    icon: Award,
    title: "Marcas Premium",
    description: "Solo trabajamos con productos de primera calidad",
  },
  {
    icon: Star,
    title: "4.9 ★ Valoración",
    description: "Más de 500 reseñas de clientas satisfechas",
  },
];

const TrustBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-12 bg-accent/30 border-y border-border/50" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {trustItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-center gap-4 justify-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-base font-medium text-foreground">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{item.description}</p>
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
