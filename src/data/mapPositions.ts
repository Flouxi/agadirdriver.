// Custom map coordinate system. viewBox is 800 x 1000 (portrait).
// To add a new location, just append its label + x/y here — no other code change needed.
// x = 0 (west/ocean) → 800 (east). y = 0 (north) → 1000 (south).

import { findLocationByLabel } from './locations';

export const MAP_VIEW_BOX = { width: 800, height: 1000 };

export type MapPoint = { x: number; y: number };

export const MAP_POSITIONS: Record<string, MapPoint> = {
  // Airports
  "Aéroport Agadir Al Massira (AGA)": { x: 103, y: 893 },
  "Aéroport Agadir-Al Massira (AGA)": { x: 103, y: 893 },
  "Aéroport Marrakech Ménara (RAK)": { x: 279, y: 709 },
  "Aéroport Marrakech-Ménara (RAK)": { x: 279, y: 709 },
  "Aéroport Casablanca Mohammed V (CMN)": { x: 331, y: 445 },
  "Aéroport Casablanca-Mohammed V (CMN)": { x: 331, y: 445 },
  "Aéroport Essaouira Mogador (ESU)": { x: 87, y: 740 },
  "Aéroport Essaouira-Mogador (ESU)": { x: 87, y: 740 },
  "Aéroport Fès Saïss (FEZ)": { x: 636, y: 361 },
  "Aéroport Tanger Ibn Battouta (TNG)": { x: 526, y: 91 },
  "Aéroport Rabat-Salé (RBA)": { x: 429, y: 342 },
  "Aéroport Ouarzazate (OZZ)": { x: 411, y: 809 },

  // Cities
  "Agadir Centre-Ville": { x: 97, y: 886 },
  "Agadir Centre-Ville (Hôtel / Adresse de votre choix)": { x: 97, y: 886 },
  "Founty / Agadir Beach": { x: 92, y: 890 },
  "Agadir Marina": { x: 91, y: 874 },
  "Anza": { x: 82, y: 861 },
  "Aourir / Banana Village": { x: 84, y: 849 },
  "Tamraght": { x: 86, y: 840 },
  "Taghazout": { x: 88, y: 862 },
  "Taghazout Bay": { x: 88, y: 862 },
  "Imi Ouaddar": { x: 90, y: 830 },
  "Inezgane": { x: 107, y: 904 },
  "Aït Melloul": { x: 114, y: 919 },
  "Dcheira El Jihadia": { x: 105, y: 902 },
  "Drarga": { x: 116, y: 886 },
  "Biougra": { x: 137, y: 938 },
  "Paradise Valley": { x: 125, y: 814 },
  "Marrakech Centre-Ville": { x: 286, y: 706 },
  "Marrakech Centre-Ville (Riad / Hôtel)": { x: 286, y: 706 },
  "Casablanca Centre-Ville": { x: 331, y: 414 },
  "Essaouira Médina": { x: 78, y: 724 },
  "Taroudant Centre": { x: 181, y: 879 },
  Taroudant: { x: 181, y: 879 },
  "Rabat Centre-Ville": { x: 418, y: 347 },
  "Fès Médina": { x: 633, y: 345 },
  "Tanger Centre-Ville": { x: 536, y: 86 },
  Chefchaouen: { x: 603, y: 175 },
  Ouarzazate: { x: 410, y: 812 },
  "Merzouga (Dunes)": { x: 749, y: 785 },

  // Hotels / Resorts
  "Taghazout (Hôtel / Surf Camp)": { x: 88, y: 862 },
  "Taghazout Bay Resort": { x: 88, y: 862 },
  "Paradis du Surf": { x: 88, y: 862 },
  "Hyatt Place Taghazout Bay": { x: 88, y: 862 },
  "Fairmont Taghazout Bay": { x: 88, y: 862 },
  "Hyatt Regency Taghazout Bay": { x: 88, y: 862 },
  "Sofitel Agadir Thalassa Sea & Spa": { x: 93, y: 889 },
  "Riu Tikida Beach": { x: 95, y: 887 },
  "La Mamounia": { x: 284, y: 707 },
  "Royal Mansour Marrakech": { x: 283, y: 706 },
  "Four Seasons Marrakech": { x: 280, y: 703 },
};

export function getMapPosition(label: string): MapPoint {
  const hit = MAP_POSITIONS[label];
  if (hit) return hit;
  // Fallback: try loose match on prefix (handles minor typo variants)
  const key = Object.keys(MAP_POSITIONS).find(
    (k) => k.toLowerCase() === label.trim().toLowerCase(),
  );
  if (key) return MAP_POSITIONS[key];
  // Default to Agadir center so the map still renders
  return { x: 100, y: 890 };
}

/* ------------------------------------------------------------------ */
/* Real-world lat/lng coordinates for the same set of locations,      */
/* used by the Leaflet-based RouteMap for accurate map rendering.     */
/* ------------------------------------------------------------------ */

export type LatLng = { lat: number; lng: number };

