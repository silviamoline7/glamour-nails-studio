/**
 * TreatmentsPreview - Sección "Tratamientos diseñados para ti"
 * Cards con imagen, nombre, descripción y enlace.
 * En móvil: layout horizontal compacto. Desktop: vertical con hover.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import imagenManicura from "@/assets/service-manicura.jpg";
import imagenPedicura from "@/assets/service-pedicura.jpg";
import imagenGel from "@/assets/service-gel.jpg";

/** Lista de tratamientos destacados */
const tratamientos = [
  {
    nombre: "Manicura Clásica",
    imagen: imagenManicura,
    alt: "Manicura profesional Madrid centro",
    ruta: "/servicios/manicura",
    descripcion: "Limado, cutícula y esmaltado con productos premium.",
  },
  {
    nombre: "Pedicura Spa",
    imagen: imagenPedicura,
    alt: "Pedicura spa Madrid",
    ruta: "/servicios/pedicura",
    descripcion: "Tratamiento completo de pies con exfoliación y masaje.",
  },
  {
    nombre: "Uñas de Gel",
    imagen: imagenGel,
    alt: "Uñas de gel Madrid",
    ruta: "/servicios/unas-de-gel",
    descripcion: "Extensiones de gel de larga duración con acabado brillante.",
  },
];

const TreatmentsPreview = () => {
  const referencia = useRef(null);
  const enVista = useInView(referencia, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6" ref={referencia}>
        {/* ── Encabezado de sección ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={enVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="font-body text-sm md:text-lg tracking-[0.3em] uppercase text-gold mb-3">
            Nuestros Servicios
          </p>
          <h2 className="font-display text-2xl md:text-5xl font-semibold text-foreground text-balance">
            Tratamientos diseñados <br className="hidden md:block" />
            <span className="italic">para ti</span>
          </h2>
        </motion.div>

        {/* ── Móvil: cards horizontales compactas ── */}
        <div className="flex flex-col gap-4 md:hidden">
          {tratamientos.map((tratamiento, indice) => (
            <motion.div
              key={tratamiento.nombre}
              initial={{ opacity: 0, x: -30 }}
              animate={enVista ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + indice * 0.12 }}
            >
              <Link
                to={tratamiento.ruta}
                className="flex items-center gap-4 p-3 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-elevated hover:border-gold/20 transition-all duration-300 group"
              >
                <img
                  src={tratamiento.imagen}
                  alt={tratamiento.alt}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-medium text-foreground group-hover:text-gold transition-colors mb-1">
                    {tratamiento.nombre}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground line-clamp-2">
                    {tratamiento.descripcion}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gold flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── Desktop: grid vertical con hover ── */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {tratamientos.map((tratamiento, indice) => (
            <motion.div
              key={tratamiento.nombre}
              initial={{ opacity: 0, y: 40 }}
              animate={enVista ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + indice * 0.15 }}
              className="group"
            >
              <Link to={tratamiento.ruta} className="block">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card mb-6 group-hover:shadow-elevated transition-shadow duration-500 border border-transparent group-hover:border-gold/20">
                  <motion.img
                    src={tratamiento.imagen}
                    alt={tratamiento.alt}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={enVista ? { scale: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.2 + indice * 0.15 }}
                    whileHover={{ scale: 1.05 }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="font-display text-2xl font-medium text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                  {tratamiento.nombre}
                </h3>
                <p className="font-body text-lg text-muted-foreground mb-4">
                  {tratamiento.descripcion}
                </p>
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
