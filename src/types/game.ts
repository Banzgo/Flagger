export interface CountryGameData {
  code: string
  name: string
  capital: string
  continent: string
  region: string
  flagSvg: string
}

export interface GameRound {
  id: number
  correct: CountryGameData
  options: CountryGameData[]
}
