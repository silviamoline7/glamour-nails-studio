import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Calendar, Clock, User, Phone, Mail, CheckCircle, Upload, Palette, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import NailCustomizer from "./NailCustomizer";

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
  const [designMode, setDesignMode] = useState<"none" | "photo" | "customizer">("none");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("La imagen no debe superar los 10 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const fireConfetti = useCallback(() => {
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#D4AC0D", "#E91E8C", "#F5B7B1", "#FDFEFE", "#8E44AD"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#D4AC0D", "#E91E8C", "#F5B7B1", "#FDFEFE", "#8E44AD"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // Big burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#D4AC0D", "#E91E8C", "#F5B7B1", "#C0392B", "#8E44AD", "#1ABC9C"],
    });
  }, []);

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    setSubmitted(true);
    setTimeout(fireConfetti, 300);
    toast.success("¡Cita reservada con éxito! Te enviaremos una confirmación.");
  };

  const resetBooking = () => {
    setSubmitted(false);
    setStep(1);
    setDesignMode("none");
    setPhotoPreview(null);
    setFormData({ service: "", date: "", time: "", name: "", phone: "", email: "" });
  };

  // Total steps: 1=Service, 2=Date/Time, 3=Design, 4=Contact
  const totalSteps = 4;
  const stepLabels = ["Servicio", "Fecha y Hora", "Diseño", "Datos"];

  if (submitted) {
    return (
      <section id="reservar" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            className="max-w-lg mx-auto text-center bg-card rounded-3xl p-12 shadow-elevated"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            >
              <CheckCircle className="w-20 h-20 text-gold mx-auto mb-6" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-2">
                🎉 ¡Reserva Confirmada!
              </h3>
              <p className="font-body text-lg text-muted-foreground mb-6">
                Tu cita ha sido agendada exitosamente
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-accent/50 rounded-2xl p-6 mb-8 space-y-2 text-left"
            >
              <p className="font-body text-lg text-foreground"><strong>Servicio:</strong> {formData.service}</p>
              <p className="font-body text-lg text-foreground"><strong>Fecha:</strong> {formData.date}</p>
              <p className="font-body text-lg text-foreground"><strong>Hora:</strong> {formData.time}</p>
              <p className="font-body text-lg text-foreground"><strong>Cliente:</strong> {formData.name}</p>
            </motion.div>
            <button
              onClick={resetBooking}
              className="px-6 py-3 rounded-full border border-gold/30 font-body text-lg text-foreground hover:bg-accent transition-all duration-300"
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
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-sm transition-all duration-300 ${
                    step >= s ? "gold-gradient text-primary-foreground" : "bg-accent text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                <span className="hidden sm:block font-body text-sm text-muted-foreground">
                  {stepLabels[s - 1]}
                </span>
                {s < totalSteps && (
                  <div className={`w-6 sm:w-12 h-px transition-colors duration-300 ${step > s ? "bg-gold" : "bg-border"}`} />
                )}
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
            {/* Step 1: Service */}
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

            {/* Step 2: Date & Time */}
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

            {/* Step 3: Design */}
            {step === 3 && (
              <div>
                <h3 className="font-display text-2xl font-medium text-foreground mb-6 flex items-center gap-3">
                  <Palette className="w-6 h-6 text-gold" />
                  ¿Cómo quieres tus uñas?
                </h3>

                {designMode === "none" && (
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setDesignMode("photo")}
                      className="p-6 rounded-2xl border-2 border-border hover:border-gold/50 bg-accent/30 flex flex-col items-center gap-3 transition-all duration-300"
                    >
                      <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                        <Upload className="w-7 h-7 text-gold" />
                      </div>
                      <span className="font-display text-lg font-medium text-foreground">Subir foto de referencia</span>
                      <span className="font-body text-sm text-muted-foreground text-center">
                        Sube una imagen del diseño que te gustaría
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setDesignMode("customizer")}
                      className="p-6 rounded-2xl border-2 border-border hover:border-gold/50 bg-accent/30 flex flex-col items-center gap-3 transition-all duration-300"
                    >
                      <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                        <Palette className="w-7 h-7 text-gold" />
                      </div>
                      <span className="font-display text-lg font-medium text-foreground">Personaliza tus uñas</span>
                      <span className="font-body text-sm text-muted-foreground text-center">
                        Elige colores y decoraciones interactivamente
                      </span>
                    </motion.button>
                  </div>
                )}

                {designMode === "photo" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {!photoPreview ? (
                      <label className="flex flex-col items-center gap-4 p-10 rounded-2xl border-2 border-dashed border-gold/30 bg-accent/20 cursor-pointer hover:bg-accent/40 transition-all">
                        <ImageIcon className="w-12 h-12 text-gold/50" />
                        <span className="font-body text-lg text-muted-foreground">
                          Haz clic o arrastra una imagen aquí
                        </span>
                        <span className="font-body text-sm text-muted-foreground/60">
                          JPG, PNG o WEBP · Máx. 10 MB
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="relative">
                        <img
                          src={photoPreview}
                          alt="Diseño de referencia"
                          className="w-full max-h-64 object-contain rounded-2xl border border-border"
                        />
                        <button
                          onClick={() => setPhotoPreview(null)}
                          className="absolute top-2 right-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur font-body text-sm text-foreground border border-border hover:bg-accent transition-all"
                        >
                          Cambiar foto
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => { setDesignMode("none"); setPhotoPreview(null); }}
                      className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ← Volver a opciones
                    </button>
                  </motion.div>
                )}

                {designMode === "customizer" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <NailCustomizer />
                    <button
                      onClick={() => setDesignMode("none")}
                      className="mt-4 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ← Volver a opciones
                    </button>
                  </motion.div>
                )}

                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(2)} className="px-6 py-3 rounded-full border border-border font-body text-lg text-muted-foreground hover:bg-accent transition-all">
                    Atrás
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="flex-1 gold-gradient px-6 py-3 rounded-full font-body text-lg text-primary-foreground shadow-card hover:shadow-elevated transition-all"
                  >
                    {designMode === "none" ? "Omitir y continuar" : "Continuar"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {step === 4 && (
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
                  <button onClick={() => setStep(3)} className="px-6 py-3 rounded-full border border-border font-body text-lg text-muted-foreground hover:bg-accent transition-all">
                    Atrás
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 gold-gradient px-6 py-3 rounded-full font-body text-lg text-primary-foreground shadow-card hover:shadow-elevated transition-all"
                  >
                    ✨ Confirmar Reserva
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
