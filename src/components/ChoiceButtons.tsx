import type { CountryGameData } from '../types/game'

interface ChoiceButtonsProps {
  options: CountryGameData[]
  selectedCountryCode: string | null
  correctCountryCode: string
  isRoundLocked: boolean
  onSelect: (countryCode: string) => void
}

function ChoiceButtons({
  options,
  selectedCountryCode,
  correctCountryCode,
  isRoundLocked,
  onSelect,
}: ChoiceButtonsProps) {
  return (
    <div className="grid gap-3">
      {options.map((option) => {
        const isSelected = selectedCountryCode === option.code
        const isCorrect = option.code === correctCountryCode
        const isWrongSelection = isRoundLocked && isSelected && !isCorrect

        let className =
          'w-full min-h-12 rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-base font-semibold text-slate-50 transition active:scale-[0.99] disabled:opacity-65'
        if (isRoundLocked && isCorrect) {
          className += ' border-green-700 bg-green-900 ring-2 ring-green-500/60 animate-pulse'
        } else if (isWrongSelection) {
          className += ' border-red-700 bg-red-900'
        }

        return (
          <button
            key={option.code}
            type="button"
            className={className}
            disabled={isRoundLocked}
            onClick={() => onSelect(option.code)}
          >
            {option.name}
          </button>
        )
      })}
    </div>
  )
}

export default ChoiceButtons
