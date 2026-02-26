type BadgeProps = {
  variant?: "default" | "price" | "operator" | "country" | "trust";
  children: React.ReactNode;
  className?: string;
};

const variantClasses: Record<string, string> = {
  default: "bg-ocean-50 text-ocean-700 border border-ocean-100",
  price: "bg-coral-600 text-white font-bold",
  operator: "bg-sand-100 text-sand-900 border border-sand-200",
  country: "bg-ocean-100 text-ocean-800 font-medium",
  trust: "bg-teal-500/10 text-teal-600 border border-teal-500/20",
};

export default function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
