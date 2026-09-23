import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const GrowthChart = () => {
  const { isDark, currentAccent } = useTheme();
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Data points aligned with the student growth trend
  const data = [
    { month: 'Jan', value: 240, label: 'January' },
    { month: 'Feb', value: 360, label: 'February' },
    { month: 'Mar', value: 510, label: 'March' },
    { month: 'Apr', value: 890, label: 'April' },
    { month: 'May', value: 720, label: 'May' },
    { month: 'Jun', value: 650, label: 'June' },
    { month: 'Jul', value: 860, label: 'July' },
    { month: 'Aug', value: 1080, label: 'August' },
    { month: 'Sep', value: 920, label: 'September' },
    { month: 'Oct', value: 760, label: 'October' },
    { month: 'Nov', value: 1140, label: 'November' },
    { month: 'Dec', value: 1480, label: 'December' },
  ];

  const yTicks = [1500, 1000, 750, 500, 250, 0];
  const maxY = 1500;

  // Chart Dimensions & Coordinate mapping
  const width = 680;
  const height = 260;
  const paddingLeft = 45;
  const paddingRight = 25;
  const paddingTop = 25;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = data.map((d, index) => {
    const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.value / maxY) * chartHeight;
    return { ...d, x, y };
  });

  // Generate smooth cubic bezier spline curve
  const generateSmoothPath = (pts) => {
    if (pts.length === 0) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const current = pts[i];
      const next = pts[i + 1];
      const prev = pts[i - 1] || current;
      const nextNext = pts[i + 2] || next;

      // Control points
      const cp1x = current.x + (next.x - prev.x) / 5;
      const cp1y = current.y + (next.y - prev.y) / 5;
      const cp2x = next.x - (nextNext.x - current.x) / 5;
      const cp2y = next.y - (nextNext.y - current.y) / 5;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    return path;
  };

  const linePath = generateSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

  const strokeColor = currentAccent?.chartStroke || '#38bdf8';
  const stopColor1 = currentAccent?.chartStop1 || '#38bdf8';
  const stopColor2 = currentAccent?.chartStop2 || '#3b82f6';

  return (
    <div
      className={`relative w-full p-5 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
        isDark ? 'clay-card-dark' : 'clay-card-light'
      }`}
    >
      {/* Title & Badge */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3
            className={`text-sm sm:text-base font-bold tracking-wide ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}
          >
            Student Growth
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Yillik talabalar o'sish dinamikasi & oylik ko'rsatkichlar</p>
        </div>
        <div
          className={`text-xs px-2.5 py-1 rounded-full font-bold ${
            currentAccent.bgLight
          } ${currentAccent.text} border ${currentAccent.border}`}
        >
          +38.4% YoY
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            {/* Dynamic Neon Glow Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient under curve based on active accent theme */}
            <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stopColor1} stopOpacity={isDark ? "0.38" : "0.28"} />
              <stop offset="45%" stopColor={stopColor2} stopOpacity={isDark ? "0.18" : "0.12"} />
              <stop offset="100%" stopColor={stopColor2} stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y-Axis values */}
          {yTicks.map((tick) => {
            const y = paddingTop + chartHeight - (tick / maxY) * chartHeight;
            return (
              <g key={tick} className="transition-opacity duration-200">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke={isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'}
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill={isDark ? '#64748b' : '#94a3b8'}
                  className="font-mono select-none"
                >
                  {tick.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path
            d={areaPath}
            fill="url(#growthGradient)"
            className="transition-all duration-500"
          />

          {/* Glowing Spline Line Stroke */}
          <path
            d={linePath}
            fill="none"
            stroke={strokeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neonGlow)"
            className="transition-all duration-500"
          />

          {/* X-Axis Labels */}
          {points.map((pt, i) => (
            <text
              key={pt.month}
              x={pt.x}
              y={height - 12}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight={hoveredPoint === i ? '700' : '400'}
              fill={
                hoveredPoint === i
                  ? strokeColor
                  : isDark
                  ? '#64748b'
                  : '#94a3b8'
              }
              className="select-none transition-colors duration-200"
            >
              {pt.month}
            </text>
          ))}

          {/* Interactive Hover Area & Nodes */}
          {points.map((pt, i) => (
            <g
              key={`point-${i}`}
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
              className="cursor-pointer"
            >
              {/* Hover zone */}
              <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />

              {/* Dot on line */}
              {hoveredPoint === i && (
                <>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="8"
                    fill={strokeColor}
                    opacity="0.35"
                    className="animate-ping"
                  />
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    fill={strokeColor}
                    stroke={isDark ? '#0b111e' : '#ffffff'}
                    strokeWidth="2.5"
                    filter="url(#neonGlow)"
                  />
                  {/* Vertical Guide Line */}
                  <line
                    x1={pt.x}
                    y1={pt.y}
                    x2={pt.x}
                    y2={height - paddingBottom}
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity="0.6"
                  />
                </>
              )}
            </g>
          ))}
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredPoint !== null && (
          <div
            className={`absolute top-2 right-4 px-3.5 py-2 rounded-2xl border backdrop-blur-md shadow-2xl text-xs transition-all duration-200 pointer-events-none animate-in fade-in zoom-in-95 ${
              isDark
                ? 'bg-slate-900/95 border-slate-700 text-white'
                : 'bg-white/95 border-slate-200 text-slate-800'
            }`}
          >
            <div className="font-bold" style={{ color: strokeColor }}>
              {data[hoveredPoint].label} 2026
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-base font-extrabold">
                {data[hoveredPoint].value.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400">faol talabalar</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrowthChart;
