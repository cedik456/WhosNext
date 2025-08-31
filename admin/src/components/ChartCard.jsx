const ChartCard = () => {
  const data = [25, 40, 30, 55, 70, 60, 80]; // fake data for now

  const width = 300,
    height = 150;
  const max = Math.max(...data);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - 20) + 10;
    const y = height - (v / max) * (height - 20) - 10;
    return `${x},${y}`;
  });

  return (
    <div className="p-5 bg-white shadow-sm rounded-2xl">
      <h2 className="mb-3 font-semibold">Matched</h2>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20">
        <polyline
          fill="rgba(59,130,246,0.2)"
          stroke="#3b82f6"
          strokeWidth="2"
          points={`${points.join(" ")} ${width - 10},${height - 10} 10,${
            height - 10
          }`}
        />
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={points.join(" ")}
        />
      </svg>
    </div>
  );
};

export default ChartCard;
