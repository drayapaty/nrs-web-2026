"use client";

interface MarqueeProps {
  text: string;
  separator?: string;
  speed?: number;
  className?: string;
}

export default function Marquee({
  text,
  separator = " · ",
  speed = 30,
  className = "",
}: MarqueeProps) {
  const repeated = `${text}${separator}`.repeat(8);
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-block animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  );
}
