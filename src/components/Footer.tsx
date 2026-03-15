import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-cream mb-4">
              Lumière <span className="text-gold">Nails</span>
            </h3>
            <p className="font-body text-lg text-cream/60 leading-relaxed">
              El arte de la elegancia en tus manos. Cada diseño es una obra única creada con pasión y precisión.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-medium text-cream mb-4">Contacto</h4>
            <div className="space-y-3">
              <p className="font-body text-base text-cream/60 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                Av. Elegancia 1234, Centro
              </p>
              <p className="font-body text-base text-cream/60 flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                (555) 123-4567
              </p>
              <p className="font-body text-base text-cream/60 flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                hola@lumierenails.com
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-lg font-medium text-cream mb-4">Horarios</h4>
            <div className="space-y-3">
              <p className="font-body text-base text-cream/60 flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                Lun - Sáb: 9:00 AM - 7:00 PM
              </p>
              <p className="font-body text-base text-cream/60 flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                Dom: 10:00 AM - 5:00 PM
              </p>
              <a href="#" className="font-body text-base text-gold flex items-center gap-3 hover:text-gold-light transition-colors">
                <Instagram className="w-4 h-4 flex-shrink-0" />
                @lumierenails
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 text-center">
          <p className="font-body text-sm text-cream/40">
            © {new Date().getFullYear()} Lumière Nails Studio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
