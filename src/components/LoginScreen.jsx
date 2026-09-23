import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  LogIn, 
  Sparkles, 
  ShieldCheck, 
  Moon, 
  Sun,
  GraduationCap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const LoginScreen = () => {
  const { isDark, theme, toggleTheme, login } = useTheme();
  const [email, setEmail] = useState('admin@edugrowth.uz');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e?.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login({
        name: 'Dilshod Rustamov',
        role: 'Admin / Lead Mentor',
        email: email || 'admin@edugrowth.uz',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
      });
      setIsLoading(false);
    }, 400);
  };

  return (
    <div 
      className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-500 relative select-none ${
        isDark ? 'bg-[#070b14] text-white' : 'bg-[#edf2f9] text-slate-900'
      }`}
    >
      {/* Ambient background glow */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle at 50% 30%, rgba(37, 99, 235, 0.25) 0%, transparent 60%)'
            : 'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)'
        }}
      />

      {/* Top Theme Switcher */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleTheme}
          title={isDark ? "Light Mode" : "Dark Mode"}
          className={`p-2.5 rounded-2xl border transition-all ${
            isDark 
              ? 'bg-[#0e1626] border-slate-700 text-blue-400 hover:text-white shadow-lg' 
              : 'bg-white border-slate-200 text-amber-500 shadow-md'
          }`}
        >
          {isDark ? <Moon size={18} className="fill-blue-500 text-blue-400" /> : <Sun size={18} className="text-amber-500" />}
        </button>
      </div>

      {/* 3D Login Card */}
      <div 
        className={`w-full max-w-md p-6 sm:p-8 rounded-[32px] sm:rounded-[36px] border shadow-2xl relative z-10 transition-all duration-300 animate-in fade-in zoom-in-95 ${
          isDark ? 'clay-container-dark border-slate-800' : 'clay-container-light border-slate-200'
        }`}
      >
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/40 mb-3">
            <GraduationCap size={28} />
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            EduGrowth Admin
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dashboard tizimiga kirish uchun hisobingizni tasdiqlang
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1.5 text-slate-300">
              Email Manzil
            </label>
            <div 
              className={`flex items-center gap-2.5 px-3.5 py-3 rounded-2xl border transition-colors ${
                isDark ? 'bg-[#080d17] border-slate-800 focus-within:border-blue-500' : 'bg-slate-50 border-slate-200 focus-within:border-blue-500'
              }`}
            >
              <Mail size={16} className="text-slate-400 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@edugrowth.uz"
                className="w-full bg-transparent border-none outline-none font-medium text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1.5 text-slate-300">
              Parol
            </label>
            <div 
              className={`flex items-center gap-2.5 px-3.5 py-3 rounded-2xl border transition-colors ${
                isDark ? 'bg-[#080d17] border-slate-800 focus-within:border-blue-500' : 'bg-slate-50 border-slate-200 focus-within:border-blue-500'
              }`}
            >
              <Lock size={16} className="text-slate-400 shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-none outline-none font-medium text-xs sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-200 p-0.5"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/40 flex items-center justify-center gap-2 transition-all active:scale-98 mt-2"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={17} />
                <span>Tizimga Kirish</span>
              </>
            )}
          </button>

          {/* Quick Demo Login CTA */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleLogin}
              className={`w-full py-2.5 rounded-2xl border border-dashed flex items-center justify-center gap-2 text-xs font-semibold transition-colors ${
                isDark 
                  ? 'border-blue-500/40 text-blue-400 hover:bg-blue-500/10' 
                  : 'border-blue-300 text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Sparkles size={14} />
              <span>1-Click Demo Admin Sifatida Kirish</span>
            </button>
          </div>
        </form>

        {/* Security badge */}
        <div className="mt-6 pt-4 border-t border-slate-700/30 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Xavfsiz 256-bit shifrlangan sessiya</span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
