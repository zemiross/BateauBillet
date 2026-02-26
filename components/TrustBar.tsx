import Icon from "./ui/Icon";

const trustItems = [
  {
    icon: "shield" as const,
    title: "Reservation securisee",
    subtitle: "via Balearia",
  },
  {
    icon: "search" as const,
    title: "Comparaison gratuite",
    subtitle: "horaires et prix",
  },
  {
    icon: "ship" as const,
    title: "3 compagnies",
    subtitle: "Balearia, Trasmed, GNV",
  },
  {
    icon: "globe" as const,
    title: "4 pays",
    subtitle: "France, Maroc, Espagne, Algerie",
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-sand-200 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-6 md:grid-cols-4 md:gap-8">
        {trustItems.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean-50 text-ocean-700">
              <Icon name={item.icon} size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-sand-900">
                {item.title}
              </p>
              <p className="text-xs text-sand-900/50">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
