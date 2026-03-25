/**
 * SobreNosotrosPage - Página "Sobre Nosotros"
 * URL: /sobre-nosotros
 * Hero inmersivo, filosofía, carrusel de instalaciones,
 * equipo creativo con carrusel, higiene.
 */
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShieldCheck, Award, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";

import salonInterior from "@/assets/salon-interior.jpg";
import salonHygiene from "@/assets/salon-hygiene.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

/** Datos del equipo */
const miembrosEquipo = [
  { nombre: "María García", rol: "Directora & Nail Artist", imagen: team1, trabajos: [gallery1, gallery2] },
  { nombre: "Lucía Fernández", rol: "Especialista en Gel", imagen: team2, trabajos: [gallery3, gallery5] },
  { nombre: "Ana Martínez", rol: "Nail Art Premium", imagen: team3, trabajos: [gallery4, gallery6] },
  { nombre: "Carmen López", rol: "Pedicura & Spa", imagen: team4, trabajos: [gallery2, gallery4] },
  { nombre: "Elena Ruiz", rol: "Manicura Clásica", imagen: team5, trabajos: [gallery1, gallery3] },
];

/** Imágenes del carrusel de instalaciones */
const imagenesInstalaciones = [salonInterior, salonHygiene, salonInterior, salonHygiene];

/** Valores de higiene */
const estandaresHigiene = [
  { icono: ShieldCheck, titulo: "Autoclave Clase B", descripcion: "Esterilización de grado hospitalario para todos los instrumentos metálicos." },
  { icono: Award, titulo: "Material Desechable", descripcion: "Limas, buffers y palitos de naranjo de un solo uso para cada clienta." },
  { icono: Heart, titulo: "Productos Certificados", descripcion: "Solo marcas con certificación sanitaria europea y libre de tóxicos." },
];

/** Hook sencillo de carrusel */
const useCarrusel = (total: number) => {
  const [indice, setIndice] = useState(0);
  const anterior = () => setIndice((prev) => (prev === 0 ? total - 1 : prev - 1));
  const siguiente = () => setIndice((prev) => (prev === total - 1 ? 0 : prev + 1));
  return { indice, anterior, siguiente };
};

