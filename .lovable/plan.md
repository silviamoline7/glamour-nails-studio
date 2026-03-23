

# Plan: Mejorar estética, animaciones al scroll y experiencia móvil

## Resumen
Mejorar visualmente todas las secciones de la página de inicio con animaciones de entrada al hacer scroll, optimizar el diseño móvil (conflicto botón reservar/chatbot), traducir variables al español y hacer el código más legible.

---

## 1. Traducir variables al español + comentarios descriptivos

**Todos los componentes principales** - Renombrar variables, constantes y funciones internas:
- `scrolled` → `haScrolleado`, `mobileOpen` → `menuMovilAbierto`, `servicesOpen` → `serviciosAbierto`
- `serviceLinks` → `enlacesServicios`, `navLinks` → `enlacesNavegacion`
- `trustItems` → `elementosConfianza`, `treatments` → `tratamientos`, `testimonials` → `testimonios`
- `formData` → `datosFormulario`, `step` → `paso`, `submitted` → `enviado`
- `quickReplies` → `respuestasRapidas`, `botResponses` → `respuestasBot`
- `NAIL_COLORS` → `COLORES_UNAS`, `DECORATIONS` → `DECORACIONES`
- `nails` → `unas`, `selectedNail` → `unaSeleccionada`
- Funciones: `sendMessage` → `enviarMensaje`, `handleSubmit` → `confirmarReserva`, `fireConfetti` → `lanzarConfeti`

Añadir comentarios en español en cada sección y función.

---

## 2. Arreglar conflicto móvil: botón reservar + chatbot

**ChatBot.tsx**: Mover el botón flotante a `bottom-24 md:bottom-6` para que quede por encima del CTA sticky de reservar en móvil. Ajustar la ventana del chat a `bottom-40 md:bottom-24`.

**Footer.tsx**: Añadir `pb-24 md:pb-0` para que el contenido del footer no quede oculto tras el botón sticky.

---

## 3. Animaciones de entrada al hacer scroll (todos los componentes)

Usar `framer-motion` con `useInView` para que cada sección y sus elementos individuales aparezcan con animaciones escalonadas al entrar en el viewport:

- **HeroSection**: Ya tiene animaciones de entrada, se mantienen. Añadir una animación suave de paralaje en la imagen de fondo.
- **TrustBar**: Cada item entra con `fade-up` + ligero `scale` escalonado (delay 0.1s entre items).
- **TreatmentsPreview**: Las cards entran con `fade-up` escalonado + la imagen tiene un zoom suave al entrar. Añadir efecto de revelación (clip-path o opacity) en las imágenes.
- **TestimonialsSection**: La card central entra con `scale` + `fade`. Las estrellas aparecen una a una con delay.
- **BookingSection**: El formulario entra con `slide-up` + cada paso tiene transición lateral animada.
- **FAQSection**: Cada item del acordeón entra escalonado desde abajo con `stagger` de 0.08s.
- **SocialSection**: Los iconos entran uno a uno con `bounce` suave.
- **Footer**: Columnas entran escalonadas de izquierda a derecha.

---

## 4. Mejoras estéticas de cada sección (mobile-first)

### HeroSection
- Móvil: `text-4xl` (ahora `text-5xl`), padding `pt-24` (ahora `pt-32`)
- Botones CTA apilados verticalmente: `flex-col sm:flex-row`
- Gradiente de overlay más envolvente en móvil: `from-background/98 via-background/80`
- Añadir una línea decorativa dorada sutil entre el subtítulo y el H1

### TrustBar
- Móvil: layout vertical con separadores dorados entre items
- Iconos más grandes (`w-14 h-14`) con un efecto de brillo dorado sutil
- Fondo con patrón decorativo sutil (un gradiente radial dorado muy tenue)

### TreatmentsPreview
- Móvil: imágenes con ratio `aspect-[3/2]` en vez de `aspect-[4/5]` para no ocupar tanta altura
- Añadir un borde dorado sutil al hover de las cards
- Mejorar la transición del overlay con un gradiente dorado en la parte inferior
- Espaciado más compacto en móvil

### TestimonialsSection
- Reducir texto del blockquote en móvil (`text-lg` en vez de `text-xl`)
- Botones de navegación más grandes en táctil (`w-12 h-12`)
- Añadir comillas decorativas doradas grandes como elemento visual
- Fondo de la card con un borde dorado sutil

### BookingSection
- Inputs con tamaño táctil mínimo 48px
- Steps indicator: mostrar iconos en los círculos de progreso en vez de solo números
- Transiciones más suaves entre pasos con `AnimatePresence`
- Decoración: línea dorada decorativa encima del formulario

### FAQSection
- Items del acordeón con hover dorado sutil
- Icono de la flecha más estilizado, con color dorado
- Decoración: un icono decorativo de interrogación dorado junto al título

### SocialSection
- Iconos más grandes (`w-20 h-20`) con efecto glow dorado al hover
- Añadir el nombre de la red social visible debajo
- Fondo con gradiente sutil que conecte con el footer

### Footer
- Separador dorado decorativo entre el contenido y el copyright
- Hover dorado más pronunciado en los enlaces
- Padding inferior extra en móvil para el CTA sticky (`pb-28`)

---

## Archivos a modificar

| Archivo | Cambios |
|---|---|
| `Navbar.tsx` | Traducir variables, ajustar botón sticky móvil |
| `HeroSection.tsx` | Traducir, mejorar responsive, animación paralaje |
| `TrustBar.tsx` | Traducir, rediseño móvil vertical, animaciones |
| `TreatmentsPreview.tsx` | Traducir, ratio imágenes móvil, animaciones stagger |
| `TestimonialsSection.tsx` | Traducir, comillas decorativas, botones táctiles |
| `BookingSection.tsx` | Traducir, iconos en steps, transiciones mejoradas |
| `NailCustomizer.tsx` | Traducir variables |
| `FAQSection.tsx` | Traducir, animaciones stagger en items |
| `SocialSection.tsx` | Traducir, iconos más grandes, efecto glow |
| `ChatBot.tsx` | Traducir, mover posición en móvil |
| `Footer.tsx` | Traducir, separador dorado, padding móvil |

