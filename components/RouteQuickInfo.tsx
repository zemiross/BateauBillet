import Icon from "./ui/Icon";
import Badge from "./ui/Badge";

type RouteQuickInfoProps = {
  duration: string;
  frequency: string;
  priceFrom: number;
  operators: string[];
};

export default function RouteQuickInfo({
  duration,
  frequency,
  priceFrom,
  operators,
}: RouteQuickInfoProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm md:gap-6">
      <div className="flex items-center gap-2">
        <Icon name="clock" size={18} className="text-coral-500" />
        <div>
          <p className="text-xs text-white/50">Duree</p>
          <p className="text-sm font-semibold text-white">{duration}</p>
        </div>
      </div>

      <div className="hidden h-8 w-px bg-white/15 md:block" />

      <div className="flex items-center gap-2">
        <Icon name="calendar" size={18} className="text-coral-500" />
        <div>
          <p className="text-xs text-white/50">Frequence</p>
          <p className="text-sm font-semibold text-white">{frequency}</p>
        </div>
      </div>

      <div className="hidden h-8 w-px bg-white/15 md:block" />

      <div className="flex items-center gap-2">
        <Icon name="euro" size={18} className="text-coral-500" />
        <div>
          <p className="text-xs text-white/50">A partir de</p>
          <p className="text-sm font-semibold text-white">
            {priceFrom}
            <span className="font-normal">EUR</span>
          </p>
        </div>
      </div>

      <div className="hidden h-8 w-px bg-white/15 md:block" />

      <div className="flex flex-wrap gap-1.5">
        {operators.map((op) => (
          <Badge key={op} variant="operator" className="border-white/20 bg-white/10 text-white/90">
            {op}
          </Badge>
        ))}
      </div>
    </div>
  );
}
