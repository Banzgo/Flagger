import type { CountryGameData, GameRound } from '../types/game'

const OPTIONS_PER_ROUND = 3

function shuffleArray<T>(items: T[]): T[] {
  const clonedItems = [...items]

  for (let i = clonedItems.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[clonedItems[i], clonedItems[randomIndex]] = [
      clonedItems[randomIndex],
      clonedItems[i],
    ]
  }

  return clonedItems
}

function createRound(countries: CountryGameData[], id: number, excludeCode?: string): GameRound {
  if (countries.length < OPTIONS_PER_ROUND) {
    throw new Error('Not enough countries to generate game rounds.')
  }

  const possibleCorrectCountries = excludeCode
    ? countries.filter((country) => country.code !== excludeCode)
    : countries
  const correctCountry =
    possibleCorrectCountries[Math.floor(Math.random() * possibleCorrectCountries.length)]

  const wrongOptions = shuffleArray(
    countries.filter((country) => country.code !== correctCountry.code),
  ).slice(0, OPTIONS_PER_ROUND - 1)

  return {
    id,
    correct: correctCountry,
    options: shuffleArray([correctCountry, ...wrongOptions]),
  }
}

export function createGameRounds(
  countries: CountryGameData[],
  totalRounds: number,
): GameRound[] {
  let previousCode: string | undefined

  return Array.from({ length: totalRounds }, (_, index) => {
    const round = createRound(countries, index + 1, previousCode)
    previousCode = round.correct.code
    return round
  })
}

export function createNextRound(
  countries: CountryGameData[],
  id: number,
  previousCorrectCode?: string,
): GameRound {
  return createRound(countries, id, previousCorrectCode)
}

export function isCorrectAnswer(
  round: GameRound,
  selectedCountryCode: string,
): boolean {
  return round.correct.code === selectedCountryCode
}