export const LATLNG_POSITIONS: Record<string, LatLng> = {
  // Airports
  "Aéroport Agadir Al Massira (AGA)": { lat: 30.3811, lng: -9.5461 },
  "Aéroport Agadir-Al Massira (AGA)": { lat: 30.3811, lng: -9.5461 },
  "Aéroport Marrakech Ménara (RAK)": { lat: 31.6069, lng: -8.0363 },
  "Aéroport Marrakech-Ménara (RAK)": { lat: 31.6069, lng: -8.0363 },
  "Aéroport Casablanca Mohammed V (CMN)": { lat: 33.3675, lng: -7.5898 },
  "Aéroport Casablanca-Mohammed V (CMN)": { lat: 33.3675, lng: -7.5898 },
  "Aéroport Essaouira Mogador (ESU)": { lat: 31.3975, lng: -9.6817 },
  "Aéroport Essaouira-Mogador (ESU)": { lat: 31.3975, lng: -9.6817 },
  "Aéroport Fès Saïss (FEZ)": { lat: 33.9273, lng: -4.9779 },
  "Aéroport Tanger Ibn Battouta (TNG)": { lat: 35.7269, lng: -5.9169 },
  "Aéroport Rabat-Salé (RBA)": { lat: 34.0515, lng: -6.7515 },
  "Aéroport Ouarzazate (OZZ)": { lat: 30.9391, lng: -6.9094 },

  // Cities
  "Agadir Centre-Ville": { lat: 30.4278, lng: -9.5981 },
  "Agadir Centre-Ville (Hôtel / Adresse de votre choix)": { lat: 30.4278, lng: -9.5981 },
  "Founty / Agadir Beach": { lat: 30.4058, lng: -9.6037 },
  "Agadir Marina": { lat: 30.4262, lng: -9.6280 },
  "Anza": { lat: 30.4550, lng: -9.6400 },
  "Aourir / Banana Village": { lat: 30.4924, lng: -9.6356 },
  "Tamraght": { lat: 30.5100, lng: -9.6800 },
  "Taghazout": { lat: 30.5445, lng: -9.7098 },
  "Taghazout Bay": { lat: 30.5460, lng: -9.7080 },
  "Imi Ouaddar": { lat: 30.5936, lng: -9.7567 },
  "Inezgane": { lat: 30.3550, lng: -9.5370 },
  "Aït Melloul": { lat: 30.3342, lng: -9.4973 },
  "Dcheira El Jihadia": { lat: 30.3805, lng: -9.5350 },
  "Drarga": { lat: 30.4200, lng: -9.5000 },
  "Biougra": { lat: 30.2130, lng: -9.3690 },
  "Paradise Valley": { lat: 30.5900, lng: -9.5000 },
  "Marrakech Centre-Ville": { lat: 31.6295, lng: -7.9811 },
  "Marrakech Centre-Ville (Riad / Hôtel)": { lat: 31.6295, lng: -7.9811 },
  "Casablanca Centre-Ville": { lat: 33.5731, lng: -7.5898 },
  "Essaouira Médina": { lat: 31.5085, lng: -9.7595 },
  "Taroudant Centre": { lat: 30.4703, lng: -8.8768 },
  Taroudant: { lat: 30.4703, lng: -8.8768 },
  "Rabat Centre-Ville": { lat: 34.0209, lng: -6.8416 },
  "Fès Médina": { lat: 34.0637, lng: -4.9779 },
  "Tanger Centre-Ville": { lat: 35.7595, lng: -5.834 },
  Chefchaouen: { lat: 35.1688, lng: -5.2636 },
  Ouarzazate: { lat: 30.9189, lng: -6.8934 },
  "Merzouga (Dunes)": { lat: 31.0994, lng: -4.0128 },

  // Hotels / Resorts (Taghazout coast)
  "Taghazout (Hôtel / Surf Camp)": { lat: 30.5433, lng: -9.7092 },
  "Taghazout Bay Resort": { lat: 30.5514, lng: -9.7137 },
  "Paradis du Surf": { lat: 30.5433, lng: -9.7092 },
  "Hyatt Place Taghazout Bay": { lat: 30.5514, lng: -9.7137 },
  "Fairmont Taghazout Bay": { lat: 30.5514, lng: -9.7137 },
  "Hyatt Regency Taghazout Bay": { lat: 30.5514, lng: -9.7137 },
  "Sofitel Agadir Thalassa Sea & Spa": { lat: 30.395, lng: -9.634 },
  "Riu Tikida Beach": { lat: 30.4108, lng: -9.6169 },
  "La Mamounia": { lat: 31.6225, lng: -7.9993 },
  "Royal Mansour Marrakech": { lat: 31.6289, lng: -8.0067 },
  "Four Seasons Marrakech": { lat: 31.6403, lng: -8.0295 },
};

export function getLatLng(label: string): LatLng {
  const hit = LATLNG_POSITIONS[label];
  if (hit) return hit;
  const key = Object.keys(LATLNG_POSITIONS).find(
    (k) => k.toLowerCase() === label.trim().toLowerCase(),
  );
  if (key) return LATLNG_POSITIONS[key];
  const catalogLocation = findLocationByLabel(label);
  if (catalogLocation) return { lat: catalogLocation.lat, lng: catalogLocation.lng };
  // Default to Agadir only for a truly unknown free-text address.
  return { lat: 30.4278, lng: -9.5981 };
}
