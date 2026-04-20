import { getAllCountries } from 'country-atlas'

import type { CountryGameData } from '../types/game'

const allCountries = getAllCountries()

function svgMarkupToDataUrl(svgMarkup: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgMarkup)}`
}

function normalizeCountryData(): CountryGameData[] {
  return allCountries
    .map((country) => {
      const capital = country.capital?.[0]?.trim() ?? ''
      const continent = country.geo.continent?.trim() ?? ''
      const region = country.geo.region?.trim() ?? ''
      const name = country.name?.trim() ?? ''
      const code = country.iso.alpha2?.trim() ?? ''
      const flagSvg = country.flag.svg?.trim() ?? ''

      if (!name || !code || !flagSvg) {
        return null
      }

      return {
        code,
        name,
        capital: capital || 'Unknown',
        continent: continent || 'Unknown',
        region: region || 'Unknown',
        flagSvg: svgMarkupToDataUrl(flagSvg),
      }
    })
    .filter((country): country is CountryGameData => country !== null)
}

export const countriesForGame = normalizeCountryData()
