/**
 * Капс во всю ширину. Слово набрано в SVG с textLength, поэтому оно
 * всегда упирается ровно в края контейнера — и на телефоне, и на 4K.
 * Трекинг раздвигается сам; на капсе минус не ставим.
 */
export function Wordmark({
  children,
  className,
  skew = -8,
}: {
  children: string;
  className?: string;
  skew?: number;
}) {
  return (
    <svg
      viewBox="0 0 1000 168"
      className={className}
      role="img"
      aria-label={children}
      preserveAspectRatio="xMidYMid meet"
    >
      <text
        x="0"
        y="132"
        textLength="1000"
        lengthAdjust="spacing"
        fontSize="162"
        fontWeight="900"
        fill="currentColor"
        style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
        transform={`skewX(${skew}) translate(${Math.abs(skew) * 1.2} 0)`}
      >
        {children}
      </text>
    </svg>
  );
}
