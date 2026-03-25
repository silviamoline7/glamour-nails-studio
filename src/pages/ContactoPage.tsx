/**
 * ContactoPage - Página de contacto
 * URL: /contacto
 * Sin breadcrumb visual.
 */
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Instagram } from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";

const ContactoPage = () => {
  const referenciaFormulario = useRef(null);
  const formularioEnVista = useInView(referenciaFormulario, { once: true, margin: "-80px" });
  const [enviado, setEnviado] = useState(false);
  const [formulario, setFormulario] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });

  const alEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formulario.nombre || !formulario.email || !formulario.mensaje) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    setEnviado(true);
    toast.success("¡Mensaje enviado! Te responderemos pronto.");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contacto | Lumière Nails Madrid"
        description="Contacta con Lumière Nails en Madrid Centro. Llámanos, escríbenos o visítanos en Calle Gran Vía 42."
      />

      {/* Header */}
      <section className="pt-28 md:pt-32 pb-10">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px gold-gradient" />
              <p className="font-body text-sm tracking-[0.3em] uppercase text-gold">Contacto</p>
            </div>
            <h1 className="font-display text-3xl md:text-6xl font-semibold text-foreground mb-4">
              <span className="italic gold-text">Contacto</span>
            </h1>
            <p className="font-body text-base md:text-xl text-muted-foreground max-w-2xl">
              ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="pb-24" ref={referenciaFormulario}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={formularioEnVista ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {enviado ? (
                <div className="bg-card rounded-3xl p-10 shadow-card text-center">
                  <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">¡Mensaje Enviado!</h3>
                  <p className="font-body text-base text-muted-foreground mb-6">Te responderemos en un plazo máximo de 24 horas.</p>
                  <button
                    onClick={() => { setEnviado(false); setFormulario({ nombre: "", email: "", telefono: "", mensaje: "" }); }}
                    className="px-6 py-3 rounded-full border border-gold/30 font-body text-base text-foreground hover:bg-accent transition-all"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={alEnviar} className="bg-card rounded-3xl p-7 md:p-10 shadow-card space-y-5">
                  <h2 className="font-display text-xl md:text-2xl font-medium text-foreground mb-2">Escríbenos</h2>
                  <div>
                    <label className="font-body text-sm text-muted-foreground mb-1.5 block">Nombre *</label>
                    <input type="text" value={formulario.nombre} onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                      className="w-full p-3.5 rounded-xl border border-border bg-background font-body text-base text-foreground focus:outline-none focus:border-gold transition-colors" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="font-body text-sm text-muted-foreground mb-1.5 block">Email *</label>
                    <input type="email" value={formulario.email} onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
                      className="w-full p-3.5 rounded-xl border border-border bg-background font-body text-base text-foreground focus:outline-none focus:border-gold transition-colors" placeholder="tu@email.com" />
                  </div>
                  <div>
                    <label className="font-body text-sm text-muted-foreground mb-1.5 block">Teléfono</label>
                    <input type="tel" value={formulario.telefono} onChange={(e) => setFormulario({ ...formulario, telefono: e.target.value })}
                      className="w-full p-3.5 rounded-xl border border-border bg-background font-body text-base text-foreground focus:outline-none focus:border-gold transition-colors" placeholder="+34 600 000 000" />
                  </div>
                  <div>
                    <label className="font-body text-sm text-muted-foreground mb-1.5 block">Mensaje *</label>
                    <textarea value={formulario.mensaje} onChange={(e) => setFormulario({ ...formulario, mensaje: e.target.value })} rows={4}
                      className="w-full p-3.5 rounded-xl border border-border bg-background font-body text-base text-foreground focus:outline-none focus:border-gold transition-colors resize-none" placeholder="¿En qué podemos ayudarte?" />
                  </div>
                  <button type="submit" className="w-full gold-gradient py-3.5 rounded-full font-body text-base text-primary-foreground shadow-card hover:shadow-elevated transition-all duration-300 flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Enviar Mensaje
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info de contacto */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={formularioEnVista ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-7">
              <div>
                <h2 className="font-display text-xl md:text-2xl font-medium text-foreground mb-5">Información</h2>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Dirección", value: "Calle Gran Vía 42, Madrid Centro, 28013" },
                    { icon: Phone, label: "Teléfono", value: "+34 912 345 678" },
                    { icon: Mail, label: "Email", value: "hola@lumierenails.com" },
                  ].map((item) => {
                    const Icono = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <Icono className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="font-display text-sm font-medium text-foreground">{item.label}</p>
                          <p className="font-body text-sm text-muted-foreground">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-display text-base font-medium text-foreground mb-3">Horarios</h3>
                <div className="bg-card rounded-2xl p-5 shadow-card space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gold" />
                    <div>
                      <p className="font-body text-sm text-foreground">Lunes - Sábado</p>
                      <p className="font-body text-xs text-muted-foreground">9:00 - 20:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gold" />
                    <div>
                      <p className="font-body text-sm text-foreground">Domingo</p>
                      <p className="font-body text-xs text-muted-foreground">10:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-base font-medium text-foreground mb-3">Síguenos</h3>
                <div className="flex gap-3">
                  {["Instagram", "TikTok", "Facebook"].map((social) => (
                    <a key={social} href="#" className="w-11 h-11 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold hover:scale-110 transition-all duration-300">
                      <Instagram className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactoPage;
