import type { Route } from "@/data/routes";

type SchemaTripProps = {
  route: Route;
};

export default function SchemaTrip({ route }: SchemaTripProps) {
  const schema = {
    "@context": "http://schema.org",
    "@type": "Trip",
    name: `Bateau ${route.origin} ${route.destination}`,
    alternateName: [
      `Ferry ${route.origin} ${route.destination}`,
      `Traversée ${route.origin} ${route.destination}`,
    ],
    itinerary: `${route.origin} ${route.destination}`,
    provider: route.operators[0],
    description: route.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
