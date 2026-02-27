import type { Route } from "@/data/routes";
import { SITE_URL } from "@/lib/site";

type SchemaTripProps = {
  route: Route;
  locale?: string;
};

export default function SchemaTrip({ route, locale = "fr" }: SchemaTripProps) {
  const trip = {
    "@context": "https://schema.org",
    "@type": "Trip",
    name: `Ferry ${route.origin} – ${route.destination}`,
    alternateName: [
      `Bateau ${route.origin} ${route.destination}`,
      `Traversée ${route.origin} ${route.destination}`,
    ],
    itinerary: {
      "@type": "ItemList",
      itemListElement: [
        { "@type": "Place", name: route.origin },
        { "@type": "Place", name: route.destination },
      ],
    },
    provider: {
      "@type": "Organization",
      name: route.operators[0],
    },
    description: route.description,
    url: `${SITE_URL}/${locale}${route.canonicalPath}`,
  };

  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Billet ferry ${route.origin} – ${route.destination}`,
    description: route.description,
    brand: { "@type": "Organization", name: route.operators[0] },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: route.priceFrom,
      availability: "https://schema.org/InStock",
      url: route.bookingUrl,
      validFrom: new Date().toISOString().split("T")[0],
    },
  };

  const travelAction = {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    fromLocation: { "@type": "Place", name: route.origin },
    toLocation: { "@type": "Place", name: route.destination },
    agent: { "@type": "Organization", name: route.operators[0] },
    result: {
      "@type": "Reservation",
      reservationFor: {
        "@type": "BoatTrip",
        departureBoatTerminal: { "@type": "BoatTerminal", name: route.origin },
        arrivalBoatTerminal: { "@type": "BoatTerminal", name: route.destination },
      },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Bateau Billet",
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${route.origin} – ${route.destination}`,
        item: `${SITE_URL}/${locale}${route.canonicalPath}`,
      },
    ],
  };

  const schemas = [trip, product, travelAction, breadcrumb];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
