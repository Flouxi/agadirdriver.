import { z } from "zod";

export type TripMode = "transfer" | "roundtrip" | "hourly";

const isoDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const todayIso = () => isoDate(new Date());

export const addDaysIso = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return isoDate(d);
};

/** Shared query-string contract for /reservation and /checkout. */
export const tripSearchSchema = z.object({
  from: z.string().catch("").default(""),
  to: z.string().catch("").default(""),
  date: z.string().catch("").default(""),
  time: z.string().catch("10:00").default("10:00"),
  pax: z.coerce.number().int().min(1).max(16).catch(2).default(2),
  mode: z.enum(["transfer", "roundtrip", "hourly"]).catch("transfer").default("transfer"),
  returnDate: z.string().optional(),
  returnTime: z.string().optional(),
  hours: z.coerce.number().int().min(2).max(24).optional(),
});

export type TripSearch = z.infer<typeof tripSearchSchema>;

export const checkoutSearchSchema = tripSearchSchema.extend({
  vehicleId: z.string().catch("standard").default("standard"),
  price: z.coerce.number().min(0).catch(0).default(0),
});

export type CheckoutSearch = z.infer<typeof checkoutSearchSchema>;

/* ----------------------------- formatting ----------------------------- */

export function formatDateFr(iso: string, style: "long" | "short" = "long") {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR",
    style === "long"
      ? { weekday: "long", day: "numeric", month: "long", year: "numeric" }
      : { weekday: "short", day: "numeric", month: "short" },
  );
}

/** Add a decimal number of hours to a "HH:MM" string. */
export function addHours(time: string, hoursDecimal: number) {
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return time;
  const total = h * 60 + m + Math.round(hoursDecimal * 60);
  return `${String(Math.floor((total / 60) % 24)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** Absolute deadline, N hours before the pickup, in French prose. */
export function deadlineBefore(dateIso: string, time: string, hoursBefore: number) {
  if (!dateIso) return "";
  const d = new Date(`${dateIso}T${time || "00:00"}:00`);
  if (Number.isNaN(d.getTime())) return "";
  d.setHours(d.getHours() - hoursBefore);
  return `${d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} à ${String(
    d.getHours(),
  ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function formatDuration(hoursDecimal: number) {
  const total = Math.round(hoursDecimal * 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
}

/** Average road speed used for the indicative trip duration. */
export const estimateDurationHours = (distanceKm: number) =>
  Math.max(0.25, distanceKm / 62 + 0.15);

export const formatEur = (value: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);

/** Short city/region label derived from a location name. */
export function shortRegion(label: string) {
  const map: [RegExp, string][] = [
    [/taghazout|tamraght|anza/i, "Taghazout, Maroc"],
    [/agadir/i, "Agadir, Maroc"],
    [/marrakech/i, "Marrakech, Maroc"],
    [/casablanca/i, "Casablanca, Maroc"],
    [/essaouira/i, "Essaouira, Maroc"],
    [/taroudant/i, "Taroudant, Maroc"],
    [/fès|fes/i, "Fès, Maroc"],
    [/tanger/i, "Tanger, Maroc"],
    [/rabat/i, "Rabat, Maroc"],
    [/ouarzazate/i, "Ouarzazate, Maroc"],
    [/merzouga/i, "Sahara, Maroc"],
    [/chefchaouen/i, "Rif, Maroc"],
  ];
  return map.find(([re]) => re.test(label))?.[1] ?? "Maroc";
}

export const MODE_LABELS: Record<TripMode, string> = {
  transfer: "Aller simple",
  roundtrip: "Aller-retour",
  hourly: "À l'heure",
};
