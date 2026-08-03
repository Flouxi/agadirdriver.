import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpDown,
  Calendar,
  Clock,
  Minus,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import LocationPicker from "./LocationPicker";
import { MODE_LABELS, todayIso, addDaysIso, type TripMode } from "../lib/trip";

interface SearchBarProps {
  initial?: Partial<{
    mode: TripMode;
    from: string;
    to: string;
    date: string;
    time: string;
    pax: number;
    returnDate: string;
    returnTime: string;
    hours: number;
  }>;
  /** "hero" is the large homepage bar; "compact" is used inside pages. */
  variant?: "hero" | "compact";
  submitLabel?: string;
  onSubmitted?: () => void;
}

const MODES: TripMode[] = ["transfer", "roundtrip", "hourly"];

export default function SearchBar({
  initial,
  variant = "hero",
  submitLabel = "Voir les prix",
  onSubmitted,
}: SearchBarProps) {
  const navigate = useNavigate();

  const [mode, setMode] = useState<TripMode>(initial?.mode ?? "transfer");
  const [from, setFrom] = useState(initial?.from ?? "");
  const [to, setTo] = useState(initial?.to ?? "");
  const [date, setDate] = useState(initial?.date ?? "");
  const [time, setTime] = useState(initial?.time ?? "10:00");
  const [pax, setPax] = useState(initial?.pax ?? 2);
  const [returnDate, setReturnDate] = useState(initial?.returnDate ?? "");
  const [returnTime, setReturnTime] = useState(initial?.returnTime ?? "18:00");
  const [hours, setHours] = useState(initial?.hours ?? 3);

  const [picker, setPicker] = useState<null | "from" | "to">(null);
  const [paxOpen, setPaxOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const paxRef = useRef<HTMLDivElement>(null);

  // Seed dates on the client only, so SSR markup stays deterministic.
  useEffect(() => {
    setDate((d) => d || addDaysIso(1));
    setReturnDate((d) => d || addDaysIso(8));
  }, []);

  useEffect(() => {
    if (!paxOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (paxRef.current && !paxRef.current.contains(e.target as Node)) setPaxOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPaxOpen(false);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [paxOpen]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!from) next.from = "Indiquez un lieu de départ";
    if (mode !== "hourly" && !to) next.to = "Indiquez une destination";
    if (mode !== "hourly" && from && from === to) next.to = "Le départ et l'arrivée sont identiques";
    if (!date) next.date = "Choisissez une date";
    if (!time) next.time = "Choisissez une heure";
    if (mode === "roundtrip") {
      if (!returnDate) next.returnDate = "Choisissez une date de retour";
      else if (returnDate < date) next.returnDate = "Le retour précède l'aller";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    navigate({
      to: "/reservation",
      search: {
        from,
        to: mode === "hourly" ? from : to,
        date,
        time,
        pax,
        mode,
        ...(mode === "roundtrip" ? { returnDate, returnTime } : {}),
        ...(mode === "hourly" ? { hours } : {}),
      },
    });
    onSubmitted?.();
  };

  const errorList = Object.values(errors);
  const isHero = variant === "hero";

  const segment =
    "relative flex min-w-0 flex-col justify-center gap-0.5 rounded-lg bg-muted px-4 py-3 text-left transition-colors lg:rounded-none lg:bg-transparent lg:px-5 lg:py-3.5";
  const segLabel =
    "flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase";
  const segValue = "truncate text-[15px] font-medium text-foreground";
  const divider = "lg:border-l lg:border-border";

  return (
    <>
      <LocationPicker
        open={picker !== null}
        onClose={() => setPicker(null)}
        value={picker === "from" ? from : to}
        title={picker === "from" ? "Lieu de départ" : "Lieu d'arrivée"}
        onSelect={(label) => {
          if (picker === "from") setFrom(label);
          else setTo(label);
          setErrors((prev) => {
            const { [picker ?? "from"]: _omit, ...rest } = prev;
            return rest;
          });
        }}
      />

      <form onSubmit={submit} noValidate className="w-full">
        {/* Mode tabs */}
        <div
          role="tablist"
          aria-label="Type de trajet"
          className="mb-3 inline-flex gap-1 rounded-full bg-muted p-1"
        >
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`cursor-pointer rounded-full px-4 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors ${
                mode === m
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>

        {/* The bar */}
        <div
          className={`flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0 lg:rounded-2xl lg:border lg:border-border lg:bg-background lg:p-1.5 ${
            isHero ? "lg:shadow-[0_2px_16px_rgba(0,0,0,0.06)]" : ""
          }`}
        >
          {/* From */}
          <button
            type="button"
            onClick={() => setPicker("from")}
            className={`${segment} cursor-pointer hover:bg-secondary lg:flex-[1.5] lg:rounded-xl`}
          >
            <span className={segLabel}>Départ</span>
            <span className={from ? segValue : `${segValue} text-muted-foreground`}>
              {from || "Aéroport, ville ou hôtel"}
            </span>
          </button>

          {mode !== "hourly" ? (
            <>
              {/* Swap */}
              <div className="relative flex items-center justify-center lg:w-0">
                <button
                  type="button"
                  onClick={swap}
                  aria-label="Inverser départ et arrivée"
                  className="absolute z-10 cursor-pointer rounded-full border border-border bg-background p-2 text-foreground shadow-sm transition-colors hover:bg-muted"
                >
                  <ArrowUpDown size={14} className="lg:hidden" aria-hidden="true" />
                  <ArrowRight size={14} className="hidden lg:block" aria-hidden="true" />
                </button>
              </div>

              {/* To */}
              <button
                type="button"
                onClick={() => setPicker("to")}
                className={`${segment} ${divider} cursor-pointer hover:bg-secondary lg:flex-[1.5] lg:rounded-xl lg:pl-7`}
              >
                <span className={segLabel}>Arrivée</span>
                <span className={to ? segValue : `${segValue} text-muted-foreground`}>
                  {to || "Aéroport, ville ou hôtel"}
                </span>
              </button>
            </>
          ) : (
            /* Duration */
            <div className={`${segment} ${divider} lg:flex-1 lg:rounded-xl`}>
              <span className={segLabel}>Durée</span>
              <div className="flex items-center justify-between gap-2">
                <span className={segValue}>
                  {hours} heure{hours > 1 ? "s" : ""}
                </span>
                <span className="flex items-center gap-1">
                  <Stepper
                    label="Retirer une heure"
                    icon={Minus}
                    onClick={() => setHours((h) => Math.max(2, h - 1))}
                  />
                  <Stepper
                    label="Ajouter une heure"
                    icon={Plus}
                    onClick={() => setHours((h) => Math.min(24, h + 1))}
                  />
                </span>
              </div>
            </div>
          )}

          {/* Date */}
          <label className={`${segment} ${divider} lg:flex-1 lg:rounded-xl`}>
            <span className={segLabel}>
              <Calendar size={12} aria-hidden="true" />
              Date
            </span>
            <input
              type="date"
              value={date}
              min={todayIso()}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-[15px] font-medium text-foreground focus:outline-none"
            />
          </label>

          {/* Time */}
          <label className={`${segment} ${divider} lg:w-[118px] lg:flex-none lg:rounded-xl`}>
            <span className={segLabel}>
              <Clock size={12} aria-hidden="true" />
              Heure
            </span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-transparent text-[15px] font-medium text-foreground focus:outline-none"
            />
          </label>

          {/* Passengers */}
          <div ref={paxRef} className={`relative ${divider} lg:w-[132px] lg:flex-none`}>
            <button
              type="button"
              onClick={() => setPaxOpen((v) => !v)}
              aria-haspopup="dialog"
              aria-expanded={paxOpen}
              className={`${segment} w-full cursor-pointer hover:bg-secondary lg:rounded-xl`}
            >
              <span className={segLabel}>
                <Users size={12} aria-hidden="true" />
                Passagers
              </span>
              <span className={segValue}>
                {pax} passager{pax > 1 ? "s" : ""}
              </span>
            </button>

            {paxOpen && (
              <div
                role="dialog"
                aria-label="Nombre de passagers"
                className="absolute right-0 left-0 z-30 mt-2 rounded-xl border border-border bg-popover p-4 shadow-lg lg:left-auto lg:w-64"
              >
                <div className="flex items-center justify-between gap-4">
                  <span>
                    <span className="block text-[14px] font-semibold text-foreground">
                      Passagers
                    </span>
                    <span className="block text-[12px] text-muted-foreground">
                      Bébés et enfants inclus
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <Stepper
                      label="Retirer un passager"
                      icon={Minus}
                      onClick={() => setPax((p) => Math.max(1, p - 1))}
                    />
                    <span className="w-6 text-center font-mono text-[15px] font-semibold">
                      {pax}
                    </span>
                    <Stepper
                      label="Ajouter un passager"
                      icon={Plus}
                      onClick={() => setPax((p) => Math.min(16, p + 1))}
                    />
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPaxOpen(false)}
                  className="mt-4 w-full cursor-pointer rounded-lg bg-primary py-2.5 text-[13px] font-semibold text-primary-foreground"
                >
                  Terminé
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-85 lg:my-0 lg:ml-1 lg:rounded-xl lg:py-3"
          >
            <Search size={17} aria-hidden="true" />
            {submitLabel}
          </button>
        </div>

        {/* Return leg */}
        {mode === "roundtrip" && (
          <div className="mt-2 flex flex-col gap-2 rounded-xl border border-border bg-background p-1.5 sm:flex-row sm:items-stretch sm:gap-0">
            <div className="flex items-center gap-2 px-4 py-3 text-[13px] font-semibold text-foreground">
              <ArrowRight size={14} className="rotate-180" aria-hidden="true" />
              Retour
            </div>
            <label className={`${segment} ${divider} sm:flex-1 sm:rounded-xl`}>
              <span className={segLabel}>Date de retour</span>
              <input
                type="date"
                value={returnDate}
                min={date || todayIso()}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-transparent text-[15px] font-medium text-foreground focus:outline-none"
              />
            </label>
            <label className={`${segment} ${divider} sm:w-[130px] sm:flex-none sm:rounded-xl`}>
              <span className={segLabel}>Heure</span>
              <input
                type="time"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="w-full bg-transparent text-[15px] font-medium text-foreground focus:outline-none"
              />
            </label>
            <button
              type="button"
              onClick={() => setMode("transfer")}
              aria-label="Supprimer le retour"
              className="flex cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:px-3"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Add-return shortcut */}
        {mode === "transfer" && (
          <button
            type="button"
            onClick={() => setMode("roundtrip")}
            className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
          >
            <Plus size={14} aria-hidden="true" />
            Ajouter un retour
          </button>
        )}

        {errorList.length > 0 && (
          <p role="alert" className="mt-3 text-[13px] font-medium text-destructive">
            {errorList[0]}
          </p>
        )}
      </form>
    </>
  );
}

function Stepper({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: typeof Plus;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted active:scale-95"
    >
      <Icon size={14} aria-hidden="true" />
    </button>
  );
}
