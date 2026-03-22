/**
 * Navbar - Barra de navegación principal
 * Incluye menú desplegable de servicios con mini-imágenes,
 * botón CTA "Reservar Cita" destacado, y versión mobile responsive.
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Mini-imágenes para el dropdown de servicios
import serviceManicura from "@/assets/service-manicura.jpg";
import servicePedicura from "@/assets/service-pedicura.jpg";
import serviceGel from "@/assets/service-gel.jpg";

/** Submenú de servicios con imagen, nombre y ruta */
const serviceLinks = [
  { label: "Manicura", href: "/servicios/manicura", image: serviceManicura, alt: "Manicura profesional Madrid" },
  { label: "Pedicura", href: "/servicios/pedicura", image: servicePedicura, alt: "Pedicura spa Madrid" },
  { label: "Uñas de Gel", href: "/servicios/unas-de-gel", image: serviceGel, alt: "Uñas de gel Madrid" },
];

/** Links principales del menú */
const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "#", hasDropdown: true },
  { label: "Diseños", href: "/disenos" },
  { label: "Sobre Nosotros", href: "/sobre-nosotros" },
  { label: "Contacto", href: "/contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú mobile al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  // Cerrar dropdown desktop al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-card py-3" : "py-6"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="font-display text-2xl font-semibold tracking-wide text-foreground">
            Lumière <span className="gold-text">Nails</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                /* Dropdown de Servicios */
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex items-center gap-1 font-body text-lg text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 glass rounded-2xl shadow-elevated border border-border/50 overflow-hidden"
                      >
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.href}
                            to={service.href}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center gap-4 px-5 py-4 hover:bg-accent/50 transition-colors duration-200 group"
                          >
                            <img
                              src={service.image}
                              alt={service.alt}
                              className="w-14 h-14 rounded-xl object-cover shadow-card group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <span className="font-display text-base font-medium text-foreground group-hover:text-gold transition-colors duration-200">
                              {service.label}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Link normal */
                <Link
                  key={link.label}
                  to={link.href}
                  className={`font-body text-lg transition-colors duration-300 ${
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Botón CTA Reservar */}
            <Link
              to="/#reservar"
              className="gold-gradient px-6 py-2.5 rounded-full font-body text-lg text-primary-foreground shadow-card hover:shadow-elevated transition-all duration-300"
            >
              Reservar Cita
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-border overflow-hidden"
            >
              <div className="flex flex-col items-center gap-2 py-6">
                {navLinks.map((link) =>
                  link.hasDropdown ? (
                    <div key={link.label} className="w-full px-6">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex items-center justify-center gap-2 w-full py-3 font-body text-xl text-foreground"
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2 pb-2"
                          >
                            {serviceLinks.map((service) => (
                              <Link
                                key={service.href}
                                to={service.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent/50 transition-colors"
                              >
                                <img
                                  src={service.image}
                                  alt={service.alt}
                                  className="w-12 h-12 rounded-lg object-cover"
                                  loading="lazy"
                                />
                                <span className="font-display text-base font-medium text-foreground">
                                  {service.label}
                                </span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="font-body text-xl text-foreground py-2"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile sticky CTA button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 glass border-t border-border/50">
        <Link
          to="/#reservar"
          className="block w-full gold-gradient py-3.5 rounded-full font-body text-lg text-primary-foreground text-center shadow-elevated"
        >
          Reservar Cita
        </Link>
      </div>
    </>
  );
};

export default Navbar;
