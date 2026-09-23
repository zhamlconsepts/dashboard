import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Dashboard } from './components/Dashboard';
import { LoginScreen } from './components/LoginScreen';
import { AddStudentModal } from './components/modals/AddStudentModal';
import { AddCourseModal } from './components/modals/AddCourseModal';
import { LogoutModal } from './components/modals/LogoutModal';
import { Sparkles, Maximize2, Minimize2 } from 'lucide-react';

const MainLayout = () => {
  const { theme, isDark, isAuthenticated, isFullscreen, toggleFullscreen } = useTheme();

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div 
      className={`min-h-screen w-full transition-colors duration-500 relative flex flex-col justify-between p-3 sm:p-5 lg:p-6 ${
        isDark 
          ? 'bg-[#070b14] text-slate-100' 
          : 'bg-[#edf2f9] text-slate-900'
      }`}
    >
      {/* Background ambient radial lighting */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ${
          isDark ? 'opacity-35' : 'opacity-20'
        }`}
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.22) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.16) 0%, transparent 40%)'
            : 'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 40%)'
        }}
      />

      {/* Top Header Branding Bar */}
      <header className="relative z-20 max-w-[1550px] mx-auto w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-700/20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-500/30">
            D
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight leading-tight">
              EduGrowth Admin Dashboard
            </h1>
            <p className="text-[11px] text-slate-400 font-mono -mt-0.5">
              React + Tailwind.CSS + JavaScript
            </p>
          </div>
        </div>

        {/* Live Status Badge & Fullscreen Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Barcha 5 ta komponent faol</span>
          </div>

          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Kichik ekran" : "To'liq ekran (Full Screen)"}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
              isDark 
                ? 'bg-[#0e1626] border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
            }`}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{isFullscreen ? "Exit Fullscreen" : "Full Screen"}</span>
          </button>
        </div>
      </header>

      {/* Main Full-Width Dashboard Container */}
      <main className="relative z-10 max-w-[1550px] mx-auto w-full flex-1 my-auto py-1">
        <Dashboard />
      </main>

      {/* Footer */}
      <footer className="relative z-20 max-w-[1550px] mx-auto w-full pt-3 mt-3 border-t border-slate-700/20 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <span>EduGrowth Admin Dashboard tizimi</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono">Rejim: <strong>{isDark ? 'Dark Mode' : 'Light Mode'}</strong></span>
          <span>•</span>
          <span>100% Full Ekran & Log out Imkoniyati</span>
        </div>
      </footer>

      {/* Modals */}
      <AddStudentModal />
      <AddCourseModal />
      <LogoutModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}
