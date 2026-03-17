interface QuoteCardProps {
  quote: string;
  source: string;
  date?: string;
}

export default function QuoteCard({ quote, source, date }: QuoteCardProps) {
  return (
    <div className="relative bg-gradient-to-br from-saffron-50 to-temple-50 rounded-2xl p-8 border border-saffron-100">
      {/* Decorative quote mark */}
      <div className="absolute top-4 left-6 text-6xl font-display text-saffron-200 leading-none select-none">
        &ldquo;
      </div>
      <blockquote className="relative z-10 mt-6">
        <p className="font-display text-lg sm:text-xl text-temple-800 leading-relaxed italic">
          {quote}
        </p>
      </blockquote>
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-saffron-700">
            Niranjana Swami
          </p>
          <p className="text-xs text-temple-500 mt-0.5">{source}</p>
        </div>
        {date && <span className="text-xs text-temple-400">{date}</span>}
      </div>
    </div>
  );
}
