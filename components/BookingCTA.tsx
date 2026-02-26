import { BOOKING_URL } from "@/lib/site";
import Button from "./ui/Button";

type BookingCTAProps = {
  label?: string;
  className?: string;
};

export default function BookingCTA({
  label = "Voir les horaires et prix",
  className = "",
}: BookingCTAProps) {
  return (
    <Button
      href={BOOKING_URL}
      external
      variant="primary"
      size="lg"
      iconRight="external"
      className={className}
    >
      {label}
    </Button>
  );
}
