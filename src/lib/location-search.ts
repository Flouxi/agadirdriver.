import { ALL_LOCATIONS, type LocationCategory, type LocationOption } from "../data/locations";

/** Strip accents + lowercase so "aeroport" matches "Aéroport". */
export const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/**
 * Rank a location against a query.
 * Higher is better; 0 means "no match".
 */
function score(option: LocationOption, query: string): number {
  const label = normalize(option.label);
  const sublabel = normalize(option.sublabel ?? "");
  let best = 0;

  if (label.startsWith(query)) best = 100;
  else if (label.split(/[\s(\-,/]+/).some((word) => word.startsWith(query))) best = 80;
  else if (label.includes(query)) best = 60;
  else if (sublabel.startsWith(query)) best = 40;
  else if (sublabel.includes(query)) best = 25;
  else return 0;

  // Airports are the most common intent for a transfer service.
  if (option.category === "airport") best += 6;
  if (option.vip) best += 3;
  // Prefer shorter, more precise labels among equal matches.
  return best - Math.min(label.length, 60) / 100;
}

export interface LocationGroup {
  category: LocationCategory;
  label: string;
  options: LocationOption[];
}

export const CATEGORY_LABELS: Record<LocationCategory, string> = {
  airport: "Aéroports",
  city: "Villes",
  hotel: "Hôtels & résidences",
};

const CATEGORY_ORDER: LocationCategory[] = ["airport", "city", "hotel"];

/**
 * Search the catalog and return results grouped by category.
 * With no query, returns a curated shortlist so the panel is never empty.
 */
export function searchLocations(
  rawQuery: string,
  filter: LocationCategory | "all",
  limitPerGroup = 6,
): LocationGroup[] {
  const query = normalize(rawQuery);
  const pool = filter === "all" ? ALL_LOCATIONS : ALL_LOCATIONS.filter((l) => l.category === filter);

  const matched = query
    ? pool
        .map((option) => ({ option, rank: score(option, query) }))
        .filter((x) => x.rank > 0)
        .sort((a, b) => b.rank - a.rank)
        .map((x) => x.option)
    : pool.filter((option) => option.category === "airport" || option.vip || isPopular(option));

  const perGroup = query ? limitPerGroup : limitPerGroup + 2;

  return CATEGORY_ORDER.filter((c) => filter === "all" || filter === c)
    .map((category) => ({
      category,
      label: CATEGORY_LABELS[category],
      options: matched.filter((o) => o.category === category).slice(0, perGroup),
    }))
    .filter((group) => group.options.length > 0);
}

const POPULAR_IDS = new Set([
  "c-agadir",
  "c-marrakech",
  "c-essaouira",
  "h-fairmont-taghazout",
  "h-hilton-taghazout",
  "h-sofitel-thalassa",
  "h-taghazout-pharmacy",
  "h-hotel-not-listed",
]);

const isPopular = (option: LocationOption) => POPULAR_IDS.has(option.id);

/* ------------------------------------------------------------------ */
/* Recent searches — small convenience cache, not application data.   */
/* ------------------------------------------------------------------ */

const RECENTS_KEY = "agadirdriver.recent-locations";
const MAX_RECENTS = 4;

export function readRecentLocations(): LocationOption[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENTS_KEY);
    if (!raw) return [];
    const ids: unknown = JSON.parse(raw);
    if (!Array.isArray(ids)) return [];
    return ids
      .map((id) => ALL_LOCATIONS.find((l) => l.id === id))
      .filter((l): l is LocationOption => Boolean(l))
      .slice(0, MAX_RECENTS);
  } catch {
    return [];
  }
}

export function pushRecentLocation(option: LocationOption) {
  if (typeof window === "undefined") return;
  try {
    const current = readRecentLocations().filter((l) => l.id !== option.id);
    const ids = [option.id, ...current.map((l) => l.id)].slice(0, MAX_RECENTS);
    window.localStorage.setItem(RECENTS_KEY, JSON.stringify(ids));
  } catch {
    /* storage unavailable (private mode) — recents are optional */
  }
}
