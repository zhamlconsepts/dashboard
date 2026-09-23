import React from 'react';
import { 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  ArrowUpRight, 
  Download, 
  Award, 
  Users, 
  DollarSign, 
  Calendar 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GrowthChart } from '../GrowthChart';

export const AnalyticsView = () => {
  const { isDark, stats, students } = useTheme();

  const courseDistribution = [
    { label: 'React Masterclass', percent: 35, count: '435 talaba', color: 'bg-blue-500', hex: '#3b82f6' },
    { label: 'Fullstack NodeJS', percent: 25, count: '310 talaba', color: 'bg-purple-500', hex: '#a855f7' },
    { label: 'VueJS Architecture', percent: 22, count: '275 talaba', color: 'bg-emerald-500', hex: '#10b981' },
    { label: 'Python & AI', percent: 18, count: '225 talaba', color: 'bg-amber-500', hex: '#f59e0b' },
  ];

  const exportReport = () => {
    alert("Analitika hisoboti CSV formatida muvaffaqiyatli yuklandi!");
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Top Header Bar */}
      <div 
        className={`p-5 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 transition-all duration-300 ${
          isDark ? 'clay-card-dark' : 'clay-card-light'
        }`}
      >
        <div>
          <h2 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ta'lim & Moliya Analitikasi
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            2026-yil bo'yicha talabalar o'sishi, faollik va tushumlar ko'rsatkichi
          </p>
        </div>

        <button
          onClick={exportReport}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95"
        >
          <Download size={15} />
          <span>Hisobotni Yuklash (CSV)</span>
        </button>
      </div>

      {/* Main Growth Spline Chart */}
      <GrowthChart />

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Course Distribution Breakdown */}
        <div 
          className={`p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
            isDark ? 'clay-card-dark' : 'clay-card-light'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Kurslar bo'yicha talabalar ulushi
            </h3>
            <span className="text-xs text-slate-400">Jami: 1,245</span>
          </div>

          {/* Distribution Bars */}
          <div className="space-y-3.5">
            {courseDistribution.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {item.label}
                  </span>
                  <span className="text-slate-400 font-mono">
                    {item.percent}% ({item.count})
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800/40 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Revenue & Key Highlights */}
        <div 
          className={`p-5 rounded-2xl sm:rounded-3xl flex flex-col justify-between transition-all duration-300 ${
            isDark ? 'clay-card-dark' : 'clay-card-light'
          }`}
        >
          <div>
            <h3 className={`text-sm font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Moliyaviy Ko‘rsatkichlar
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={`p-3.5 rounded-2xl ${isDark ? 'bg-slate-900/60 border border-slate-800' : 'bg-slate-100/80'}`}>
                <div className="text-[11px] text-slate-400 font-medium">Oylik Tushum</div>
                <div className="text-xl font-extrabold text-emerald-400 mt-1">$24,560</div>
                <div className="text-[10px] text-emerald-500 font-bold mt-0.5">+15.4% o'tgan oydan</div>
              </div>

              <div className={`p-3.5 rounded-2xl ${isDark ? 'bg-slate-900/60 border border-slate-800' : 'bg-slate-100/80'}`}>
                <div className="text-[11px] text-slate-400 font-medium">O'rtacha Chek</div>
                <div className="text-xl font-extrabold text-blue-400 mt-1">$54.20</div>
                <div className="text-[10px] text-blue-400 font-bold mt-0.5">+6.2% o'sish</div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2">
            <Award size={18} className="text-blue-400 shrink-0" />
            <span>Platforma konversiyasi o'tgan oydagidan 8.4% ga yaxshilandi!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