const SobreNosotrosPage = () => {
  const carruselInstalaciones = useCarrusel(imagenesInstalaciones.length);
  const carruselEquipo = useCarrusel(miembrosEquipo.length);

  const misionRef = useRef(null);
  const equipoRef = useRef(null);
  const higieneRef = useRef(null);
  const misionEnVista = useInView(misionRef, { once: true, margin: "-80px" });
  const equipoEnVista = useInView(equipoRef, { once: true, margin: "-80px" });
  const higieneEnVista = useInView(higieneRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sobre Nosotros | Lumière Nails Madrid"
        description="Conoce al equipo de Lumière Nails. Profesionales apasionadas por la belleza de tus uñas en Madrid Centro."
      />

      {/* ── Hero inmersivo ── */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={salonInterior} alt="Interior del salón Lumière Nails Madrid" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        <div className="relative container mx-auto px-6 pb-10 md:pb-16 pt-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px gold-gradient" />
              <p className="font-body text-sm tracking-[0.3em] uppercase text-gold">Nosotros</p>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground">
              Sobre <span className="italic gold-text">Nosotros</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Filosofía y Misión ── */}
      <section className="py-16 md:py-28" ref={misionRef}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={misionEnVista ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="font-body text-sm md:text-lg tracking-[0.3em] uppercase text-gold mb-3">Nuestra Historia</p>
              <h2 className="font-display text-2xl md:text-5xl font-semibold text-foreground mb-8">
                Pasión por la <span className="italic">belleza</span>
              </h2>
              <p className="font-body text-base md:text-xl text-muted-foreground leading-relaxed mb-6">
                Lumière Nails nació en el corazón de Madrid con una misión clara: transformar el cuidado de uñas
                en una experiencia de lujo accesible. Creemos que cada persona merece sentirse especial.
              </p>
              <p className="font-body text-base md:text-xl text-muted-foreground leading-relaxed">
                Nuestro equipo combina técnicas artísticas con los últimos avances en cosmética,
                usando exclusivamente productos premium, cruelty-free y respetuosos con tu salud.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Carrusel de Instalaciones ── */}
      <section className="py-10 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={carruselInstalaciones.indice}
                  src={imagenesInstalaciones[carruselInstalaciones.indice]}
                  alt={`Instalaciones Lumière Nails ${carruselInstalaciones.indice + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
            </div>
            {/* Controles */}
            <button
              onClick={carruselInstalaciones.anterior}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border border-border/50 flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={carruselInstalaciones.siguiente}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border border-border/50 flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-4">
              {imagenesInstalaciones.map((_, i) => (
                <button
                  key={i}
                  onClick={() => carruselInstalaciones.siguiente()}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === carruselInstalaciones.indice ? "bg-gold w-6" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Equipo con carrusel en móvil, grid en desktop ── */}
      <section className="py-16 md:py-28" ref={equipoRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={equipoEnVista ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-14"
          >
            <p className="font-body text-sm md:text-lg tracking-[0.3em] uppercase text-gold mb-3">Equipo</p>
            <h2 className="font-display text-2xl md:text-5xl font-semibold text-foreground">
              Nuestras <span className="italic">profesionales</span>
            </h2>
          </motion.div>

          {/* Móvil: carrusel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carruselEquipo.indice}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.35 }}
                  className="text-center"
                >
                  {(() => {
                    const miembro = miembrosEquipo[carruselEquipo.indice];
                    return (
                      <>
                        <div className="aspect-[3/4] max-w-[250px] mx-auto rounded-2xl overflow-hidden shadow-card mb-4">
                          <img src={miembro.imagen} alt={`${miembro.nombre} - ${miembro.rol}`} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-display text-lg font-medium text-foreground">{miembro.nombre}</h3>
                        <p className="font-body text-sm text-muted-foreground mb-4">{miembro.rol}</p>
                        <div className="flex justify-center gap-2">
                          {miembro.trabajos.map((trabajo, j) => (
                            <img key={j} src={trabajo} alt={`Trabajo de ${miembro.nombre}`} className="w-16 h-16 rounded-lg object-cover" loading="lazy" />
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Controles del carrusel de equipo */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={carruselEquipo.anterior} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors">
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <span className="font-body text-sm text-muted-foreground">
                {carruselEquipo.indice + 1} / {miembrosEquipo.length}
              </span>
              <button onClick={carruselEquipo.siguiente} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors">
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {miembrosEquipo.map((miembro, i) => (
              <motion.div
                key={miembro.nombre}
                initial={{ opacity: 0, y: 30 }}
                animate={equipoEnVista ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card mb-4 group-hover:shadow-elevated transition-shadow duration-300">
                  <img
                    src={miembro.imagen}
                    alt={`${miembro.nombre} - ${miembro.rol} en Lumière Nails Madrid`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-lg font-medium text-foreground">{miembro.nombre}</h3>
                <p className="font-body text-sm text-muted-foreground">{miembro.rol}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Higiene y Esterilización ── */}
      <section className="py-16 md:py-28 bg-secondary/30" ref={higieneRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={higieneEnVista ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="font-body text-sm md:text-lg tracking-[0.3em] uppercase text-gold mb-3">Seguridad</p>
            <h2 className="font-display text-2xl md:text-5xl font-semibold text-foreground">
              Higiene y <span className="italic">Esterilización</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={higieneEnVista ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-card"
            >
              <img src={salonHygiene} alt="Zona de esterilización Lumière Nails Madrid" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>

            <div className="space-y-5">
              {estandaresHigiene.map((item, i) => {
                const Icono = item.icono;
                return (
                  <motion.div
                    key={item.titulo}
                    initial={{ opacity: 0, x: 30 }}
                    animate={higieneEnVista ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="flex gap-4 items-start p-4 rounded-xl bg-card border border-border/30 shadow-card"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icono className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-base md:text-lg font-medium text-foreground mb-1">{item.titulo}</h3>
                      <p className="font-body text-sm md:text-base text-muted-foreground">{item.descripcion}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobreNosotrosPage;
