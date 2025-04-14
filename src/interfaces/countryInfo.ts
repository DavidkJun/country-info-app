export interface CountryInfoI {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryInfoI;
}
