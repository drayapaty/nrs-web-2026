interface QuoteCardProps {
  quote: string;
  source: string;
  date?: string;
}

export default function QuoteCard({ quote, source, date }: QuoteCardProps) {
  return (
    <div className="relative bg-gradient-to-br from-cream-50 to-cream-100 rounded-2xl p-8 border border-gold-300">
      <div className="absolute top-4 left-6 text-6xl font-display text-gold-300 leading-none select-none">
        &ldquo;
      </div>
      <blockquote className="relative z-10 mt-6">
        <p className="font-display text-lg sm:text-xl text-ink-900 leading-relaxed italic">
          {quote}
        </p>
      </blockquote>
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gold-600">
            Niranjana Swami
          </p>
          <p className="text-xs text-ink-500 mt-0.5">{source}</p>
        </div>
        {date && <span className="text-xs text-ink-400">{date}</span>}
      </div>
    </div>
  );
}
