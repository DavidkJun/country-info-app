import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('available')
  getAvailableCountries() {
    return this.countryService.getCountries();
  }

  @Get(':COUNTRY_CODE')
  getCountryInfo(@Param('COUNTRY_CODE') countryCode: string) {
    return this.countryService.getCountryInfo(countryCode);
  }
}
