type WaveDividerProps = {
  color?: string;
  flip?: boolean;
  className?: string;
};

export default function WaveDivider({
  color = "var(--color-sand-50)",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`w-full leading-[0] ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-[40px] w-full md:h-[60px] lg:h-[80px] rotate-180"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
