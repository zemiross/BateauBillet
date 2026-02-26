import Icon, { type IconName } from "./ui/Icon";

type InfoCardProps = {
  icon: IconName;
  iconColor?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function InfoCard({
  icon,
  iconColor = "text-ocean-700",
  title,
  children,
  className = "",
}: InfoCardProps) {
  return (
    <div
      className={`rounded-xl border border-sand-200 bg-white p-5 shadow-[var(--shadow-card)] ${className}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg bg-ocean-50 ${iconColor}`}
        >
          <Icon name={icon} size={20} />
        </div>
        <h3 className="text-base font-bold text-sand-900">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-sand-900/70">{children}</div>
    </div>
  );
}
