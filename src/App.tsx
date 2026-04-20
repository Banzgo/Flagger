import { useEffect, useRef, useState } from 'react'

import ChoiceButtons from './components/ChoiceButtons'
import FlagCard from './components/FlagCard'
import { countriesForGame } from './data/countries'
import type { GameRound } from './types/game'
import { createNextRound, isCorrectAnswer } from './utils/game'

function createInitialRound(): GameRound {
  return createNextRound(countriesForGame, 1)
}

function App() {
  const [currentRound, setCurrentRound] = useState<GameRound>(() => createInitialRound())
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null)
  const [isRoundLocked, setIsRoundLocked] = useState(false)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const roundNumberRef = useRef(2)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleSelect = (selectedCountryCode: string) => {
    if (isRoundLocked) {
      return
    }

    const isCorrect = isCorrectAnswer(currentRound, selectedCountryCode)
    setSelectedCountryCode(selectedCountryCode)
    setIsRoundLocked(true)
    setFeedback(isCorrect ? 'correct' : 'wrong')

    if (isCorrect) {
      setStreak((previousStreak) => {
        const nextStreak = previousStreak + 1
        setBestStreak((previousBest) => Math.max(previousBest, nextStreak))
        return nextStreak
      })
    } else {
      setStreak(0)
    }

    timeoutRef.current = window.setTimeout(() => {
      setCurrentRound((previousRound) =>
        createNextRound(countriesForGame, roundNumberRef.current++, previousRound.correct.code),
      )
      setSelectedCountryCode(null)
      setIsRoundLocked(false)
      setFeedback(null)
    }, 1000)
  }

  return (
    <main className="mx-auto grid min-h-screen max-w-2xl gap-4 p-4 md:p-6">
      <header className="pt-3 text-center">
        <h1 className="text-5xl font-black tracking-[0.2em] text-slate-100">FLAGGER</h1>
      </header>

      <FlagCard
        flagSvg={currentRound.correct.flagSvg}
        feedback={feedback}
        answerName={currentRound.correct.name}
      />

      <ChoiceButtons
        options={currentRound.options}
        selectedCountryCode={selectedCountryCode}
        correctCountryCode={currentRound.correct.code}
        isRoundLocked={isRoundLocked}
        onSelect={handleSelect}
      />

      <footer className="mt-auto rounded-xl border border-slate-700 bg-slate-900/85 p-4 text-center">
        <p className="text-sm uppercase tracking-widest text-slate-400">Current Streak</p>
        <p className="text-4xl font-extrabold text-emerald-400">{streak}</p>
        <p className="mt-2 text-sm text-slate-300">Best streak: {bestStreak}</p>
      </footer>
    </main>
  )
}

export default App
