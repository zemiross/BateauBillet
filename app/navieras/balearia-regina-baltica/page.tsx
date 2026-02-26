import type { Metadata } from "next";
import BookingCTA from "@/components/BookingCTA";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Balearia Regina Baltica: navire et services",
  description:
    "Informations sur le navire Regina Baltica, ses services a bord et les liaisons associees.",
  alternates: {
    canonical: `${SITE_URL}/navieras/balearia-regina-baltica`,
  },
};

export default function BaleariaReginaBalticaPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">Balearia Regina Baltica</h1>
      <p className="leading-relaxed text-sand-900/70">
        Le Regina Baltica est utilise selon les saisons sur certaines liaisons long courrier.
        Verifiez les rotations et services proposes au moment de reserver.
      </p>
      <BookingCTA />
      <Breadcrumb
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Navieras", href: "/navieras/balearia" },
          {
            name: "Balearia Regina Baltica",
            href: "/navieras/balearia-regina-baltica",
          },
        ]}
      />
    </div>
  );
}
