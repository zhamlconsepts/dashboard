import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const StatCard = ({
  icon: Icon,
  value,
  label,
  accentColor = 'blue', // 'blue' | 'green'
  trend,
  className = '',
}) => {
  const { isDark } = useTheme();

  const isBlue = accentColor === 'blue';

  return (
    <div
      className={`relative flex-1 p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 group hover:translate-y-[-2px] ${
        isDark ? 'clay-card-dark' : 'clay-card-light'
      } ${className}`}
    >
      <div className="flex items-center gap-4">
        {/* 3D Glowing Icon Container */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
            isBlue
              ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white shadow-[0_8px_20px_rgba(37,99,235,0.45),inset_0_2px_4px_rgba(255,255,255,0.4)]'
              : 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white shadow-[0_8px_20px_rgba(16,185,129,0.45),inset_0_2px_4px_rgba(255,255,255,0.4)]'
          }`}
        >
          <Icon size={26} strokeWidth={2.2} className="drop-shadow-sm" />
        </div>

        {/* Text Details */}
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {value}
            </span>
            {trend && (
              <span
                className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-md ${
                  trend.startsWith('+')
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-rose-400 bg-rose-500/10'
                }`}
              >
                {trend}
              </span>
            )}
          </div>
          <span
            className={`text-xs sm:text-sm font-medium mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Glowing Bottom Neon Accent Bar */}
      <div className="mt-4 w-14 sm:w-16 h-1 rounded-full overflow-hidden">
        <div
          className={`w-full h-full rounded-full transition-all duration-300 ${
            isBlue
              ? 'bg-blue-500 shadow-[0_0_12px_#3b82f6]'
              : 'bg-emerald-500 shadow-[0_0_12px_#10b981]'
          }`}
        />
      </div>
    </div>
  );
};

export default StatCard;
