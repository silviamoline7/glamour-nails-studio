/**
 * FAQSection - Sección de Preguntas Frecuentes
 * Acordeón con animaciones escalonadas al hacer scroll.
 * Cada pregunta entra de forma progresiva.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** Lista de preguntas frecuentes */
const preguntasFrecuentes = [
  {
    pregunta: "¿Cómo puedo reservar una cita?",
    respuesta:
      "Puedes reservar directamente desde nuestra web usando la sección 'Reservar'. Elige tu servicio, selecciona fecha y hora, personaliza tu diseño si lo deseas, y confirma tu cita en minutos.",
  },
  {
    pregunta: "¿Cuánto dura cada servicio?",
    respuesta:
      "La duración varía según el servicio: una manicura clásica toma 30-45 min, uñas de gel o acrílicas 60-90 min, nail art premium 90-120 min, y una pedicura spa completa 60-75 min.",
  },
  {
    pregunta: "¿Puedo cancelar o reprogramar mi cita?",
    respuesta:
      "Sí, puedes cancelar o reprogramar con al menos 24 horas de anticipación sin costo. Cancelaciones tardías pueden tener un cargo del 50% del servicio.",
  },
  {
    pregunta: "¿Qué pasa si llego tarde a mi cita?",
    respuesta:
      "Te pedimos llegar 5 minutos antes. Si llegas hasta 15 minutos tarde, ajustaremos el servicio al tiempo restante. Retrasos mayores podrían requerir reprogramar.",
  },
  {
    pregunta: "¿Utilizan productos libres de crueldad animal?",
    respuesta:
      "Absolutamente. Todos nuestros esmaltes y productos son cruelty-free, veganos y libres de tóxicos como formaldehído, tolueno y DBP.",
  },
  {
    pregunta: "¿Puedo llevar mi propio diseño de referencia?",
    respuesta:
      "¡Por supuesto! Al reservar puedes subir una foto de referencia o usar nuestro personalizador interactivo de uñas para crear tu diseño ideal.",
  },
  {
    pregunta: "¿Ofrecen servicios para eventos especiales?",
    respuesta:
      "Sí, tenemos paquetes especiales para bodas, quinceañeras y eventos corporativos. Contacta con nosotras para un presupuesto personalizado.",
  },
  {
    pregunta: "¿Es necesario hacer un depósito para reservar?",
    respuesta:
      "No requerimos depósito para reservas regulares. Para eventos o grupos grandes (3+ personas), solicitamos un depósito del 30%.",
  },
];

const FAQSection = () => {
  const referencia = useRef(null);
  const enVista = useInView(referencia, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6" ref={referencia}>
        {/* ── Encabezado ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={enVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-body text-base md:text-lg tracking-[0.3em] uppercase text-gold mb-4">
            FAQ
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground text-balance">
            Preguntas <span className="italic">frecuentes</span>
          </h2>
        </motion.div>

        {/* ── Acordeón de preguntas ── */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {preguntasFrecuentes.map((faq, indice) => (
              <motion.div
                key={indice}
                initial={{ opacity: 0, y: 20 }}
                animate={enVista ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + indice * 0.08 }}
              >
                <AccordionItem
                  value={`faq-${indice}`}
                  className="bg-card rounded-2xl px-6 border border-border/50 shadow-card overflow-hidden hover:border-gold/20 transition-colors duration-300"
                >
                  <AccordionTrigger className="font-display text-base md:text-xl font-medium text-foreground hover:no-underline py-5 [&>svg]:text-gold [&>svg]:w-5 [&>svg]:h-5">
                    {faq.pregunta}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-base md:text-lg text-muted-foreground pb-5 leading-relaxed">
                    {faq.respuesta}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
