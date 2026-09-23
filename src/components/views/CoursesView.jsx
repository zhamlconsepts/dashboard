import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Star, 
  Users, 
  Clock, 
  Award, 
  Trash2, 
  Sparkles,
  Search
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const CoursesView = () => {
  const { isDark, courses, deleteCourse, setIsAddCourseModalOpen } = useTheme();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [courseSearch, setCourseSearch] = useState('');

  const categories = ['All', 'React', 'VueJS', 'NodeJS', 'Python'];

  const filteredCourses = courses.filter(c => {
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    const matchesSearch = c.title.toLowerCase().includes(courseSearch.toLowerCase()) || 
                          c.instructor.toLowerCase().includes(courseSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Header and Actions Bar */}
      <div 
        className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
          isDark ? 'clay-card-dark' : 'clay-card-light'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  categoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : isDark
                    ? 'bg-slate-800/60 text-slate-400 hover:text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat} {cat !== 'All' ? 'Kurslari' : 'Barchasi'}
              </button>
            ))}
          </div>

          {/* Add Course CTA */}
          <button
            onClick={() => setIsAddCourseModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
          >
            <Plus size={16} />
            <span>Yangi Kurs Qo'shish</span>
          </button>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className={`p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 group hover:translate-y-[-3px] flex flex-col justify-between ${
              isDark ? 'clay-card-dark' : 'clay-card-light'
            }`}
          >
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  {course.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                  <Star size={13} className="fill-amber-400" />
                  <span>{course.rating}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className={`text-sm sm:text-base font-bold line-clamp-2 mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {course.title}
              </h3>

              {/* Instructor */}
              <p className="text-xs text-slate-400 mb-4">
                O'qituvchi: <span className="font-semibold text-slate-300">{course.instructor}</span>
              </p>

              {/* Details Metrics */}
              <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-slate-700/20 text-xs text-slate-400 mb-4">
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-blue-400" />
                  <span>{course.studentsCount} talaba</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-emerald-400" />
                  <span>{course.lessons} ta dars</span>
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-lg font-black text-emerald-400">
                {course.price}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => deleteCourse(course.id)}
                  title="Kursni o'chirish"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
                <button
                  onClick={() => alert(`"${course.title}" kursi ochilmoqda`)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20"
                >
                  Batafsil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesView;
