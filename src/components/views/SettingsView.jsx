import React, { useState, useRef } from 'react';
import { 
  Moon, 
  Sun, 
  Palette, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Upload, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  Flame,
  Check
} from 'lucide-react';
import { useTheme, accentPresets } from '../../context/ThemeContext';

// 6 Preset Modern 3D Avatars
const avatarPresets = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
];

export const SettingsView = () => {
  const { 
    theme, 
    setTheme, 
    isDark, 
    userProfile, 
    updateUserProfile,
    accent,
    setAccent,
    currentAccent
  } = useTheme();

  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    role: userProfile.role || '',
    email: userProfile.email || '',
    phone: userProfile.phone || '+998 90 123 45 67',
    location: userProfile.location || 'Toshkent, O‘zbekiston',
    bio: userProfile.bio || 'Fullstack dasturchi va EduGrowth platformasi asoschisi.',
    avatar: userProfile.avatar || avatarPresets[0],
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Local File Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div 
        className={`p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
          isDark ? 'clay-card-dark' : 'clay-card-light'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 mb-1">
              <Sparkles size={12} /> Profil & Ranglar Boshqaruvi
            </div>
            <h2 className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Profil Sozlamalari & Ranglar Palitrasi
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Shaxsiy rasm, ism, email va tizimning barcha aksent ranglarini erkin o'zgartiring
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold animate-in fade-in zoom-in-95">
              <CheckCircle2 size={16} />
              <span>Saqlandi!</span>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Accent Color Theme Picker (New Section) */}
      <div 
        className={`p-6 rounded-3xl space-y-4 transition-all duration-300 ${
          isDark ? 'clay-card-dark' : 'clay-card-light'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette size={18} className={currentAccent.text} />
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Platforma Aksent Ranglari (Accent Color Theme)
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800/40 border border-slate-700/50 text-slate-300 font-mono">
            Faol: <strong className={currentAccent.text}>{currentAccent.name}</strong>
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Tanlangan rang butun dashboarddagi tugmalar, neon nurlar, grafik chiziqlari va nishonlarga avtomatik tatbiq etiladi:
        </p>

        {/* Color Swatch Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.values(accentPresets).map((preset) => {
            const isSelected = accent === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setAccent(preset.id)}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all duration-300 group cursor-pointer ${
                  isSelected
                    ? isDark 
                      ? 'bg-slate-800/80 border-white/40 scale-105 shadow-xl' 
                      : 'bg-white border-slate-400 scale-105 shadow-md'
                    : isDark
                    ? 'bg-[#080d17] border-slate-800/80 hover:scale-102 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 hover:scale-102'
                }`}
              >
                {/* 3D Color Ball */}
                <div 
                  className={`w-10 h-10 rounded-xl ${preset.chip} shadow-md flex items-center justify-center text-white transition-transform group-hover:rotate-6`}
                >
                  {isSelected ? (
                    <Check size={18} strokeWidth={3} className="drop-shadow" />
                  ) : null}
                </div>

                <span className={`text-[11px] font-bold truncate max-w-full ${
                  isSelected ? preset.text : isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {preset.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Settings Grid (Avatar & Form) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Avatar & Theme Switcher (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Avatar Edit Card */}
          <div 
            className={`p-6 rounded-3xl transition-all duration-300 flex flex-col items-center text-center ${
              isDark ? 'clay-card-dark' : 'clay-card-light'
            }`}
          >
            <div className="relative group mb-4">
              {/* Avatar Preview with Glowing Dynamic Ring */}
              <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 bg-gradient-to-tr ${currentAccent.ring} shadow-xl`}>
                <img
                  src={formData.avatar}
                  alt={formData.name}
                  className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Upload overlay button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Kompyuterdan rasm yuklash"
                className={`absolute bottom-1 right-1 w-10 h-10 rounded-full ${currentAccent.bg} text-white flex items-center justify-center shadow-lg border-2 border-white/20 transition-transform hover:scale-110 active:scale-95 cursor-pointer`}
              >
                <Camera size={18} />
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            <h3 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {formData.name || 'Foydalanuvchi'}
            </h3>
            <p className={`text-xs font-semibold mt-0.5 ${currentAccent.text}`}>
              {formData.role || 'Admin'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
              {formData.bio}
            </p>

            {/* Quick Upload Action Buttons */}
            <div className="w-full mt-4 pt-4 border-t border-slate-700/30 space-y-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`w-full py-2.5 px-3 rounded-xl ${currentAccent.bgLight} border ${currentAccent.border} ${currentAccent.text} font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer`}
              >
                <Upload size={14} />
                <span>Kompyuterdan rasm yuklash</span>
              </button>

              {/* 1-Click Avatar Presets */}
              <div>
                <div className="text-[11px] font-semibold text-slate-400 mb-2">
                  Yoki tayyor avatarlardan tanlang:
                </div>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {avatarPresets.map((preset, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, avatar: preset }))}
                      className={`w-9 h-9 rounded-full overflow-hidden transition-all ${
                        formData.avatar === preset
                          ? 'ring-2 ring-blue-500 scale-110 shadow-lg'
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      <img src={preset} alt={`Preset ${index}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Theme Switcher Card */}
          <div 
            className={`p-5 rounded-3xl transition-all duration-300 ${
              isDark ? 'clay-card-dark' : 'clay-card-light'
            }`}
          >
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <Palette size={14} className={currentAccent.text} />
              <span>Tizim Rejimi (Dark / Light)</span>
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                  isDark
                    ? `${currentAccent.bgLight} ${currentAccent.border} text-white shadow-lg`
                    : 'bg-slate-800/10 border-slate-700/50 text-slate-400 hover:text-white'
                }`}
              >
                <Moon size={20} className={`${currentAccent.text} fill-current`} />
                <span className="text-xs font-bold">Dark Mode</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                  !isDark
                    ? 'bg-amber-500/20 border-amber-500 text-slate-900 shadow-md'
                    : 'bg-slate-800/10 border-slate-700/50 text-slate-400 hover:text-white'
                }`}
              >
                <Sun size={20} className="text-amber-500" />
                <span className="text-xs font-bold">Light Mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Form (7 cols) */}
        <div className="lg:col-span-7">
          <form 
            onSubmit={handleSave}
            className={`p-6 rounded-3xl space-y-4 transition-all duration-300 ${
              isDark ? 'clay-card-dark' : 'clay-card-light'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/20">
              <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <User size={16} className={currentAccent.text} />
                <span>Shaxsiy Ma'lumotlarni Tahrirlash</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Barcha maydonlar faol</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Name */}
              <div>
                <label className="block font-semibold mb-1 text-slate-400">
                  To'liq Ism Familiya
                </label>
                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${
                  isDark ? 'bg-[#080d17] border-slate-800 focus-within:border-blue-500' : 'bg-slate-50 border-slate-200 focus-within:border-blue-500'
                }`}>
                  <User size={15} className="text-slate-400 shrink-0" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ism Familiya"
                    className="w-full bg-transparent border-none outline-none font-medium"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block font-semibold mb-1 text-slate-400">
                  Lavozim / Mutaxassislik
                </label>
                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${
                  isDark ? 'bg-[#080d17] border-slate-800 focus-within:border-blue-500' : 'bg-slate-50 border-slate-200 focus-within:border-blue-500'
                }`}>
                  <Sparkles size={15} className="text-slate-400 shrink-0" />
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Admin / Mentor"
                    className="w-full bg-transparent border-none outline-none font-medium"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold mb-1 text-slate-400">
                  Email Manzil
                </label>
                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${
                  isDark ? 'bg-[#080d17] border-slate-800 focus-within:border-blue-500' : 'bg-slate-50 border-slate-200 focus-within:border-blue-500'
                }`}>
                  <Mail size={15} className="text-slate-400 shrink-0" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="admin@edugrowth.uz"
                    className="w-full bg-transparent border-none outline-none font-medium"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold mb-1 text-slate-400">
                  Telefon Raqam
                </label>
                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${
                  isDark ? 'bg-[#080d17] border-slate-800 focus-within:border-blue-500' : 'bg-slate-50 border-slate-200 focus-within:border-blue-500'
                }`}>
                  <Phone size={15} className="text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+998 90 123 45 67"
                    className="w-full bg-transparent border-none outline-none font-medium"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1 text-slate-400">
                  Manzil / Shahar
                </label>
                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${
                  isDark ? 'bg-[#080d17] border-slate-800 focus-within:border-blue-500' : 'bg-slate-50 border-slate-200 focus-within:border-blue-500'
                }`}>
                  <MapPin size={15} className="text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Toshkent, O‘zbekiston"
                    className="w-full bg-transparent border-none outline-none font-medium"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1 text-slate-400">
                  Qisqacha Ma'lumot (Bio)
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="O'zingiz haqingizda qisqacha ma'lumot..."
                  className={`w-full p-2.5 rounded-xl border outline-none font-medium resize-none ${
                    isDark ? 'bg-[#080d17] border-slate-800 focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-blue-500'
                  }`}
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-slate-700/20 flex items-center justify-end gap-3">
              <button
                type="submit"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r ${currentAccent.gradient} ${currentAccent.hoverGradient} text-white font-extrabold text-xs shadow-lg ${currentAccent.glow} transition-all hover:scale-102 active:scale-95 cursor-pointer`}
              >
                <Save size={15} />
                <span>O'zgarishlarni Saqlash</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
