/**
 * ServicePageLayout - Layout moderno para páginas de servicios
 * Hero fullwidth, servicios en layout creativo alternado,
 * sección "por qué elegirnos" y FAQ.
 * Sin breadcrumb visual (mantenemos JSON-LD para SEO).
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Clock, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  const serviciosRef = useRef(null);
  const faqRef = useRef(null);
  const porqueRef = useRef(null);
  const serviciosEnVista = useInView(serviciosRef, { once: true, margin: "-80px" });
  const faqEnVista = useInView(faqRef, { once: true, margin: "-80px" });
  const porqueEnVista = useInView(porqueRef, { once: true, margin: "-80px" });

  /* JSON-LD de breadcrumb para SEO (sin visual) */
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://lumierenails.com/" },
      { "@type": "ListItem", position: 2, name: "Servicios" },
      { "@type": "ListItem", position: 3, name: breadcrumbLabel },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={seoTitle} description={seoDescription} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

      {/* ── Hero fullwidth inmersivo ── */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt={heroAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-6 pb-12 md:pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px gold-gradient" />
              <p className="font-body text-sm tracking-[0.3em] uppercase text-gold">Servicio</p>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-4">
              {heroTitle}
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {heroSubtitle}
            </p>
            <Link
              to="/?reservar=true"
              className="inline-flex items-center gap-2 gold-gradient px-7 py-3.5 rounded-full font-body text-lg text-primary-foreground shadow-elevated hover:scale-105 transition-transform duration-300"
            >
              <Sparkles className="w-5 h-5" />
              Reservar Cita
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Servicios en layout alternado ── */}
      <section className="py-16 md:py-28" ref={serviciosRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={serviciosEnVista ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="font-body text-sm md:text-lg tracking-[0.3em] uppercase text-gold mb-3">Tipos</p>
            <h2 className="font-display text-2xl md:text-5xl font-semibold text-foreground">
              Nuestras <span className="italic">opciones</span>
            </h2>
          </motion.div>

          <div className="space-y-8 md:space-y-16">
            {serviceTypes.map((st, i) => (
              <motion.div
                key={st.name}
                initial={{ opacity: 0, y: 40 }}
                animate={serviciosEnVista ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-12 items-center`}
              >
                {/* Imagen */}
                <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-card group">
                  <img
                    src={st.image}
                    alt={st.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                {/* Info */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-display text-2xl md:text-3xl font-semibold text-gold">{st.price}</span>
                    <span className="font-body text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {st.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-3xl font-medium text-foreground mb-3">
                    {st.name}
                  </h3>
                  <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
                    {st.description}
                  </p>
                  <Link
                    to="/?reservar=true"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/30 font-body text-base text-gold hover:bg-gold/5 transition-all duration-300"
                  >
                    Reservar <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Por qué elegirnos ── */}
      <section className="py-16 md:py-28 bg-secondary/30" ref={porqueRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={porqueEnVista ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="font-body text-sm md:text-lg tracking-[0.3em] uppercase text-gold mb-3">Calidad</p>
            <h2 className="font-display text-2xl md:text-5xl font-semibold text-foreground">
              Por qué <span className="italic">elegirnos</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={porqueEnVista ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 items-start p-4 rounded-xl bg-card border border-border/30 shadow-card"
              >
                <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-base md:text-lg font-medium text-foreground mb-1">{item.title}</h3>
                  <p className="font-body text-sm md:text-base text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-28" ref={faqRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqEnVista ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="font-body text-sm md:text-lg tracking-[0.3em] uppercase text-gold mb-3">FAQ</p>
            <h2 className="font-display text-2xl md:text-5xl font-semibold text-foreground">
              Preguntas <span className="italic">frecuentes</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqEnVista ? { opacity: 1, y: 0 } : {}}
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
                  <AccordionTrigger className="font-display text-base md:text-lg font-medium text-foreground hover:no-underline py-5 [&>svg]:text-gold [&>svg]:w-5 [&>svg]:h-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-base md:text-lg text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-14 bg-accent/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-semibold text-foreground mb-6">
            ¿Lista para lucir unas uñas <span className="italic gold-text">perfectas</span>?
          </h2>
          <Link
            to="/?reservar=true"
            className="inline-flex items-center gap-2 gold-gradient px-8 py-4 rounded-full font-body text-lg text-primary-foreground shadow-elevated hover:scale-105 transition-transform duration-300"
          >
            <Sparkles className="w-5 h-5" />
            Reservar Cita <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicePageLayout;
