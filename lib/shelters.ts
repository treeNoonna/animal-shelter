import sheltersData from "@/data/shelters.json";

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
  map: {
    color: string;
    lat: number;
    lng: number;
  };
};

export const shelters = sheltersData as unknown as Shelter[];
export const regions = ["전체", ...new Set(shelters.map((shelter) => shelter.region))];
