/**
 * UnasDeGelPage - Página de detalle del servicio de Uñas de Gel
 * URL: /servicios/unas-de-gel
 */
import ServicePageLayout from "@/components/ServicePageLayout";
import serviceGel from "@/assets/service-gel.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const UnasDeGelPage = () => (
  <ServicePageLayout
    seoTitle="Uñas de Gel Madrid | Lumière Nails"
    seoDescription="Uñas de gel profesionales en Madrid Centro. Extensiones, relleno y nail art en gel. Acabado brillante y larga duración garantizada."
    breadcrumbLabel="Uñas de Gel"
    heroTitle="Uñas de Gel"
    heroSubtitle="Extensiones de gel de larga duración con acabado brillante impecable. La combinación perfecta de belleza y resistencia."
    heroImage={serviceGel}
    heroAlt="Uñas de gel profesionales Madrid"
    serviceTypes={[
      {
        name: "Gel Construcción",
        description: "Extensión completa con gel de construcción. Forma y largo personalizado según tus preferencias.",
        price: "€45",
        duration: "75 min",
        image: serviceGel,
        alt: "Uñas gel construcción Madrid",
      },
      {
        name: "Relleno de Gel",
        description: "Mantenimiento del gel existente: relleno del crecimiento, limado y esmaltado nuevo.",
        price: "€30",
        duration: "50 min",
        image: gallery2,
        alt: "Relleno gel Madrid",
      },
      {
        name: "Gel con Nail Art",
        description: "Aplicación de gel con diseños artísticos exclusivos: degradados, foil, cristales o mármol.",
        price: "€55",
        duration: "90 min",
        image: gallery5,
        alt: "Gel nail art Madrid",
      },
      {
        name: "Retirada de Gel",
        description: "Retirada profesional y segura del gel sin dañar la uña natural. Incluye hidratación.",
        price: "€15",
        duration: "30 min",
        image: serviceGel,
        alt: "Retirada gel Madrid",
      },
    ]}
    faqs={[
      { question: "¿Cuánto duran las uñas de gel?", answer: "Las uñas de gel duran entre 3 y 4 semanas. Recomendamos un relleno cada 2-3 semanas para mantenerlas perfectas." },
      { question: "¿El gel daña las uñas naturales?", answer: "No, si la aplicación y retirada las realizan profesionales. Nuestras técnicas protegen la uña natural en todo momento." },
      { question: "¿Puedo elegir la forma y largo?", answer: "¡Por supuesto! Ofrecemos formas almendra, coffin, cuadrada, ovalada y stiletto en el largo que prefieras." },
      { question: "¿Qué diferencia hay entre gel y acrílico?", answer: "El gel es más flexible y tiene un acabado más natural. El acrílico es más resistente pero menos flexible. Te asesoramos según tu estilo de vida." },
    ]}
    whyChooseUs={[
      { title: "Geles de Alta Gama", description: "Trabajamos con geles importados de las mejores marcas europeas." },
      { title: "Técnica Impecable", description: "Nuestras técnicas dominan todas las formas y estilos de uñas." },
      { title: "Durabilidad Garantizada", description: "Garantizamos que tus uñas lucirán perfectas mínimo 3 semanas." },
      { title: "Cero Daño", description: "Protocolo de protección de la uña natural en cada servicio." },
    ]}
  />
);

export default UnasDeGelPage;
