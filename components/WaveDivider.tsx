type WaveDividerProps = {
  color?: string;
  flip?: boolean;
  className?: string;
};

// Wave curve (y ≈ 40). Filling BELOW this line (to y=80) paints the colored band at bottom.
const PATH_FILL_BELOW =
  "M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z";
// Filling ABOVE the curve (to y=0). With scale-y-[-1], this places the color on the bottom (footer side).
const PATH_FILL_ABOVE =
  "M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z";

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
        className="block h-[40px] w-full scale-y-[-1] md:h-[60px] lg:h-[80px] rotate-180"
      >
        <path
          d={flip ? PATH_FILL_ABOVE : PATH_FILL_BELOW}
          fill={color}
        />
      </svg>
    </div>
  );
}
