/**
 * Footer - Pie de página
 * Incluye información de contacto, horarios, enlaces rápidos
 * y enlaces a redes sociales. Columnas con animaciones escalonadas.
 * Padding inferior extra en móvil para no tapar con el CTA sticky.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

/** Icono TikTok */
const IconoTikTok = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.19a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.62z" />
  </svg>
);

/** Icono Facebook */
const IconoFacebook = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

/** Enlaces de redes sociales */
const enlacesRedesSociales = [
  { icono: Instagram, enlace: "https://instagram.com/lumierenails", etiqueta: "Instagram" },
  { icono: IconoTikTok, enlace: "https://tiktok.com/@lumierenails", etiqueta: "TikTok" },
  { icono: IconoFacebook, enlace: "https://facebook.com/lumierenails", etiqueta: "Facebook" },
];

/** Enlaces de navegación del footer */
const enlacesNavegacion = [
  { etiqueta: "Inicio", ruta: "/" },
  { etiqueta: "Diseños", ruta: "/disenos" },
  { etiqueta: "Sobre Nosotros", ruta: "/sobre-nosotros" },
  { etiqueta: "Contacto", ruta: "/contacto" },
];

const Footer = () => {
  const referencia = useRef(null);
  const enVista = useInView(referencia, { once: true, margin: "-50px" });

  return (
    <footer className="bg-charcoal py-16 pb-28 md:pb-16" ref={referencia}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* ── Marca ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={enVista ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <h3 className="font-display text-2xl font-semibold text-cream mb-4">
              Lumière <span className="text-gold">Nails</span>
            </h3>
            <p className="font-body text-base md:text-lg text-cream/60 leading-relaxed mb-6">
              El arte de la elegancia en tus manos. Cada diseño es una obra única creada con pasión y precisión.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3">
              {enlacesRedesSociales.map((red) => {
                const Icono = red.icono;
                return (
                  <a
                    key={red.etiqueta}
                    href={red.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={red.etiqueta}
                    className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold hover:scale-110 transition-all duration-300"
                  >
                    <Icono className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* ── Navegación ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={enVista ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-display text-lg font-medium text-cream mb-4">Navegación</h4>
            <div className="space-y-3">
              {enlacesNavegacion.map((enlace) => (
                <Link
                  key={enlace.ruta}
                  to={enlace.ruta}
                  className="block font-body text-base text-cream/60 hover:text-gold transition-colors duration-300"
                >
                  {enlace.etiqueta}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* ── Contacto ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={enVista ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-display text-lg font-medium text-cream mb-4">Contacto</h4>
            <div className="space-y-3">
              <p className="font-body text-base text-cream/60 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                Calle Gran Vía 42, Madrid Centro
              </p>
              <p className="font-body text-base text-cream/60 flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                +34 912 345 678
              </p>
              <p className="font-body text-base text-cream/60 flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                hola@lumierenails.com
              </p>
            </div>
          </motion.div>

          {/* ── Horarios ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={enVista ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-display text-lg font-medium text-cream mb-4">Horarios</h4>
            <div className="space-y-3">
              <p className="font-body text-base text-cream/60 flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                Lun - Sáb: 9:00 - 20:00
              </p>
              <p className="font-body text-base text-cream/60 flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                Dom: 10:00 - 17:00
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Separador dorado decorativo ── */}
        <div className="h-px gold-gradient opacity-30 mb-8" />

        <div className="text-center">
          <p className="font-body text-sm text-cream/40">
            © {new Date().getFullYear()} Lumière Nails Studio · Madrid · Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
