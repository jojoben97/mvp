type SparklineProps = {
  values: number[];
  height?: number;
  stroke?: string;
};

export function Sparkline({
  values,
  height = 56,
  stroke = "url(#gradient)",
}: SparklineProps) {
  if (!values.length) {
    return null;
  }

  const width = values.length * 20;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const normalized = values.map((value) =>
    max === min ? height / 2 : ((value - min) / (max - min)) * height
  );

  const path = normalized
    .map((value, index) => {
      const x = (width / (values.length - 1)) * index;
      const y = height - value;
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-14 w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4debb0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#24d291" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
