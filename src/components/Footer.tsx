/**
 * Footer - Pie de página
 * Incluye información de contacto, horarios, enlaces rápidos
 * y enlaces a redes sociales con micro-interacciones.
 */
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

/** Icono TikTok */
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.19a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.62z" />
  </svg>
);

/** Icono Facebook */
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-charcoal py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Marca */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-cream mb-4">
              Lumière <span className="text-gold">Nails</span>
            </h3>
            <p className="font-body text-lg text-cream/60 leading-relaxed mb-6">
              El arte de la elegancia en tus manos. Cada diseño es una obra única creada con pasión y precisión.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com/lumierenails", label: "Instagram" },
                { icon: TikTokIcon, href: "https://tiktok.com/@lumierenails", label: "TikTok" },
                { icon: FacebookIcon, href: "https://facebook.com/lumierenails", label: "Facebook" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold hover:scale-110 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-display text-lg font-medium text-cream mb-4">Navegación</h4>
            <div className="space-y-3">
              {[
                { label: "Inicio", href: "/" },
                { label: "Diseños", href: "/disenos" },
                { label: "Sobre Nosotros", href: "/sobre-nosotros" },
                { label: "Contacto", href: "/contacto" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block font-body text-base text-cream/60 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
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
          </div>

          {/* Horarios */}
          <div>
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
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 text-center">
          <p className="font-body text-sm text-cream/40">
            © {new Date().getFullYear()} Lumière Nails Studio · Madrid · Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
