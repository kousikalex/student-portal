const SimpleCircularProgress = ({ progress }) => {
  const radius = 30;
  const stroke = 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg width="80" height="80">
        {/* Background circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
        />

        {/* Progress circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#8b5cf6"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>

      {/* Center text */}
      <div className="absolute flex flex-col items-center">
        <span className="text-sm font-semibold text-gray-700">{progress}%</span>
        <span className="text-xs text-gray-500">Done</span>
      </div>
    </div>
  );
};

export default SimpleCircularProgress;
