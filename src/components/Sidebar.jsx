import React from 'react';
import { 
  LayoutGrid, 
  Users, 
  BookOpen, 
  PieChart, 
  Layers,
  Settings, 
  LogOut 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Sidebar = () => {
  const { isDark, activeTab, setActiveTab, setIsLogoutModalOpen, currentAccent } = useTheme();

  const navItems = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Boshqaruv Paneli' },
    { id: 'students', icon: Users, label: 'Talabalar & Jadval' },
    { id: 'courses', icon: BookOpen, label: 'Kurslar' },
    { id: 'analytics', icon: PieChart, label: 'Analitika' },
    { id: 'components', icon: Layers, label: 'Komponentlar Galereyasi' },
    { id: 'settings', icon: Settings, label: 'Sozlamalar & Ranglar' },
  ];

  return (
    <aside 
      className={`w-16 sm:w-18 flex flex-col items-center justify-between py-6 rounded-2xl sm:rounded-3xl transition-all duration-300 select-none shrink-0 ${
        isDark 
          ? 'clay-recessed-dark border border-slate-800/80 shadow-lg' 
          : 'clay-recessed-light border border-slate-300/80 shadow-md'
      }`}
    >
      {/* Top Nav Items */}
      <div className="flex flex-col items-center gap-3.5 w-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={`group relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isActive
                  ? `bg-gradient-to-b ${currentAccent.gradient} text-white shadow-lg ${currentAccent.glow} scale-105`
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:scale-105'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 hover:scale-105'
              }`}
            >
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.4 : 1.8} 
                className="transition-transform duration-200 group-hover:scale-110"
              />
              
              {/* Active dynamic neon dot indicator */}
              {isActive && (
                <div 
                  className={`absolute -left-1 w-1.5 h-5 rounded-r-full shadow-md ${currentAccent.dot}`}
                  style={{ boxShadow: `0 0 10px ${currentAccent.neonColor}` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom LogOut Item */}
      <div className="w-full px-2 pt-4">
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          title="Tizimdan chiqish"
          className={`w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
            isDark
              ? 'text-slate-400 hover:text-rose-400 hover:bg-rose-500/15'
              : 'text-slate-500 hover:text-rose-600 hover:bg-rose-500/15'
          }`}
        >
          <LogOut size={22} strokeWidth={1.8} className="transition-transform duration-200 hover:scale-110 hover:-translate-x-0.5" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
