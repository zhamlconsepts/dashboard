import React from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw,
  BookOpen,
  Mail,
  GraduationCap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const StudentTable = ({ showOnlyTable = false }) => {
  const { 
    isDark, 
    filteredStudents, 
    students,
    searchQuery, 
    setSearchQuery, 
    courseFilter, 
    setCourseFilter, 
    statusFilter, 
    setStatusFilter,
    deleteStudent,
    toggleStudentStatus,
    setIsAddStudentModalOpen,
    currentAccent
  } = useTheme();

  const coursesList = ['All', 'React', 'VueJS', 'Python', 'NodeJS'];
  const statusList = ['All', 'Active', 'Inactive'];

  const resetFilters = () => {
    setSearchQuery('');
    setCourseFilter('All');
    setStatusFilter('All');
  };

  const hasActiveFilters = searchQuery !== '' || courseFilter !== 'All' || statusFilter !== 'All';

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      {!showOnlyTable && (
        <div 
          className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
            isDark ? 'clay-card-dark' : 'clay-card-light'
          }`}
        >
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search and Dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5 flex-1">
              {/* Search query input */}
              <div 
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border flex-1 min-w-[160px] transition-colors ${
                  isDark ? 'bg-[#080d17] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <Search size={15} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ism, email yoki kurs..."
                  className="w-full bg-transparent border-none outline-none text-xs"
                />
              </div>

              {/* Course Filter Dropdown */}
              <div className="relative">
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer appearance-none pr-8 ${
                    isDark ? 'bg-[#080d17] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <option value="All">All Courses</option>
                  {coursesList.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c} Kursi</option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                  ▼
                </div>
              </div>

              {/* Status Filter Dropdown */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer appearance-none pr-8 ${
                    isDark ? 'bg-[#080d17] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                  ▼
                </div>
              </div>

              {/* Filter Reset Button */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  title="Filtrlarni tozalash"
                  className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span className="hidden sm:inline">Tozalash</span>
                </button>
              )}
            </div>

            {/* Add Student CTA Button */}
            <button
              onClick={() => setIsAddStudentModalOpen(true)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${currentAccent.gradient} ${currentAccent.hoverGradient} text-white text-xs font-bold shadow-lg ${currentAccent.glow} transition-all active:scale-95 cursor-pointer`}
            >
              <UserPlus size={15} />
              <span>Yangi talaba</span>
            </button>
          </div>

          {/* Results Summary Bar */}
          <div className="mt-3 pt-3 border-t border-slate-800/30 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <Filter size={12} className={currentAccent.text} />
              <span>Natijalar: <strong className={currentAccent.text}>{filteredStudents.length}</strong> / {students.length} ta talaba</span>
            </div>
            {courseFilter !== 'All' && (
              <span className={`px-2 py-0.5 rounded-md ${currentAccent.bgLight} ${currentAccent.text} font-mono font-bold`}>
                Kurs: {courseFilter}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 3D Student Table */}
      <div 
        className={`rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ${
          isDark ? 'clay-card-dark' : 'clay-card-light'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-[11px] uppercase tracking-wider font-bold border-b ${
                isDark ? 'bg-slate-900/40 border-slate-800/80 text-slate-400' : 'bg-slate-100/60 border-slate-200 text-slate-500'
              }`}>
                <th className="py-3.5 px-4 sm:px-6">User</th>
                <th className="py-3.5 px-4">Course</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/20 text-xs">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const isActive = student.status === 'Active';

                  return (
                    <tr 
                      key={student.id}
                      className={`transition-colors duration-150 group ${
                        isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50/80'
                      }`}
                    >
                      {/* User Avatar + Name + Email */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className={`font-semibold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {student.name}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                              <Mail size={11} /> {student.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Course */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                          student.course === 'React'
                            ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                            : student.course === 'VueJS'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : student.course === 'Python'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                        }`}>
                          <GraduationCap size={12} />
                          {student.course}
                        </span>
                      </td>

                      {/* Status Button (Toggleable) */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => toggleStudentStatus(student.id)}
                          title="Holatni o'zgartirish"
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
                            isActive
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                              : 'bg-rose-500/15 text-rose-400 border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.25)]'
                          }`}
                        >
                          {isActive ? (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                              <span>Inactive</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => deleteStudent(student.id)}
                          title="Talabani o'chirish"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    <p className="text-sm font-medium">Hech qanday talaba topilmadi</p>
                    <p className="text-xs mt-1 text-slate-500">Filtrlarni o'zgartirib ko'ring yoki yangi talaba qo'shing</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
