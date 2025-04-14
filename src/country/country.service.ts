import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { CountryI } from '../interfaces/country';
import { CountryInfoI } from '../interfaces/countryInfo';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  PopulationDataI,
  PopulationInfoResponseI,
} from '../interfaces/populationData';
import { FlagDataI, FlagResponseI } from '../interfaces/flagData';

@Injectable()
export class CountryService {
  constructor(private readonly httpService: HttpService) {}

  async getCountries(): Promise<string[]> {
    const response: AxiosResponse<CountryI[]> = await axios.get(
      'https://date.nager.at/api/v3/AvailableCountries',
    );
    return response.data.map((country: CountryI) => country.name);
  }
  async getCountryInfo(countryCode: string): Promise<any> {
    const countryResponce: AxiosResponse<CountryInfoI> = await firstValueFrom(
      this.httpService.get(
        `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
      ),
    );
    const countryData: CountryInfoI = countryResponce.data;
    const borders: CountryInfoI = countryData.borders;

    const populationResponce: AxiosResponse<PopulationInfoResponseI> =
      await firstValueFrom(
        this.httpService.get(
          `https://countriesnow.space/api/v0.1/countries/population`,
        ),
      );
    const countriesPopulationData: PopulationDataI[] =
      populationResponce.data.data;
    const countryPopulation = countriesPopulationData.find(
      (country) =>
        country.country.toLowerCase() === countryData.commonName.toLowerCase(),
    );
    const flagResponce: AxiosResponse<FlagResponseI> = await firstValueFrom(
      this.httpService.get(
        'https://countriesnow.space/api/v0.1/countries/flag/images',
      ),
    );
    const flagData: FlagDataI[] = flagResponce.data.data;

    const countryFlag = flagData.find(
      (country) =>
        country.name.toLowerCase() === countryData.commonName.toLowerCase(),
    );

    return {
      borders: borders,
      population: countryPopulation?.populationCounts,
      flag: countryFlag?.flag,
    };
  }
}
