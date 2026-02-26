import Link from "next/link";
import Icon, { type IconName } from "./Icon";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: IconName;
  iconRight?: IconName;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const variantClasses: Record<string, string> = {
  primary:
    "bg-coral-600 text-white hover:bg-coral-700 active:scale-[0.98] shadow-sm",
  secondary:
    "bg-ocean-700 text-white hover:bg-ocean-600 active:scale-[0.98] shadow-sm",
  outline:
    "border-2 border-ocean-700 text-ocean-700 hover:bg-ocean-700 hover:text-white",
  ghost: "text-ocean-700 hover:bg-ocean-50",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  icon,
  iconRight,
  children,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 16 : 18} />}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
