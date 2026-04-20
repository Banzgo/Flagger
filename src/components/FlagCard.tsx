interface FlagCardProps {
  flagSvg: string
  feedback: 'correct' | 'wrong' | null
  answerName: string
}

function FlagCard({ flagSvg, feedback, answerName }: FlagCardProps) {
  const feedbackClass =
    feedback === 'correct'
      ? 'ring-4 ring-green-500/70 animate-pulse'
      : feedback === 'wrong'
        ? 'ring-4 ring-red-500/70'
        : ''

  return (
    <section
      className="rounded-xl border border-slate-700 bg-slate-900/85 p-4"
      aria-live="polite"
    >
      <h2 className="mb-3 text-center text-2xl font-semibold">Guess the country</h2>
      <img
        className={`max-h-52 w-full rounded-lg border border-slate-700 bg-slate-950 object-contain transition ${feedbackClass}`}
        src={flagSvg}
        alt="Flag to guess"
      />
      <p className="mt-3 min-h-6 text-center text-sm font-medium text-sky-300">
        {feedback ? `Answer: ${answerName}` : ''}
      </p>
    </section>
  )
}

export default FlagCard
