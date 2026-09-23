import React, { useState } from 'react';
import { X, UserPlus, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const AddStudentModal = () => {
  const { isDark, isAddStudentModalOpen, setIsAddStudentModalOpen, addStudent } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: 'React',
    status: 'Active',
  });

  if (!isAddStudentModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    addStudent(formData);
    setFormData({ name: '', email: '', course: 'React', status: 'Active' });
    setIsAddStudentModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl relative animate-in zoom-in-95 duration-200 ${
          isDark ? 'bg-[#0e1626] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsAddStudentModalOpen(false)}
          className="absolute right-5 top-5 p-1 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
            <UserPlus size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold">Yangi Talaba Qo‘shish</h3>
            <p className="text-xs text-slate-400">Guruhga yangi talaba ma'lumotlarini kiriting</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-slate-300">Talaba Ism Familiyasi</label>
            <input
              type="text"
              required
              placeholder="Masalan: Sardor Rahimov"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full p-2.5 rounded-xl border outline-none ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">Email Manzili</label>
            <input
              type="email"
              required
              placeholder="talaba@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full p-2.5 rounded-xl border outline-none ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Yo'nalish / Kurs</label>
              <select
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className={`w-full p-2.5 rounded-xl border outline-none cursor-pointer ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="React">React</option>
                <option value="VueJS">VueJS</option>
                <option value="Python">Python</option>
                <option value="NodeJS">NodeJS</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-300">Holat</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={`w-full p-2.5 rounded-xl border outline-none cursor-pointer ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddStudentModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30"
            >
              Qo‘shish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
