import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cómo puedo reservar una cita?",
    answer:
      "Puedes reservar directamente desde nuestra web usando la sección 'Reservar'. Elige tu servicio, selecciona fecha y hora, personaliza tu diseño si lo deseas, y confirma tu cita en minutos.",
  },
  {
    question: "¿Cuánto dura cada servicio?",
    answer:
      "La duración varía según el servicio: una manicura clásica toma 30-45 min, uñas de gel o acrílicas 60-90 min, nail art premium 90-120 min, y una pedicura spa completa 60-75 min.",
  },
  {
    question: "¿Puedo cancelar o reprogramar mi cita?",
    answer:
      "Sí, puedes cancelar o reprogramar con al menos 24 horas de anticipación sin costo. Cancelaciones tardías pueden tener un cargo del 50% del servicio.",
  },
  {
    question: "¿Qué pasa si llego tarde a mi cita?",
    answer:
      "Te pedimos llegar 5 minutos antes. Si llegas hasta 15 minutos tarde, ajustaremos el servicio al tiempo restante. Retrasos mayores podrían requerir reprogramar.",
  },
  {
    question: "¿Utilizan productos libres de crueldad animal?",
    answer:
      "Absolutamente. Todos nuestros esmaltes y productos son cruelty-free, veganos y libres de tóxicos como formaldehído, tolueno y DBP.",
  },
  {
    question: "¿Puedo llevar mi propio diseño de referencia?",
    answer:
      "¡Por supuesto! Al reservar puedes subir una foto de referencia o usar nuestro personalizador interactivo de uñas para crear tu diseño ideal.",
  },
  {
    question: "¿Ofrecen servicios para eventos especiales?",
    answer:
      "Sí, tenemos paquetes especiales para bodas, quinceañeras y eventos corporativos. Contacta con nosotras para un presupuesto personalizado.",
  },
  {
    question: "¿Es necesario hacer un depósito para reservar?",
    answer:
      "No requerimos depósito para reservas regulares. Para eventos o grupos grandes (3+ personas), solicitamos un depósito del 30%.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-lg tracking-[0.3em] uppercase text-gold mb-4">
            FAQ
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground text-balance">
            Preguntas <span className="italic">frecuentes</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-2xl px-6 border border-border/50 shadow-card overflow-hidden"
              >
                <AccordionTrigger className="font-display text-lg md:text-xl font-medium text-foreground hover:no-underline py-5 [&>svg]:text-gold [&>svg]:w-5 [&>svg]:h-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-lg text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
