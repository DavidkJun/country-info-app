export interface PopulationDataI {
  country: string;
  code: string;
  iso3: string;
  populationCounts: {
    year: number;
    value: number;
  }[];
}

export interface PopulationInfoResponseI {
  error: boolean;
  msg: string;
  data: PopulationDataI[];
}

export interface PopulationCountsI {
  year: number;
  value: number;
}
