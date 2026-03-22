/**
 * SchemaMarkup - Marcado JSON-LD para negocio local
 * Mejora el SEO con datos estructurados de Google.
 */
const SchemaMarkup = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: "Lumière Nails",
    description: "Salón de uñas premium en Madrid. Manicura, pedicura y uñas de gel con los mejores profesionales.",
    url: "https://lumierenails.com",
    telephone: "+34912345678",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Gran Vía 42",
      addressLocality: "Madrid",
      addressRegion: "Madrid",
      postalCode: "28013",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.4200,
      longitude: -3.7025,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "520",
    },
    priceRange: "€€",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaMarkup;
