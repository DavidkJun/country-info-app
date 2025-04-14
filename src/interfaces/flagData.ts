export interface FlagResponseI {
  error: boolean;
  msg: string;
  data: FlagDataI[];
}

export interface FlagDataI {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}
