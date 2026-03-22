/**
 * PedicuraPage - Página de detalle del servicio de Pedicura
 * URL: /servicios/pedicura
 */
import ServicePageLayout from "@/components/ServicePageLayout";
import servicePedicura from "@/assets/service-pedicura.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const PedicuraPage = () => (
  <ServicePageLayout
    seoTitle="Pedicura Profesional Madrid | Lumière Nails"
    seoDescription="Pedicura profesional en Madrid Centro. Pedicura clásica, spa, terapéutica y express. Tratamientos completos de pies con productos premium."
    breadcrumbLabel="Pedicura"
    heroTitle="Pedicura Profesional"
    heroSubtitle="Tus pies merecen el mejor cuidado. Relájate con nuestros tratamientos de pedicura de lujo."
    heroImage={servicePedicura}
    heroAlt="Pedicura profesional Madrid centro"
    serviceTypes={[
      {
        name: "Pedicura Clásica",
        description: "Baño de pies, limado, cuidado de cutículas, exfoliación suave y esmaltado tradicional.",
        price: "€30",
        duration: "50 min",
        image: servicePedicura,
        alt: "Pedicura clásica Madrid",
      },
      {
        name: "Pedicura Spa",
        description: "Experiencia completa con baño aromático, exfoliación profunda, mascarilla hidratante y masaje.",
        price: "€45",
        duration: "70 min",
        image: gallery4,
        alt: "Pedicura spa Madrid",
      },
      {
        name: "Pedicura Terapéutica",
        description: "Tratamiento especializado para pies cansados con reflexología podal y aceites esenciales.",
        price: "€50",
        duration: "75 min",
        image: gallery5,
        alt: "Pedicura terapéutica Madrid",
      },
      {
        name: "Pedicura Express",
        description: "Cuidado rápido y eficaz: limado, hidratación y esmaltado. Ideal para quienes van con prisa.",
        price: "€20",
        duration: "30 min",
        image: servicePedicura,
        alt: "Pedicura express Madrid",
      },
    ]}
    faqs={[
      { question: "¿Cuánto dura una pedicura spa?", answer: "La pedicura spa completa dura aproximadamente 70 minutos. Incluye baño aromático, exfoliación, mascarilla, masaje y esmaltado." },
      { question: "¿Es segura la pedicura para diabéticos?", answer: "Sí, contamos con protocolos especiales para personas con diabetes. Infórmanos al reservar para adaptar el tratamiento." },
      { question: "¿Con qué frecuencia debo hacerme una pedicura?", answer: "Recomendamos cada 3-4 semanas para mantener los pies en óptimas condiciones." },
      { question: "¿Puedo hacerme pedicura con hongos en las uñas?", answer: "Recomendamos consultar primero con un podólogo. Si hay una infección activa, ofrecemos tratamientos adaptados tras el visto bueno médico." },
    ]}
    whyChooseUs={[
      { title: "Sillones Spa Premium", description: "Disfruta de pedicura en sillones con hidromasaje y calefacción." },
      { title: "Productos Orgánicos", description: "Exfoliantes y mascarillas naturales sin químicos agresivos." },
      { title: "Esterilización Total", description: "Instrumentos esterilizados en autoclave entre cada cliente." },
      { title: "Equipo Especializado", description: "Técnicas podológicas avanzadas para el mejor cuidado de tus pies." },
    ]}
  />
);

export default PedicuraPage;
