import { useEffect, useMemo, useRef, useState } from "react";
import { Plane, Building2, Hotel, Search, X, Clock, ArrowLeft, MapPin } from "lucide-react";
import type { LocationCategory, LocationOption } from "../data/locations";
import {
  normalize,
  searchLocations,
  readRecentLocations,
  pushRecentLocation,
} from "../lib/location-search";

interface LocationPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (value: string, option: LocationOption) => void;
  title?: string;
  /** Current field value, used to prefill the query. */
  value?: string;
}

const FILTERS: { id: LocationCategory | "all"; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "airport", label: "Aéroports" },
  { id: "city", label: "Villes" },
  { id: "hotel", label: "Hôtels" },
];

const CATEGORY_ICON: Record<LocationCategory, typeof Plane> = {
  airport: Plane,
  city: Building2,
  hotel: Hotel,
};

/** Bold the matched slice of the label so scanning results is fast. */
function Highlight({ text, query }: { text: string; query: string }) {
  const q = normalize(query);
  if (!q) return <>{text}</>;
  const index = normalize(text).indexOf(q);
  if (index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-transparent font-bold text-foreground">
        {text.slice(index, index + q.length)}
      </mark>
      {text.slice(index + q.length)}
    </>
  );
}

export default function LocationPicker({
  open,
  onClose,
  onSelect,
  title = "Choisir un lieu",
  value = "",
}: LocationPickerProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<LocationCategory | "all">("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recents, setRecents] = useState<LocationOption[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset state each time the panel opens, and lock background scroll.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setFilter("all");
    setActiveIndex(0);
    setRecents(readRecentLocations());

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open, value]);

  const groups = useMemo(() => searchLocations(query, filter), [query, filter]);
  const showRecents = !query && filter === "all" && recents.length > 0;

  // Flat list drives keyboard navigation across all groups.
  const flat = useMemo<LocationOption[]>(
    () => [...(showRecents ? recents : []), ...groups.flatMap((g) => g.options)],
    [groups, recents, showRecents],
  );

  useEffect(() => setActiveIndex(0), [query, filter]);

  const commit = (option: LocationOption) => {
    pushRecentLocation(option);
    onSelect(option.label, option);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (flat.length === 0) return;
      setActiveIndex((i) => {
        const next = e.key === "ArrowDown" ? i + 1 : i - 1;
        return (next + flat.length) % flat.length;
      });
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const option = flat[activeIndex];
      if (option) commit(option);
    }
  };

  // Keep the highlighted row visible.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, flat.length]);

  if (!open) return null;

  let cursor = -1;

  return (
    <div className="fixed inset-0 z-[70] flex sm:items-center sm:justify-center sm:p-4">
      <button
        type="button"
        aria-label="Fermer"
        onClick={onClose}
        className="absolute inset-0 hidden cursor-default bg-foreground/40 sm:block"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onKeyDown={handleKeyDown}
        className="relative flex w-full flex-col bg-background sm:max-h-[80vh] sm:max-w-xl sm:rounded-2xl sm:border sm:border-border sm:shadow-2xl"
      >
        {/* Search header */}
        <div className="shrink-0 border-b border-border px-3 pt-3 pb-3 sm:px-4 sm:pt-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="-ml-1 shrink-0 cursor-pointer rounded-lg p-2 text-foreground transition-colors hover:bg-muted sm:hidden"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <h2 className="flex-1 truncate text-[17px] font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="-mr-1 hidden shrink-0 cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:block"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-3 flex items-center rounded-lg bg-muted focus-within:ring-2 focus-within:ring-ring">
            <Search size={18} className="ml-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Aéroport, ville, hôtel ou adresse"
              aria-label="Rechercher un lieu"
              autoComplete="off"
              className="w-full bg-transparent px-3 py-3.5 text-[15px] font-medium text-foreground placeholder-muted-foreground focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Effacer la recherche"
                className="mr-2 shrink-0 cursor-pointer rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-border hover:text-foreground"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-0.5">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                  filter === f.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain pb-4">
          {flat.length === 0 && (
            <div className="px-6 py-14 text-center">
              <MapPin size={22} className="mx-auto text-muted-foreground" aria-hidden="true" />
              <p className="mt-3 text-[15px] font-semibold text-foreground">Aucun lieu trouvé</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Essayez un autre nom, ou choisissez « Mon hôtel n&apos;est pas dans la liste ».
              </p>
            </div>
          )}

          {showRecents && (
            <section aria-label="Recherches récentes">
              <h3 className="px-4 pt-4 pb-1.5 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                Récent
              </h3>
              {recents.map((option) => {
                cursor += 1;
                return (
                  <Row
                    key={`recent-${option.id}`}
                    index={cursor}
                    active={cursor === activeIndex}
                    option={option}
                    query={query}
                    icon={Clock}
                    onHover={setActiveIndex}
                    onSelect={commit}
                  />
                );
              })}
            </section>
          )}

          {groups.map((group) => (
            <section key={group.category} aria-label={group.label}>
              <h3 className="px-4 pt-4 pb-1.5 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                {group.label}
              </h3>
              {group.options.map((option) => {
                cursor += 1;
                return (
                  <Row
                    key={option.id}
                    index={cursor}
                    active={cursor === activeIndex}
                    option={option}
                    query={query}
                    icon={CATEGORY_ICON[option.category]}
                    onHover={setActiveIndex}
                    onSelect={commit}
                  />
                );
              })}
            </section>
          ))}
        </div>

        <p className="hidden shrink-0 items-center justify-center gap-3 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground sm:flex">
          <span>
            <kbd className="font-mono font-semibold">↑</kbd>{" "}
            <kbd className="font-mono font-semibold">↓</kbd> naviguer
          </span>
          <span>
            <kbd className="font-mono font-semibold">Entrée</kbd> sélectionner
          </span>
          <span>
            <kbd className="font-mono font-semibold">Échap</kbd> fermer
          </span>
        </p>
      </div>
    </div>
  );
}

function Row({
  option,
  index,
  active,
  query,
  icon: Icon,
  onHover,
  onSelect,
}: {
  option: LocationOption;
  index: number;
  active: boolean;
  query: string;
  icon: typeof Plane;
  onHover: (index: number) => void;
  onSelect: (option: LocationOption) => void;
}) {
  return (
    <button
      type="button"
      data-index={index}
      onMouseMove={() => onHover(index)}
      onClick={() => onSelect(option)}
      className={`flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors ${
        active ? "bg-muted" : "bg-transparent"
      }`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
        <Icon size={16} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="truncate text-[15px] font-medium text-foreground">
            <Highlight text={option.label} query={query} />
          </span>
          {option.vip && (
            <span className="shrink-0 rounded border border-border px-1.5 py-px text-[9px] font-bold tracking-wider text-muted-foreground uppercase">
              VIP
            </span>
          )}
        </span>
        {option.sublabel && (
          <span className="mt-0.5 block truncate text-[13px] text-muted-foreground">
            {option.sublabel}
          </span>
        )}
      </span>
    </button>
  );
}
