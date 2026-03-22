/**
 * ContactoPage - Página de contacto
 * URL: /contacto
 * Formulario de contacto, mapa, información y redes sociales.
 */
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Instagram } from "lucide-react";
import { toast } from "sonner";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";

const ContactoPage = () => {
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    setSubmitted(true);
    toast.success("¡Mensaje enviado! Te responderemos pronto.");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contacto | Lumière Nails Madrid"
        description="Contacta con Lumière Nails en Madrid Centro. Llámanos, escríbenos o visítanos en Calle Gran Vía 42. Horario: Lun-Sáb 9:00-20:00."
      />

      {/* Header */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6"
          >
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-4">
              <span className="italic gold-text">Contacto</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-2xl">
              ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Escríbenos o visítanos en nuestro salón.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="pb-24" ref={formRef}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {submitted ? (
                <div className="bg-card rounded-3xl p-10 shadow-card text-center">
                  <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">¡Mensaje Enviado!</h3>
                  <p className="font-body text-lg text-muted-foreground mb-6">
                    Te responderemos en un plazo máximo de 24 horas.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                    className="px-6 py-3 rounded-full border border-gold/30 font-body text-lg text-foreground hover:bg-accent transition-all"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 md:p-10 shadow-card space-y-5">
                  <h2 className="font-display text-2xl font-medium text-foreground mb-2">Escríbenos</h2>

                  <div>
                    <label className="font-body text-base text-muted-foreground mb-1.5 block">Nombre *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-4 rounded-xl border border-border bg-background font-body text-lg text-foreground focus:outline-none focus:border-gold transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="font-body text-base text-muted-foreground mb-1.5 block">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full p-4 rounded-xl border border-border bg-background font-body text-lg text-foreground focus:outline-none focus:border-gold transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="font-body text-base text-muted-foreground mb-1.5 block">Teléfono</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full p-4 rounded-xl border border-border bg-background font-body text-lg text-foreground focus:outline-none focus:border-gold transition-colors"
                      placeholder="+34 600 000 000"
                    />
                  </div>

                  <div>
                    <label className="font-body text-base text-muted-foreground mb-1.5 block">Mensaje *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full p-4 rounded-xl border border-border bg-background font-body text-lg text-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full gold-gradient py-4 rounded-full font-body text-lg text-primary-foreground shadow-card hover:shadow-elevated transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info de contacto */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display text-2xl font-medium text-foreground mb-6">Información</h2>
                <div className="space-y-5">
                  {[
                    { icon: MapPin, label: "Dirección", value: "Calle Gran Vía 42, Madrid Centro, 28013" },
                    { icon: Phone, label: "Teléfono", value: "+34 912 345 678" },
                    { icon: Mail, label: "Email", value: "hola@lumierenails.com" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="font-display text-base font-medium text-foreground">{item.label}</p>
                          <p className="font-body text-base text-muted-foreground">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg font-medium text-foreground mb-4">Horarios</h3>
                <div className="bg-card rounded-2xl p-6 shadow-card space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gold" />
                    <div>
                      <p className="font-body text-base text-foreground">Lunes - Sábado</p>
                      <p className="font-body text-sm text-muted-foreground">9:00 - 20:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gold" />
                    <div>
                      <p className="font-body text-base text-foreground">Domingo</p>
                      <p className="font-body text-sm text-muted-foreground">10:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg font-medium text-foreground mb-4">Síguenos</h3>
                <div className="flex gap-3">
                  {["Instagram", "TikTok", "Facebook"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold hover:scale-110 transition-all duration-300"
                    >
                      <Instagram className="w-5 h-5" />
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
