import React from 'react';
import { 
  UserPlus, 
  PlusCircle, 
  ArrowUpRight, 
  GraduationCap, 
  BookOpen, 
  Users, 
  Sparkles 
} from 'lucide-react';
import { StatCardsGroup } from '../StatCardsGroup';
import { GrowthChart } from '../GrowthChart';
import { useTheme } from '../../context/ThemeContext';

export const DashboardView = () => {
  const { 
    isDark, 
    courses, 
    setIsAddStudentModalOpen, 
    setIsAddCourseModalOpen, 
    setActiveTab 
  } = useTheme();

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* 3 Stat Cards Row (Total Students, Courses, Revenue) */}
      <StatCardsGroup />

      {/* Main Student Growth Spline Chart */}
      <GrowthChart />

      {/* Quick Actions & Recent Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quick Actions Card */}
        <div
          className={`p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 flex flex-col justify-between ${
            isDark ? 'clay-card-dark' : 'clay-card-light'
          }`}
        >
          <div>
            <h4 className={`text-sm font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Tezkor Amallar
            </h4>
            <p className="text-[11px] text-slate-400 mb-4">Talabalar va yangi kurslarni tezkor boshqarish</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsAddStudentModalOpen(true)}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-400 font-semibold text-xs transition-all duration-200 group active:scale-95"
            >
              <UserPlus size={16} className="group-hover:scale-110 transition-transform" />
              <span>Talaba qo'shish</span>
            </button>
            <button
              onClick={() => setIsAddCourseModalOpen(true)}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-400 font-semibold text-xs transition-all duration-200 group active:scale-95"
            >
              <PlusCircle size={16} className="group-hover:scale-110 transition-transform" />
              <span>Kurs yaratish</span>
            </button>
          </div>
        </div>

        {/* Top Active Courses preview */}
        <div
          className={`p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
            isDark ? 'clay-card-dark' : 'clay-card-light'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Mashhur Kurslar
              </h4>
              <p className="text-[11px] text-slate-400">Eng ko'p talaba qatnashayotgan yo'nalishlar</p>
            </div>
            <button
              onClick={() => setActiveTab('courses')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-blue-500/10 transition-colors"
            >
              Barchasi <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="space-y-2">
            {courses.slice(0, 2).map((course) => (
              <div
                key={course.id}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-all ${
                  isDark 
                    ? 'bg-slate-900/60 border border-slate-800/80 hover:bg-slate-800/40' 
                    : 'bg-slate-100/80 border border-slate-200/80 hover:bg-slate-200/50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold shrink-0">
                    <GraduationCap size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className={`font-semibold truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {course.title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{course.instructor} • {course.studentsCount} talaba</div>
                  </div>
                </div>
                <div className="font-bold text-emerald-400 shrink-0 ml-2">{course.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
