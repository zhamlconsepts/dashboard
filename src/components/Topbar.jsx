import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  Bell, 
  Settings, 
  LogOut, 
  Maximize2, 
  Minimize2, 
  X,
  User,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Topbar = () => {
  const { 
    theme, 
    setTheme, 
    isDark, 
    searchQuery, 
    setSearchQuery, 
    userProfile, 
    notifications, 
    showNotifications, 
    setShowNotifications,
    setIsLogoutModalOpen,
    isFullscreen,
    toggleFullscreen,
    setActiveTab
  } = useTheme();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowNotifications]);

  return (
    <header className="relative z-30 flex items-center justify-between gap-4 mb-6">
      {/* 3D Search & Top Controls Container */}
      <div 
        className={`w-full flex items-center justify-between p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
          isDark 
            ? 'clay-recessed-dark border border-slate-800/80 shadow-lg' 
            : 'clay-recessed-light border border-slate-300/80 shadow-md'
        }`}
      >
        {/* Search Input Box */}
        <div className="flex-1 flex items-center gap-2 px-3 sm:px-4 py-1.5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students, courses..."
            className={`w-full bg-transparent border-none outline-none text-xs sm:text-sm font-medium transition-colors ${
              isDark 
                ? 'text-white placeholder:text-slate-500' 
                : 'text-slate-800 placeholder:text-slate-400'
            }`}
          />
          {searchQuery ? (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-slate-200 p-0.5 transition-transform hover:scale-110"
            >
              <X size={16} />
            </button>
          ) : (
            <Search size={18} className="text-slate-400 shrink-0" />
          )}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Kichik ekran" : "To'liq ekran (Full Screen)"}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isFullscreen
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800/60 hover:scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 hover:scale-105'
            }`}
          >
            {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>

          {/* Theme Toggle Button (Glowing Moon in Dark Mode) */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isDark
                ? 'bg-[#0f172a] text-blue-400 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.6),inset_0_1px_2px_rgba(255,255,255,0.2)] hover:scale-110'
                : 'bg-white text-amber-500 border border-amber-300/60 shadow-[0_0_12px_rgba(245,158,11,0.4)] hover:scale-110'
            }`}
          >
            {isDark ? (
              <Moon size={18} strokeWidth={2.3} className="fill-blue-500 text-blue-400 drop-shadow-[0_0_8px_#3b82f6]" />
            ) : (
              <Sun size={19} strokeWidth={2.2} className="text-amber-500 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
            )}
          </button>

          {/* Notifications Bell */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              title="Xabarnomalar"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all ${
                isDark 
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/60 hover:scale-105' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 hover:scale-105'
              }`}
            >
              <Bell size={18} />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div 
                className={`absolute right-0 top-12 w-72 p-3 rounded-2xl border shadow-2xl z-50 animate-in fade-in zoom-in-95 ${
                  isDark ? 'bg-[#0e1626] border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/40 text-xs font-bold">
                  <span>Xabarnomalar</span>
                  <span className="text-[10px] text-blue-400 font-normal">3 ta yangi</span>
                </div>
                <div className="space-y-2">
                  {notifications.map(n => (
                    <div 
                      key={n.id}
                      className={`p-2 rounded-xl text-xs transition-colors ${
                        isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <p className="font-medium">{n.text}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with Glowing Online Ring */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full p-0.5 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-full h-full object-cover rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0b111e] shadow-[0_0_8px_#10b981]" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div 
                className={`absolute right-0 top-12 w-60 p-2.5 rounded-2xl border shadow-2xl z-50 animate-in fade-in zoom-in-95 ${
                  isDark ? 'bg-[#0e1626] border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 p-2.5 border-b border-slate-700/40 mb-1.5">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/50 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs truncate">{userProfile.name}</div>
                    <div className="text-[10px] text-blue-400 truncate">{userProfile.role}</div>
                    <div className="text-[10px] text-slate-400 truncate">{userProfile.email}</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-blue-600/15 text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <User size={14} />
                  <span>Profil & Rasm O'zgartirish</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-blue-600/15 text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <Settings size={14} />
                  <span>Tizim Sozlamalari</span>
                </button>

                <button
                  onClick={() => {
                    setIsLogoutModalOpen(true);
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-rose-500/15 text-rose-400 transition-colors mt-1 border-t border-slate-700/30 pt-2"
                >
                  <LogOut size={14} />
                  <span>Chiqish (Logout)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
