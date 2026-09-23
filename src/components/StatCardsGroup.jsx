import React from 'react';
import { Users, BookOpen, DollarSign, TrendingUp, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const StatCardsGroup = () => {
  const { isDark, stats } = useTheme();

  const cards = [
    {
      id: 'students',
      label: 'Total Students',
      value: stats.totalStudents.toLocaleString(),
      growth: stats.studentGrowth,
      icon: Users,
      color: 'blue',
      barColor: 'bg-blue-500 shadow-[0_0_15px_#3b82f6]',
      gradient: 'from-blue-500 via-blue-600 to-indigo-700',
      glow: 'rgba(37,99,235,0.45)',
      badgeBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30'
    },
    {
      id: 'courses',
      label: 'Courses',
      value: stats.courses.toString(),
      growth: stats.coursesGrowth,
      icon: BookOpen,
      color: 'green',
      barColor: 'bg-emerald-500 shadow-[0_0_15px_#10b981]',
      gradient: 'from-emerald-500 via-emerald-600 to-teal-700',
      glow: 'rgba(16,185,129,0.45)',
      badgeBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 'revenue',
      label: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      growth: stats.revenueGrowth,
      icon: DollarSign,
      color: 'purple',
      barColor: 'bg-purple-500 shadow-[0_0_15px_#a855f7]',
      gradient: 'from-purple-500 via-purple-600 to-violet-800',
      glow: 'rgba(168,85,247,0.45)',
      badgeBg: 'bg-purple-500/15 text-purple-400 border-purple-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className={`p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 group hover:translate-y-[-4px] shimmer-hover cursor-pointer ${
              isDark ? 'clay-card-dark' : 'clay-card-light'
            }`}
          >
            <div className="flex items-start justify-between">
              {/* 3D Glowing Icon with smooth spring rotate on hover */}
              <div
                className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${card.gradient} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                style={{
                  boxShadow: `0 8px 25px ${card.glow}, inset 0 2px 4px rgba(255,255,255,0.4)`
                }}
              >
                <Icon size={26} strokeWidth={2.2} className="drop-shadow-sm" />
              </div>

              {/* Growth Badge with pulse */}
              <div className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-transform group-hover:scale-105 ${card.badgeBg}`}>
                <TrendingUp size={12} className="animate-pulse" />
                <span>{card.growth}</span>
              </div>
            </div>

            {/* Value & Label */}
            <div className="mt-4">
              <div
                className={`text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-200 ${
                  isDark ? 'text-white group-hover:text-blue-300' : 'text-slate-900 group-hover:text-blue-600'
                }`}
              >
                {card.value}
              </div>
              <div
                className={`text-xs sm:text-sm font-medium mt-0.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {card.label}
              </div>
            </div>

            {/* Glowing Bottom Neon Accent Bar with Expand on Hover */}
            <div className="mt-4 w-14 sm:w-16 group-hover:w-24 h-1.5 rounded-full overflow-hidden transition-all duration-300">
              <div className={`w-full h-full rounded-full ${card.barColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatCardsGroup;
