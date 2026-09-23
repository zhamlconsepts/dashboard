import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Layers, 
  Search, 
  Moon, 
  Sun, 
  User, 
  BarChart, 
  Filter, 
  Table as TableIcon,
  Sparkles,
  ArrowRight,
  Code
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Topbar } from '../Topbar';
import { StatCardsGroup } from '../StatCardsGroup';
import { StudentTable } from '../StudentTable';
import { Sidebar } from '../Sidebar';
import { GrowthChart } from '../GrowthChart';

export const ComponentShowcase = () => {
  const { isDark, theme, toggleTheme } = useTheme();
  const [selectedComponent, setSelectedComponent] = useState('all');

  const componentsList = [
    { id: 'all', title: 'Barchasi (Galereya)', desc: 'Barcha 5 ta komponent birgalikda' },
    { id: 'topbar', title: '1. Topbar Component', desc: 'Qidiruv, dark/light tema, profil' },
    { id: 'statcards', title: '2. StatCard Component', desc: 'Total students, courses, revenue' },
    { id: 'table', title: '3. Table Component', desc: 'User, course, status jadvali' },
    { id: 'filter', title: '4. Filter & Search', desc: 'Query + courses/status filterlash' },
    { id: 'sidebar', title: '5. Sidebar Component', desc: '3D vertikal navigatsiya paneli' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div 
        className={`p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
          isDark ? 'clay-card-dark' : 'clay-card-light'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 mb-1">
              <Sparkles size={12} /> Dashboard Komponentlari
            </div>
            <h2 className={`text-base sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              4 Dashboard Componentlari & Arxitekturasi
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Theme: <strong>{theme}</strong></span>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30"
            >
              Temani o'zgartirish
            </button>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-700/20">
          {componentsList.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedComponent(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedComponent === c.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : isDark
                  ? 'bg-slate-800/60 text-slate-400 hover:text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Component 1: Topbar */}
      {(selectedComponent === 'all' || selectedComponent === 'topbar') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-lg bg-blue-500 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Topbar (Search, Profile, Theme) | Natija: bosh panel</span>
            </div>
          </div>
          <div className={`p-4 rounded-2xl sm:rounded-3xl ${isDark ? 'clay-container-dark' : 'clay-container-light'}`}>
            <Topbar />
          </div>
        </div>
      )}

      {/* Component 2: StatCards */}
      {(selectedComponent === 'all' || selectedComponent === 'statcards') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-[10px]">2</span>
              <span>StatCard (Total Students, Courses, Revenue) | Natija: stats</span>
            </div>
          </div>
          <StatCardsGroup />
        </div>
      )}

      {/* Component 3 & 4: Filter & Table */}
      {(selectedComponent === 'all' || selectedComponent === 'table' || selectedComponent === 'filter') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-lg bg-purple-500 text-white flex items-center justify-center text-[10px]">3 & 4</span>
              <span>Filter & Table (User, Course, Status) | Natija: jadval & mos qatorlar</span>
            </div>
          </div>
          <StudentTable />
        </div>
      )}

      {/* Component 5: Sidebar */}
      {(selectedComponent === 'all' || selectedComponent === 'sidebar') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-lg bg-amber-500 text-white flex items-center justify-center text-[10px]">5</span>
              <span>Sidebar (3D Vertikal Navigatsiya) | Natija: asosiy menyu</span>
            </div>
          </div>
          <div className={`p-6 rounded-2xl sm:rounded-3xl flex justify-center ${isDark ? 'clay-container-dark' : 'clay-container-light'}`}>
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentShowcase;
