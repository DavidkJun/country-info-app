import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { CountryI } from '../interfaces/country';
import { CountryInfoI } from '../interfaces/countryInfo';

@Injectable()
export class CountryService {
  async getCountries(): Promise<string[]> {
    const response: AxiosResponse<CountryI[]> = await axios.get(
      'https://date.nager.at/api/v3/AvailableCountries',
    );
    const availableCountries = response.data.map(
      (country: CountryI) => country.name,
    );
    return availableCountries;
  }
}
