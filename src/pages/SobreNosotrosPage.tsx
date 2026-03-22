/**
 * SobreNosotrosPage - Página "Sobre Nosotros"
 * URL: /sobre-nosotros
 * Incluye video del local, filosofía, equipo, galería, higiene.
 */
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShieldCheck, Award, Heart, Eye } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
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
const teamMembers = [
  { name: "María García", role: "Directora & Nail Artist", image: team1, works: [gallery1, gallery2] },
  { name: "Lucía Fernández", role: "Especialista en Gel", image: team2, works: [gallery3, gallery5] },
  { name: "Ana Martínez", role: "Nail Art Premium", image: team3, works: [gallery4, gallery6] },
  { name: "Carmen López", role: "Pedicura & Spa", image: team4, works: [gallery2, gallery4] },
  { name: "Elena Ruiz", role: "Manicura Clásica", image: team5, works: [gallery1, gallery3] },
];

/** Valores de higiene */
const hygieneStandards = [
  { icon: ShieldCheck, title: "Autoclave Clase B", description: "Esterilización de grado hospitalario para todos los instrumentos metálicos." },
  { icon: Award, title: "Material Desechable", description: "Limas, buffers y palitos de naranjo de un solo uso para cada clienta." },
  { icon: Heart, title: "Productos Certificados", description: "Solo marcas con certificación sanitaria europea y libre de tóxicos." },
];

const SobreNosotrosPage = () => {
  const [openTeamMember, setOpenTeamMember] = useState<number | null>(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const hygieneRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-80px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-80px" });
  const hygieneInView = useInView(hygieneRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sobre Nosotros | Lumière Nails Madrid"
        description="Conoce al equipo de Lumière Nails. Profesionales apasionadas por la belleza de tus uñas en Madrid Centro. Higiene certificada y productos premium."
      />

      {/* Video / Imagen hero del local */}
      <section className="relative pt-28 pb-0">
        <div className="container mx-auto px-6">
          <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Sobre Nosotros" }]} />
        </div>
        <div className="mt-6 relative aspect-[21/9] max-h-[500px] overflow-hidden">
          <img
            src={salonInterior}
            alt="Interior del salón Lumière Nails Madrid"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl md:text-6xl font-semibold text-foreground"
            >
              Sobre <span className="italic gold-text">Nosotros</span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Filosofía y Misión */}
      <section className="py-20 md:py-28" ref={missionRef}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="font-body text-lg tracking-[0.3em] uppercase text-gold mb-4">Nuestra Historia</p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-8">
                Pasión por la <span className="italic">belleza</span>
              </h2>
              <p className="font-body text-xl text-muted-foreground leading-relaxed mb-6">
                Lumière Nails nació en el corazón de Madrid con una misión clara: transformar el cuidado de uñas
                en una experiencia de lujo accesible. Creemos que cada persona merece sentirse especial, y nuestras
                manos son nuestra carta de presentación al mundo.
              </p>
              <p className="font-body text-xl text-muted-foreground leading-relaxed">
                Nuestro equipo de profesionales altamente cualificadas combina técnicas artísticas con los últimos
                avances en cosmética, usando exclusivamente productos premium, cruelty-free y respetuosos con tu salud.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Galería de instalaciones */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[salonInterior, salonHygiene, salonInterior, salonHygiene].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="aspect-square rounded-xl overflow-hidden"
              >
                <img
                  src={img}
                  alt={`Instalaciones Lumière Nails Madrid ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20 md:py-28" ref={teamRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-body text-lg tracking-[0.3em] uppercase text-gold mb-4">Equipo</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
              Nuestras <span className="italic">profesionales</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                {/* Foto */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card mb-4">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role} en Lumière Nails Madrid`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-lg font-medium text-foreground">{member.name}</h3>
                <p className="font-body text-sm text-muted-foreground mb-3">{member.role}</p>

                {/* Botón ver trabajos */}
                <button
                  onClick={() => setOpenTeamMember(openTeamMember === i ? null : i)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gold/30 font-body text-sm text-gold hover:bg-gold/5 transition-all duration-300"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Ver sus trabajos
                </button>

                {/* Galería desplegable de trabajos */}
                <AnimatePresence>
                  {openTeamMember === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 grid grid-cols-2 gap-2 overflow-hidden"
                    >
                      {member.works.map((work, j) => (
                        <img
                          key={j}
                          src={work}
                          alt={`Trabajo de ${member.name} - Diseño ${j + 1}`}
                          className="w-full aspect-square object-cover rounded-lg"
                          loading="lazy"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Higiene y Esterilización */}
      <section className="py-20 md:py-28 bg-secondary/30" ref={hygieneRef}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hygieneInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-body text-lg tracking-[0.3em] uppercase text-gold mb-4">Seguridad</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
              Higiene y <span className="italic">Esterilización</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={hygieneInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <img
                src={salonHygiene}
                alt="Zona de esterilización Lumière Nails Madrid"
                className="w-full rounded-2xl shadow-card"
                loading="lazy"
              />
            </motion.div>

            <div className="space-y-6">
              {hygieneStandards.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={hygieneInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-medium text-foreground mb-1">{item.title}</h3>
                      <p className="font-body text-base text-muted-foreground">{item.description}</p>
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
