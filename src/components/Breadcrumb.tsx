/**
 * Breadcrumb - Migas de pan para navegación y SEO
 * Genera marcado estructurado JSON-LD automáticamente.
 */
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  // Schema markup para breadcrumbs
  const schemaItems = items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.label,
    ...(item.href ? { item: `https://lumierenails.com${item.href}` } : {}),
  }));

  return (
    <>
      {/* JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: schemaItems,
          }),
        }}
      />

      {/* Visual breadcrumb */}
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center gap-2 font-body text-sm text-muted-foreground">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="w-3 h-3" />}
              {item.href ? (
                <Link to={item.href} className="hover:text-gold transition-colors duration-200">
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
