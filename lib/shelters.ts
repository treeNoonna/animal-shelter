import sheltersData from "@/data/shelters.json";

const SEOUL_FALLBACK_COORDS = { lat: 37.5665, lng: 126.978 };

export type Shelter = {
  id: string;
  name: string;
  region: string;
  city: string;
  type: string;
  description: string;
  tags: string[];
  sns: Record<string, string>;
  donation: {
    account: string;
    link: string;
    items: string[];
  };
  animals: string[];
  address: string;
  hours: string;
  image?: string;
  map: {
    color: string;
    lat: number;
    lng: number;
    approximate?: boolean;
  };
};

function isUnknownLocation(value: string | undefined) {
  return !value || value.trim() === "" || value.trim() === "미정";
}

export const shelters = (sheltersData as unknown as Shelter[]).map((shelter) => {
  if (!isUnknownLocation(shelter.region) && !isUnknownLocation(shelter.city)) {
    return shelter;
  }

  return {
    ...shelter,
    map: {
      ...shelter.map,
      ...SEOUL_FALLBACK_COORDS,
      approximate: true,
    },
  };
});
export const regions = ["전체", ...new Set(shelters.map((shelter) => shelter.region))];
