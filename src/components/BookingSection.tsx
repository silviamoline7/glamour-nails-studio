/**
 * BookingSection - Sección de reserva de citas
 * Formulario multi-paso con animaciones entre pasos:
 * 1. Selección de servicio
 * 2. Fecha y hora
 * 3. Diseño de uñas (foto o personalizador)
 * 4. Datos de contacto
 * Al confirmar: confeti + mensaje de éxito.
 */
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Calendar, Clock, User, Phone, Mail, CheckCircle, Upload, Palette, Image as ImageIcon, Scissors, Sparkles } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import NailCustomizer from "./NailCustomizer";

/** Lista de servicios disponibles */
const serviciosDisponibles = [
  "Manicura Clásica",
  "Uñas de Gel",
  "Uñas Acrílicas",
  "Nail Art Premium",
  "Pedicura Spa",
  "Tratamiento Reparador",
];

/** Horarios disponibles para reservar */
const horariosDisponibles = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

/** Iconos para el indicador de pasos */
const iconosPasos = [Scissors, Clock, Palette, User];
const etiquetasPasos = ["Servicio", "Fecha y Hora", "Diseño", "Datos"];

const BookingSection = () => {
  const referencia = useRef(null);
  const enVista = useInView(referencia, { once: true, margin: "-100px" });

  const [paso, setPaso] = useState(1);
  const [datosFormulario, setDatosFormulario] = useState({
    servicio: "",
    fecha: "",
    hora: "",
    nombre: "",
    telefono: "",
    email: "",
  });
  const [modoDiseno, setModoDiseno] = useState<"ninguno" | "foto" | "personalizador">("ninguno");
  const [previsualizacionFoto, setPrevisualizacionFoto] = useState<string | null>(null);
  const [reservaConfirmada, setReservaConfirmada] = useState(false);

  /** Actualizar un campo del formulario */
  const actualizarCampo = (campo: string, valor: string) => {
    setDatosFormulario((prev) => ({ ...prev, [campo]: valor }));
  };

  /** Manejar la subida de una foto de referencia */
  const alSubirFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    if (archivo.size > 10 * 1024 * 1024) {
      toast.error("La imagen no debe superar los 10 MB");
      return;
    }
    const lector = new FileReader();
    lector.onload = () => setPrevisualizacionFoto(lector.result as string);
    lector.readAsDataURL(archivo);
  };

  /** Lanzar animación de confeti al confirmar reserva */
  const lanzarConfeti = useCallback(() => {
    const duracion = 2500;
    const fin = Date.now() + duracion;

    const cuadro = () => {
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
      if (Date.now() < fin) requestAnimationFrame(cuadro);
    };
    cuadro();

    // Explosión grande central
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#D4AC0D", "#E91E8C", "#F5B7B1", "#C0392B", "#8E44AD", "#1ABC9C"],
    });
  }, []);

  /** Confirmar la reserva */
  const confirmarReserva = () => {
    if (!datosFormulario.nombre || !datosFormulario.telefono || !datosFormulario.email) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    setReservaConfirmada(true);
    setTimeout(lanzarConfeti, 300);
    toast.success("¡Cita reservada con éxito! Te enviaremos una confirmación.");
  };

  /** Reiniciar el formulario para una nueva reserva */
  const reiniciarReserva = () => {
    setReservaConfirmada(false);
    setPaso(1);
    setModoDiseno("ninguno");
    setPrevisualizacionFoto(null);
    setDatosFormulario({ servicio: "", fecha: "", hora: "", nombre: "", telefono: "", email: "" });
  };

  const totalPasos = 4;

  /* ── Pantalla de confirmación exitosa ── */
  if (reservaConfirmada) {
    return (
      <section id="reservar" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            className="max-w-lg mx-auto text-center bg-card rounded-3xl p-10 md:p-12 shadow-elevated border border-gold/10"
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
              <p className="font-body text-lg text-foreground"><strong>Servicio:</strong> {datosFormulario.servicio}</p>
              <p className="font-body text-lg text-foreground"><strong>Fecha:</strong> {datosFormulario.fecha}</p>
              <p className="font-body text-lg text-foreground"><strong>Hora:</strong> {datosFormulario.hora}</p>
              <p className="font-body text-lg text-foreground"><strong>Cliente:</strong> {datosFormulario.nombre}</p>
            </motion.div>
            <button
              onClick={reiniciarReserva}
              className="px-6 py-3 rounded-full border border-gold/30 font-body text-lg text-foreground hover:bg-accent transition-all duration-300"
            >
              Nueva Reserva
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ── Formulario de reserva multi-paso ── */
  return (
    <section id="reservar" className="py-20 md:py-32">
      <div className="container mx-auto px-6" ref={referencia}>
        {/* ── Encabezado ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={enVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-body text-base md:text-lg tracking-[0.3em] uppercase text-gold mb-4">Reservar</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground text-balance">
            Agenda tu <span className="italic">cita</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* ── Indicador de pasos con iconos ── */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 md:mb-12">
            {Array.from({ length: totalPasos }, (_, i) => i + 1).map((numeroPaso) => {
              const IconoPaso = iconosPasos[numeroPaso - 1];
              return (
                <div key={numeroPaso} className="flex items-center gap-2">
                  <motion.div
                    animate={paso >= numeroPaso ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      paso >= numeroPaso ? "gold-gradient text-primary-foreground shadow-sm" : "bg-accent text-muted-foreground"
                    }`}
                  >
                    <IconoPaso className="w-4 h-4" />
                  </motion.div>
                  <span className="hidden sm:block font-body text-sm text-muted-foreground">
                    {etiquetasPasos[numeroPaso - 1]}
                  </span>
                  {numeroPaso < totalPasos && (
                    <div className={`w-6 sm:w-12 h-px transition-colors duration-300 ${paso > numeroPaso ? "bg-gold" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Línea decorativa dorada sobre el formulario */}
          <div className="h-px gold-gradient opacity-20 mb-8 rounded-full" />

          {/* ── Contenido del paso actual ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={paso}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
              className="bg-card rounded-3xl p-6 md:p-10 shadow-card border border-border/30"
            >
              {/* Paso 1: Selección de servicio */}
              {paso === 1 && (
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium text-foreground mb-6 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-gold" />
                    Selecciona un servicio
                  </h3>
                  <div className="grid gap-3">
                    {serviciosDisponibles.map((servicio) => (
                      <button
                        key={servicio}
                        onClick={() => { actualizarCampo("servicio", servicio); setPaso(2); }}
                        className={`p-4 min-h-[48px] rounded-xl text-left font-body text-lg transition-all duration-300 border ${
                          datosFormulario.servicio === servicio
                            ? "border-gold bg-gold/5 text-foreground"
                            : "border-border hover:border-gold/30 text-foreground hover:bg-accent"
                        }`}
                      >
                        {servicio}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Paso 2: Fecha y hora */}
              {paso === 2 && (
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium text-foreground mb-6 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-gold" />
                    Fecha y Hora
                  </h3>
                  <div className="mb-6">
                    <label className="font-body text-lg text-muted-foreground mb-2 block">Fecha</label>
                    <input
                      type="date"
                      value={datosFormulario.fecha}
                      onChange={(e) => actualizarCampo("fecha", e.target.value)}
                      className="w-full p-4 min-h-[48px] rounded-xl border border-border bg-background font-body text-lg text-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-lg text-muted-foreground mb-3 block">Hora disponible</label>
                    <div className="grid grid-cols-3 gap-3">
                      {horariosDisponibles.map((horario) => (
                        <button
                          key={horario}
                          onClick={() => actualizarCampo("hora", horario)}
                          className={`p-3 min-h-[48px] rounded-xl font-body text-base transition-all duration-300 border ${
                            datosFormulario.hora === horario
                              ? "border-gold bg-gold/5 text-foreground"
                              : "border-border hover:border-gold/30 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {horario}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button onClick={() => setPaso(1)} className="px-6 py-3 min-h-[48px] rounded-full border border-border font-body text-lg text-muted-foreground hover:bg-accent transition-all">
                      Atrás
                    </button>
                    <button
                      onClick={() => { if (datosFormulario.fecha && datosFormulario.hora) setPaso(3); else toast.error("Selecciona fecha y hora"); }}
                      className="flex-1 gold-gradient px-6 py-3 min-h-[48px] rounded-full font-body text-lg text-primary-foreground shadow-card hover:shadow-elevated transition-all"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {/* Paso 3: Diseño de uñas */}
              {paso === 3 && (
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium text-foreground mb-6 flex items-center gap-3">
                    <Palette className="w-6 h-6 text-gold" />
                    ¿Cómo quieres tus uñas?
                  </h3>

                  {/* Opciones: subir foto o personalizador */}
                  {modoDiseno === "ninguno" && (
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setModoDiseno("foto")}
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
                        onClick={() => setModoDiseno("personalizador")}
                        className="p-6 rounded-2xl border-2 border-border hover:border-gold/50 bg-accent/30 flex flex-col items-center gap-3 transition-all duration-300"
                      >
                        <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                          <Sparkles className="w-7 h-7 text-gold" />
                        </div>
                        <span className="font-display text-lg font-medium text-foreground">Personaliza tus uñas</span>
                        <span className="font-body text-sm text-muted-foreground text-center">
                          Elige colores y decoraciones interactivamente
                        </span>
                      </motion.button>
                    </div>
                  )}

                  {/* Subida de foto */}
                  {modoDiseno === "foto" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {!previsualizacionFoto ? (
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
                            onChange={alSubirFoto}
                            className="hidden"
                          />
                        </label>
                      ) : (
                        <div className="relative">
                          <img
                            src={previsualizacionFoto}
                            alt="Diseño de referencia"
                            className="w-full max-h-64 object-contain rounded-2xl border border-border"
                          />
                          <button
                            onClick={() => setPrevisualizacionFoto(null)}
                            className="absolute top-2 right-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur font-body text-sm text-foreground border border-border hover:bg-accent transition-all"
                          >
                            Cambiar foto
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => { setModoDiseno("ninguno"); setPrevisualizacionFoto(null); }}
                        className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ← Volver a opciones
                      </button>
                    </motion.div>
                  )}

                  {/* Personalizador interactivo */}
                  {modoDiseno === "personalizador" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <NailCustomizer />
                      <button
                        onClick={() => setModoDiseno("ninguno")}
                        className="mt-4 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ← Volver a opciones
                      </button>
                    </motion.div>
                  )}

                  <div className="flex gap-3 mt-8">
                    <button onClick={() => setPaso(2)} className="px-6 py-3 min-h-[48px] rounded-full border border-border font-body text-lg text-muted-foreground hover:bg-accent transition-all">
                      Atrás
                    </button>
                    <button
                      onClick={() => setPaso(4)}
                      className="flex-1 gold-gradient px-6 py-3 min-h-[48px] rounded-full font-body text-lg text-primary-foreground shadow-card hover:shadow-elevated transition-all"
                    >
                      {modoDiseno === "ninguno" ? "Omitir y continuar" : "Continuar"}
                    </button>
                  </div>
                </div>
              )}

              {/* Paso 4: Datos de contacto */}
              {paso === 4 && (
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium text-foreground mb-6 flex items-center gap-3">
                    <User className="w-6 h-6 text-gold" />
                    Tus Datos
                  </h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Nombre completo"
                        value={datosFormulario.nombre}
                        onChange={(e) => actualizarCampo("nombre", e.target.value)}
                        className="w-full pl-12 p-4 min-h-[48px] rounded-xl border border-border bg-background font-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="tel"
                        placeholder="Teléfono"
                        value={datosFormulario.telefono}
                        onChange={(e) => actualizarCampo("telefono", e.target.value)}
                        className="w-full pl-12 p-4 min-h-[48px] rounded-xl border border-border bg-background font-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={datosFormulario.email}
                        onChange={(e) => actualizarCampo("email", e.target.value)}
                        className="w-full pl-12 p-4 min-h-[48px] rounded-xl border border-border bg-background font-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button onClick={() => setPaso(3)} className="px-6 py-3 min-h-[48px] rounded-full border border-border font-body text-lg text-muted-foreground hover:bg-accent transition-all">
                      Atrás
                    </button>
                    <button
                      onClick={confirmarReserva}
                      className="flex-1 gold-gradient px-6 py-3 min-h-[48px] rounded-full font-body text-lg text-primary-foreground shadow-card hover:shadow-elevated transition-all"
                    >
                      ✨ Confirmar Reserva
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
