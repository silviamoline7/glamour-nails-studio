import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Isabella García",
    text: "El mejor salón de uñas al que he ido. El diseño de mármol con oro quedó absolutamente perfecto. La atención al detalle es increíble.",
    rating: 5,
    service: "Nail Art Premium",
  },
  {
    name: "Valentina Ruiz",
    text: "Mis uñas de gel duran semanas sin despegarse. El ambiente del salón es tan relajante, me encanta cada visita. ¡100% recomendado!",
    rating: 5,
    service: "Uñas de Gel",
  },
  {
    name: "Camila Torres",
    text: "La pedicura spa fue una experiencia de lujo total. Desde el masaje hasta el esmaltado, todo fue impecable. Volveré sin duda.",
    rating: 5,
    service: "Pedicura Spa",
  },
  {
    name: "Sofía Mendez",
    text: "Las acrílicas esculpidas son una obra de arte. El equipo es muy profesional y siempre me asesoran sobre el mejor diseño para mis manos.",
    rating: 5,
    service: "Uñas Acrílicas",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonios" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-lg tracking-[0.3em] uppercase text-gold mb-4">Testimonios</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground text-balance">
            Lo que dicen <span className="italic">nuestras clientas</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            className="bg-card rounded-3xl p-8 md:p-12 shadow-card text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>

            <p className="font-display text-lg text-muted-foreground italic mb-2">
              {testimonials[current].service}
            </p>

            <blockquote className="font-body text-xl md:text-2xl text-foreground leading-relaxed mb-8">
              "{testimonials[current].text}"
            </blockquote>

            <p className="font-display text-lg font-medium text-foreground">
              — {testimonials[current].name}
            </p>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-gold hover:bg-accent transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-gold" : "bg-border"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-gold hover:bg-accent transition-all duration-300"
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
