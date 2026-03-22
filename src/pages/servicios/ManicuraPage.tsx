/**
 * ManicuraPage - Página de detalle del servicio de Manicura
 * URL: /servicios/manicura
 * Incluye tipos de manicura, precios, FAQ y por qué elegirnos.
 */
import ServicePageLayout from "@/components/ServicePageLayout";
import serviceManicura from "@/assets/service-manicura.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const ManicuraPage = () => (
  <ServicePageLayout
    seoTitle="Manicura Profesional Madrid | Lumière Nails"
    seoDescription="Servicio de manicura profesional en Madrid Centro. Manicura clásica, francesa, japonesa y spa. Productos premium y atención personalizada."
    breadcrumbLabel="Manicura"
    heroTitle="Manicura Profesional"
    heroSubtitle="Manos perfectas con técnicas de vanguardia y los mejores productos del mercado. Cada detalle importa."
    heroImage={serviceManicura}
    heroAlt="Manicura profesional Madrid centro"
    serviceTypes={[
      {
        name: "Manicura Clásica",
        description: "Limado de uñas, cuidado de cutículas, hidratación y esmaltado tradicional con productos premium.",
        price: "€25",
        duration: "45 min",
        image: serviceManicura,
        alt: "Manicura clásica Madrid",
      },
      {
        name: "Manicura Francesa",
        description: "El clásico French con puntas blancas impecables. Elegancia atemporal para cualquier ocasión.",
        price: "€30",
        duration: "50 min",
        image: gallery1,
        alt: "Manicura francesa Madrid",
      },
      {
        name: "Manicura Japonesa",
        description: "Tratamiento nutritivo con pasta de perlas y cera de abejas. Brillo natural sin esmalte.",
        price: "€35",
        duration: "55 min",
        image: gallery6,
        alt: "Manicura japonesa Madrid",
      },
      {
        name: "Manicura Spa",
        description: "Experiencia completa con baño de parafina, exfoliación, masaje de manos y esmaltado.",
        price: "€40",
        duration: "60 min",
        image: gallery3,
        alt: "Manicura spa Madrid",
      },
    ]}
    faqs={[
      { question: "¿Cuánto dura una manicura clásica?", answer: "Una manicura clásica dura aproximadamente 45 minutos. Las opciones spa o japonesa pueden extenderse hasta 60 minutos." },
      { question: "¿Cuánto dura el esmaltado?", answer: "El esmaltado tradicional dura de 5 a 7 días con los cuidados adecuados. Recomendamos usar guantes para tareas domésticas." },
      { question: "¿Puedo traer mi propio esmalte?", answer: "¡Por supuesto! Aunque trabajamos con marcas premium como OPI, Essie y CND, eres bienvenida a traer tu esmalte favorito." },
      { question: "¿Es necesario cita previa?", answer: "Recomendamos reservar con antelación para garantizar disponibilidad, pero aceptamos clientes sin cita según disponibilidad." },
    ]}
    whyChooseUs={[
      { title: "Productos Premium", description: "Trabajamos exclusivamente con marcas de alta gama certificadas." },
      { title: "Profesionales Certificadas", description: "Nuestro equipo tiene más de 10 años de experiencia combinada." },
      { title: "Ambiente Relajante", description: "Un espacio diseñado para que disfrutes de cada momento." },
      { title: "Higiene Garantizada", description: "Esterilización completa de instrumentos entre cada cliente." },
    ]}
  />
);

export default ManicuraPage;
