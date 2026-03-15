import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Clock, User, Phone, Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const services = [
  "Manicura Clásica",
  "Uñas de Gel",
  "Uñas Acrílicas",
  "Nail Art Premium",
  "Pedicura Spa",
  "Tratamiento Reparador",
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

const BookingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    setSubmitted(true);
    toast.success("¡Cita reservada con éxito! Te enviaremos una confirmación.");
  };

  if (submitted) {
    return (
      <section id="reservar" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center bg-card rounded-3xl p-12 shadow-card"
          >
            <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
            <h3 className="font-display text-3xl font-semibold text-foreground mb-4">¡Reserva Confirmada!</h3>
            <p className="font-body text-xl text-muted-foreground mb-2">{formData.service}</p>
            <p className="font-body text-lg text-muted-foreground">{formData.date} a las {formData.time}</p>
            <p className="font-body text-lg text-foreground mt-4">{formData.name}</p>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setFormData({ service: "", date: "", time: "", name: "", phone: "", email: "" }); }}
              className="mt-8 px-6 py-3 rounded-full border border-gold/30 font-body text-lg text-foreground hover:bg-accent transition-all duration-300"
            >
              Nueva Reserva
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservar" className="py-24 md:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-lg tracking-[0.3em] uppercase text-gold mb-4">Reservar</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground text-balance">
            Agenda tu <span className="italic">cita</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-sm transition-all duration-300 ${
                  step >= s ? "gold-gradient text-primary-foreground" : "bg-accent text-muted-foreground"
                }`}>
                  {s}
                </div>
                <span className="hidden sm:block font-body text-sm text-muted-foreground">
                  {s === 1 ? "Servicio" : s === 2 ? "Fecha y Hora" : "Datos"}
                </span>
                {s < 3 && <div className={`w-12 h-px transition-colors duration-300 ${step > s ? "bg-gold" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-3xl p-8 md:p-10 shadow-card"
          >
            {step === 1 && (
              <div>
                <h3 className="font-display text-2xl font-medium text-foreground mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-gold" />
                  Selecciona un servicio
                </h3>
                <div className="grid gap-3">
                  {services.map((s) => (
                    <button
                      key={s}
                      onClick={() => { updateField("service", s); setStep(2); }}
                      className={`p-4 rounded-xl text-left font-body text-lg transition-all duration-300 border ${
                        formData.service === s
                          ? "border-gold bg-gold/5 text-foreground"
                          : "border-border hover:border-gold/30 text-foreground hover:bg-accent"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-display text-2xl font-medium text-foreground mb-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-gold" />
                  Fecha y Hora
                </h3>
                <div className="mb-6">
                  <label className="font-body text-lg text-muted-foreground mb-2 block">Fecha</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className="w-full p-4 rounded-xl border border-border bg-background font-body text-lg text-foreground focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-lg text-muted-foreground mb-3 block">Hora disponible</label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => updateField("time", t)}
                        className={`p-3 rounded-xl font-body text-base transition-all duration-300 border ${
                          formData.time === t
                            ? "border-gold bg-gold/5 text-foreground"
                            : "border-border hover:border-gold/30 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full border border-border font-body text-lg text-muted-foreground hover:bg-accent transition-all">
                    Atrás
                  </button>
                  <button
                    onClick={() => { if (formData.date && formData.time) setStep(3); else toast.error("Selecciona fecha y hora"); }}
                    className="flex-1 gold-gradient px-6 py-3 rounded-full font-body text-lg text-primary-foreground shadow-card hover:shadow-elevated transition-all"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-display text-2xl font-medium text-foreground mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-gold" />
                  Tus Datos
                </h3>
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full pl-12 p-4 rounded-xl border border-border bg-background font-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full pl-12 p-4 rounded-xl border border-border bg-background font-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full pl-12 p-4 rounded-xl border border-border bg-background font-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(2)} className="px-6 py-3 rounded-full border border-border font-body text-lg text-muted-foreground hover:bg-accent transition-all">
                    Atrás
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 gold-gradient px-6 py-3 rounded-full font-body text-lg text-primary-foreground shadow-card hover:shadow-elevated transition-all"
                  >
                    Confirmar Reserva
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
