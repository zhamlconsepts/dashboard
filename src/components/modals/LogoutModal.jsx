import React from 'react';
import { LogOut, X, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const LogoutModal = () => {
  const { isDark, isLogoutModalOpen, setIsLogoutModalOpen, logout } = useTheme();

  if (!isLogoutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-sm p-6 sm:p-7 rounded-[28px] border shadow-2xl relative animate-in zoom-in-95 duration-200 ${
          isDark ? 'bg-[#0e1626] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsLogoutModalOpen(false)}
          className="absolute right-4 top-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Icon & Message */}
        <div className="text-center py-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3 shadow-inner">
            <LogOut size={26} strokeWidth={2.2} />
          </div>
          <h3 className="text-base font-bold">Tizimdan chiqmoqchimisiz?</h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Sessiyangiz yakunlanadi va login sahifasiga yo'naltirilasiz.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => setIsLogoutModalOpen(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Bekor qilish
          </button>
          <button
            onClick={logout}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/35 transition-all active:scale-95"
          >
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
