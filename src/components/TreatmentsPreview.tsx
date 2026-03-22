/**
 * TreatmentsPreview - Sección "Tratamientos diseñados para ti"
 * Muestra los 3 servicios principales con imagen, nombre y botón
 * que lleva a la página detallada de cada servicio.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import serviceManicura from "@/assets/service-manicura.jpg";
import servicePedicura from "@/assets/service-pedicura.jpg";
import serviceGel from "@/assets/service-gel.jpg";

const treatments = [
  {
    name: "Manicura Clásica",
    image: serviceManicura,
    alt: "Manicura profesional Madrid centro",
    href: "/servicios/manicura",
    description: "Limado, cutícula y esmaltado con productos premium.",
  },
  {
    name: "Pedicura",
    image: servicePedicura,
    alt: "Pedicura spa Madrid",
    href: "/servicios/pedicura",
    description: "Tratamiento completo de pies con exfoliación y masaje.",
  },
  {
    name: "Uñas de Gel",
    image: serviceGel,
    alt: "Uñas de gel Madrid",
    href: "/servicios/unas-de-gel",
    description: "Extensiones de gel de larga duración con acabado brillante.",
  },
];

const TreatmentsPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Encabezado de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-lg tracking-[0.3em] uppercase text-gold mb-4">
            Nuestros Servicios
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground text-balance">
            Tratamientos diseñados <br className="hidden md:block" />
            <span className="italic">para ti</span>
          </h2>
        </motion.div>

        {/* Grid de tratamientos */}
        <div className="grid md:grid-cols-3 gap-8">
          {treatments.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group"
            >
              <Link to={t.href} className="block">
                {/* Imagen del tratamiento */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card mb-6 group-hover:shadow-elevated transition-shadow duration-500">
                  <img
                    src={t.image}
                    alt={t.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Información */}
                <h3 className="font-display text-2xl font-medium text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                  {t.name}
                </h3>
                <p className="font-body text-lg text-muted-foreground mb-4">{t.description}</p>

                {/* Botón */}
                <span className="inline-flex items-center gap-2 font-body text-base text-gold group-hover:gap-3 transition-all duration-300">
                  Ver servicio <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentsPreview;
