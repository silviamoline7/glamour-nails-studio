/**
 * ServicePageLayout - Layout reutilizable para páginas de servicios
 * Incluye hero, tipos de servicio, preguntas frecuentes y sección "Por qué elegirnos".
 * Usado por ManicuraPage, PedicuraPage y UnasDeGelPage.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";

/** Tipo de servicio individual */
export interface ServiceType {
  name: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  alt: string;
}

/** Pregunta frecuente */
export interface FAQ {
  question: string;
  answer: string;
}

/** Razón para elegirnos */
export interface WhyChooseItem {
  title: string;
  description: string;
}

interface ServicePageLayoutProps {
  seoTitle: string;
  seoDescription: string;
  breadcrumbLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroAlt: string;
  serviceTypes: ServiceType[];
  faqs: FAQ[];
  whyChooseUs: WhyChooseItem[];
}

const ServicePageLayout = ({
  seoTitle,
  seoDescription,
  breadcrumbLabel,
  heroTitle,
  heroSubtitle,
  heroImage,
  heroAlt,
  serviceTypes,
  faqs,
  whyChooseUs,
}: ServicePageLayoutProps) => {
  const servicesRef = useRef(null);
  const faqRef = useRef(null);
  const whyRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-80px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={seoTitle} description={seoDescription} />

      {/* Hero de servicio */}
      <section className="relative pt-32 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt={heroAlt} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        <div className="relative container mx-auto px-6">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Servicios" },
              { label: breadcrumbLabel },
            ]}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl mt-8"
          >
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-4">
              {heroTitle}
            </h1>
            <p className="font-body text-xl text-muted-foreground leading-relaxed mb-8">
              {heroSubtitle}
            </p>
            <Link
              to="/#reservar"
              className="inline-block gold-gradient px-8 py-4 rounded-full font-body text-xl text-primary-foreground shadow-elevated hover:scale-105 transition-transform duration-300"
            >
              Reservar Cita
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Tipos de servicio */}
      <section className="py-20 md:py-28" ref={servicesRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-body text-lg tracking-[0.3em] uppercase text-gold mb-4">Tipos</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
              Nuestras <span className="italic">opciones</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceTypes.map((st, i) => (
              <motion.div
                key={st.name}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-500 border border-border/50"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={st.image}
                    alt={st.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-xl font-medium text-foreground">{st.name}</h3>
                    <div className="text-right">
                      <p className="font-display text-xl font-semibold text-gold">{st.price}</p>
                      <p className="font-body text-sm text-muted-foreground">{st.duration}</p>
                    </div>
                  </div>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">{st.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-20 md:py-28 bg-secondary/30" ref={whyRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-body text-lg tracking-[0.3em] uppercase text-gold mb-4">Calidad</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
              Por qué <span className="italic">elegirnos</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={whyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg font-medium text-foreground mb-1">{item.title}</h3>
                  <p className="font-body text-base text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28" ref={faqRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-body text-lg tracking-[0.3em] uppercase text-gold mb-4">FAQ</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
              Preguntas <span className="italic">frecuentes</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
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
                  <AccordionTrigger className="font-display text-lg font-medium text-foreground hover:no-underline py-5 [&>svg]:text-gold [&>svg]:w-5 [&>svg]:h-5">
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

      {/* CTA Final */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
            ¿Lista para lucir unas uñas <span className="italic gold-text">perfectas</span>?
          </h2>
          <Link
            to="/#reservar"
            className="inline-flex items-center gap-2 gold-gradient px-8 py-4 rounded-full font-body text-xl text-primary-foreground shadow-elevated hover:scale-105 transition-transform duration-300"
          >
            Reservar Cita <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicePageLayout;
