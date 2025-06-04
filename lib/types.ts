//defining the structure of the data for eg blueprint
export interface Country {
  name: { common: string };
  capital?: string[];
  population: number;
  region: string;
  currencies?: { [key: string]: { name: string } };
  languages?: { [key: string]: string };
  flags: { svg?: string; png?: string };
  cca3: string;
  independent?: boolean;
  unMember?: boolean;
  status?: string;
}

export interface SearchParams {
  text: string;
  type: string;
}