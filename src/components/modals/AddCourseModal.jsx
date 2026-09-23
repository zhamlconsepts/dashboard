import React, { useState } from 'react';
import { X, BookPlus, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const AddCourseModal = () => {
  const { isDark, isAddCourseModalOpen, setIsAddCourseModalOpen, addCourse } = useTheme();

  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    category: 'React',
    price: '$49',
    lessons: 30,
    level: 'Beginner',
  });

  if (!isAddCourseModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.instructor) return;

    addCourse(formData);
    setFormData({ title: '', instructor: '', category: 'React', price: '$49', lessons: 30, level: 'Beginner' });
    setIsAddCourseModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl relative animate-in zoom-in-95 duration-200 ${
          isDark ? 'bg-[#0e1626] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <button
          onClick={() => setIsAddCourseModalOpen(false)}
          className="absolute right-5 top-5 p-1 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
            <BookPlus size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold">Yangi Kurs Yaratish</h3>
            <p className="text-xs text-slate-400">Kurs ma'lumotlari va narxini belgilang</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-slate-300">Kurs Nomi</label>
            <input
              type="text"
              required
              placeholder="Masalan: Next.js 15 Fullstack Course"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full p-2.5 rounded-xl border outline-none ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">O'qituvchi / Mentor</label>
            <input
              type="text"
              required
              placeholder="Mentor Ismi"
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              className={`w-full p-2.5 rounded-xl border outline-none ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Kategoriya</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full p-2.5 rounded-xl border outline-none cursor-pointer ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="React">React</option>
                <option value="VueJS">VueJS</option>
                <option value="NodeJS">NodeJS</option>
                <option value="Python">Python</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-300">Narxi</label>
              <input
                type="text"
                placeholder="$49"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={`w-full p-2.5 rounded-xl border outline-none ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddCourseModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30"
            >
              Kursni Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
