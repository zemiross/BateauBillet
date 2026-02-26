export type IconName =
  | "anchor"
  | "clock"
  | "calendar"
  | "euro"
  | "ship"
  | "map-pin"
  | "chevron-down"
  | "chevron-right"
  | "arrow-right"
  | "external"
  | "menu"
  | "x"
  | "check"
  | "star"
  | "search"
  | "car"
  | "users"
  | "shield"
  | "compass"
  | "plus"
  | "minus"
  | "globe";

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

const paths: Record<IconName, string> = {
  anchor:
    "M12 22V8M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 6a7 7 0 0 0 14 0M5 12H2m20 0h-3",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4v6l4 2",
  calendar:
    "M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  euro: "M18 6a7 7 0 0 0-12.3 3M4 9h12M4 13h12M5.7 15A7 7 0 0 0 18 18",
  ship: "M2 21l.5-1a4 4 0 0 1 7 0l.5 1 .5-1a4 4 0 0 1 7 0l.5 1M4 16l5-11h6l5 11M6 12h12",
  "map-pin":
    "M12 2a8 8 0 0 0-8 8c0 5.4 7.05 11.5 7.35 11.76a1 1 0 0 0 1.3 0C13 21.5 20 15.4 20 10a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z",
  "chevron-down": "M6 9l6 6 6-6",
  "chevron-right": "M9 6l6 6-6 6",
  "arrow-right": "M5 12h14m-7-7 7 7-7 7",
  external: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M18 6 6 18M6 6l12 12",
  check: "M20 6 9 17l-5-5",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z",
  search: "M11 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM21 21l-4.35-4.35",
  car: "M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM3 13l1.5-6A2 2 0 0 1 6.44 6h11.12a2 2 0 0 1 1.94 1.5L21 13M3 13h18v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm11 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  shield:
    "M12 2l8 4v5c0 5.25-3.5 10-8 11.25C7.5 21 4 16.25 4 11V6l8-4Zm-1 8 2.5 2.5L18 8",
  compass:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.5 6.5-1.5 5-5 1.5 1.5-5 5-1.5Z",
  plus: "M12 5v14m-7-7h14",
  minus: "M5 12h14",
  globe:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2Z",
};

export default function Icon({ name, size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
