import Icon, { type IconName } from "./ui/Icon";

const steps: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "search",
    title: "Choisissez votre liaison",
    description:
      "Explorez les 20 liaisons ferry en Mediterranee et trouvez celle qui correspond a votre trajet.",
  },
  {
    icon: "compass",
    title: "Comparez horaires et prix",
    description:
      "Consultez les durees, frequences, compagnies et tarifs de reference pour chaque traversee.",
  },
  {
    icon: "external",
    title: "Reservez sur Balearia",
    description:
      "Finalisez votre reservation en toute securite sur le site officiel de Balearia.",
  },
];

export default function HowItWorks() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map((step, i) => (
        <div key={step.title} className="relative text-center">
          {/* Step number + icon */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-ocean-700 text-white shadow-lg">
            <Icon name={step.icon} size={28} />
          </div>

          {/* Connector line (desktop only, not on last) */}
          {i < steps.length - 1 && (
            <div
              className="absolute left-[calc(50%+40px)] top-8 hidden h-0.5 w-[calc(100%-80px)] bg-ocean-100 md:block"
              aria-hidden="true"
            />
          )}

          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-ocean-700/60">
            Etape {i + 1}
          </p>
          <h3 className="mb-2 text-lg font-bold text-sand-900">
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-sand-900/60">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
