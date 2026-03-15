import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Gem, Flower2, Star, Palette, Heart } from "lucide-react";

const services = [
  { icon: Sparkles, name: "Manicura Clásica", description: "Limado, cutícula, esmaltado tradicional con productos premium.", price: "$25", duration: "45 min" },
  { icon: Gem, name: "Uñas de Gel", description: "Aplicación de gel de larga duración con acabado brillante impecable.", price: "$45", duration: "60 min" },
  { icon: Flower2, name: "Uñas Acrílicas", description: "Extensiones acrílicas esculpidas a mano con forma personalizada.", price: "$55", duration: "75 min" },
  { icon: Palette, name: "Nail Art Premium", description: "Diseños artísticos exclusivos: mármol, foil dorado, cristales Swarovski.", price: "$35+", duration: "30 min" },
  { icon: Star, name: "Pedicura Spa", description: "Tratamiento completo de pies con exfoliación, masaje y esmaltado.", price: "$40", duration: "60 min" },
  { icon: Heart, name: "Tratamiento Reparador", description: "Fortalecimiento y reparación de uñas dañadas con keratina y biotina.", price: "$30", duration: "40 min" },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0, 0, 1] }}
      className="group relative bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-gold/20"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
          <Icon className="w-6 h-6 text-gold" />
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-semibold text-gold">{service.price}</p>
          <p className="font-body text-sm text-muted-foreground">{service.duration}</p>
        </div>
      </div>

      <h3 className="font-display text-xl font-medium text-foreground mb-3">{service.name}</h3>
      <p className="font-body text-lg text-muted-foreground leading-relaxed">{service.description}</p>

      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicios" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-lg tracking-[0.3em] uppercase text-gold mb-4">Nuestros Servicios</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground text-balance">
            Tratamientos diseñados <br className="hidden md:block" />
            <span className="italic">para ti</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
