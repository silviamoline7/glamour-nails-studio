/**
 * TestimonialsSection - Sección de testimonios de clientas
 * Carrusel automático con animaciones de entrada,
 * comillas decorativas doradas y botones táctiles.
 */
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

/** Lista de testimonios de clientas */
const testimonios = [
  {
    nombre: "Isabella García",
    texto: "El mejor salón de uñas al que he ido. El diseño de mármol con oro quedó absolutamente perfecto. La atención al detalle es increíble.",
    valoracion: 5,
    servicio: "Nail Art Premium",
  },
  {
    nombre: "Valentina Ruiz",
    texto: "Mis uñas de gel duran semanas sin despegarse. El ambiente del salón es tan relajante, me encanta cada visita. ¡100% recomendado!",
    valoracion: 5,
    servicio: "Uñas de Gel",
  },
  {
    nombre: "Camila Torres",
    texto: "La pedicura spa fue una experiencia de lujo total. Desde el masaje hasta el esmaltado, todo fue impecable. Volveré sin duda.",
    valoracion: 5,
    servicio: "Pedicura Spa",
  },
  {
    nombre: "Sofía Mendez",
    texto: "Las acrílicas esculpidas son una obra de arte. El equipo es muy profesional y siempre me asesoran sobre el mejor diseño para mis manos.",
    valoracion: 5,
    servicio: "Uñas Acrílicas",
  },
];

const TestimonialsSection = () => {
  const referencia = useRef(null);
  const enVista = useInView(referencia, { once: true, margin: "-100px" });
  const [testimonioActual, setTestimonioActual] = useState(0);

  /** Avance automático cada 5 segundos */
  useEffect(() => {
    const temporizador = setInterval(
      () => setTestimonioActual((actual) => (actual + 1) % testimonios.length),
      5000
    );
    return () => clearInterval(temporizador);
  }, []);

  /** Ir al testimonio anterior */
  const irAnterior = () =>
    setTestimonioActual((actual) => (actual - 1 + testimonios.length) % testimonios.length);

  /** Ir al testimonio siguiente */
  const irSiguiente = () =>
    setTestimonioActual((actual) => (actual + 1) % testimonios.length);

  return (
    <section id="testimonios" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6" ref={referencia}>
        {/* ── Encabezado ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={enVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-body text-base md:text-lg tracking-[0.3em] uppercase text-gold mb-4">
            Testimonios
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground text-balance">
            Lo que dicen <span className="italic">nuestras clientas</span>
          </h2>
        </motion.div>

        {/* ── Card del testimonio ── */}
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonioActual}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
              className="bg-card rounded-3xl p-6 md:p-12 shadow-card text-center relative border border-border/30"
            >
              {/* Comillas decorativas doradas */}
              <span className="absolute top-4 left-6 md:top-6 md:left-8 font-display text-5xl md:text-7xl text-gold/15 leading-none select-none">
                "
              </span>

              {/* Estrellas con animación escalonada */}
              <div className="flex justify-center gap-1 mb-5 md:mb-6">
                {Array.from({ length: testimonios[testimonioActual].valoracion }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                  >
                    <Star className="w-5 h-5 fill-gold text-gold" />
                  </motion.div>
                ))}
              </div>

              {/* Servicio */}
              <p className="font-display text-base md:text-lg text-muted-foreground italic mb-2">
                {testimonios[testimonioActual].servicio}
              </p>

              {/* Texto del testimonio */}
              <blockquote className="font-body text-lg md:text-2xl text-foreground leading-relaxed mb-6 md:mb-8">
                "{testimonios[testimonioActual].texto}"
              </blockquote>

              {/* Nombre de la clienta */}
              <p className="font-display text-base md:text-lg font-medium text-foreground">
                — {testimonios[testimonioActual].nombre}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* ── Navegación del carrusel ── */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={irAnterior}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-gold hover:bg-accent transition-all duration-300"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Indicadores de posición */}
            <div className="flex gap-2">
              {testimonios.map((_, indice) => (
                <button
                  key={indice}
                  onClick={() => setTestimonioActual(indice)}
                  aria-label={`Ir al testimonio ${indice + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    indice === testimonioActual ? "w-8 bg-gold" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={irSiguiente}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-gold hover:bg-accent transition-all duration-300"
              aria-label="Testimonio siguiente"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
