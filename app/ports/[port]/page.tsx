import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import BookingCTA from "@/components/BookingCTA";
import Breadcrumb from "@/components/Breadcrumb";
import RouteCard from "@/components/RouteCard";
import {
  getPortNameBySlug,
  getPortsWithSlugs,
  getRoutesFromPort,
} from "@/lib/routes-utils";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ port: string }>;
};

export async function generateStaticParams() {
  return getPortsWithSlugs().map((p) => ({ port: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { port } = await params;
  const portName = getPortNameBySlug(port);
  if (!portName) {
    return { title: `${SITE_NAME} - Port introuvable`, robots: { index: false, follow: false } };
  }
  const canonical = `${SITE_URL}/ports/${port}`;
  return {
    title: `Port de ${portName} : ferry, horaires et traversées`,
    description: `Traversées au départ et à l'arrivée du port de ${portName}. Horaires, prix et réservation des billets ferry vers l'Espagne, le Maroc, l'Algérie et la France.`,
    alternates: { canonical },
    openGraph: {
      locale: "fr_FR",
      type: "website",
      title: `Port de ${portName} : ferry et traversées`,
      description: `Horaires et tarifs des ferries au départ ou à l'arrivée de ${portName}.`,
      url: canonical,
      siteName: SITE_NAME,
    },
    robots: { index: true, follow: true },
  };
}

export default async function PortPage({ params }: PageProps) {
  const { port } = await params;
  const portName = getPortNameBySlug(port);
  if (!portName) notFound();

  const portRoutes = getRoutesFromPort(portName);
  const departures = portRoutes.filter((r) => r.origin === portName);
  const arrivals = portRoutes.filter((r) => r.destination === portName);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <h1 className="mb-4 text-3xl font-bold text-sand-900 md:text-4xl">
        Port de {portName} : ferry, horaires et traversées
      </h1>
      <p className="mb-8 max-w-2xl text-lg leading-relaxed text-sand-900/70">
        Retrouvez toutes les liaisons ferry au départ ou à l&apos;arrivée du port
        de {portName}. Comparez horaires, tarifs et compagnies pour réserver
        votre billet.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          Traversées au départ du port de {portName}
        </h2>
        {departures.length > 0 ? (
          <AnimatedSection>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {departures.map((route) => (
                <RouteCard key={route.canonicalPath} route={route} />
              ))}
            </div>
          </AnimatedSection>
        ) : (
          <p className="text-sand-900/60">
            Aucune traversée au départ de {portName} sur les lignes référencées.
          </p>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          Traversées à l&apos;arrivée au port de {portName}
        </h2>
        {arrivals.length > 0 ? (
          <AnimatedSection>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {arrivals.map((route) => (
                <RouteCard key={route.canonicalPath} route={route} />
              ))}
            </div>
          </AnimatedSection>
        ) : (
          <p className="text-sand-900/60">
            Aucune traversée à l&apos;arrivée à {portName} sur les lignes
            référencées.
          </p>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          Accès et informations port de {portName}
        </h2>
        <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-[var(--shadow-card)]">
          <h3 className="mb-2 text-lg font-semibold text-sand-900">
            Réserver un ferry depuis ou vers {portName}
          </h3>
          <p className="mb-4 text-sand-900/70">
            Les horaires et tarifs varient selon la saison et la compagnie.
            Arrivez au port en avance pour l&apos;enregistrement (environ 90 min
            passager, 2 h avec véhicule). Vérifiez les formalités et documents
            avant le départ.
          </p>
          <BookingCTA />
        </div>
      </section>

      <Breadcrumb
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Ports", href: "/" },
          { name: `Port de ${portName}`, href: `/ports/${port}` },
        ]}
      />
    </div>
  );
}
