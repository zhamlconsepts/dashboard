import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const accentPresets = {
  blue: {
    id: 'blue',
    name: 'Electric Blue',
    gradient: 'from-blue-600 to-indigo-600',
    hoverGradient: 'hover:from-blue-500 hover:to-indigo-500',
    bg: 'bg-blue-600',
    bgLight: 'bg-blue-500/15',
    text: 'text-blue-400',
    border: 'border-blue-500/40',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    neonColor: '#3b82f6',
    chartStroke: '#38bdf8',
    chartStop1: '#38bdf8',
    chartStop2: '#3b82f6',
    dot: 'bg-blue-500',
    ring: 'from-blue-500 via-indigo-500 to-purple-500',
    chip: 'bg-gradient-to-r from-blue-500 to-indigo-600'
  },
  purple: {
    id: 'purple',
    name: 'Cyberpunk Purple',
    gradient: 'from-purple-600 to-pink-600',
    hoverGradient: 'hover:from-purple-500 hover:to-pink-500',
    bg: 'bg-purple-600',
    bgLight: 'bg-purple-500/15',
    text: 'text-purple-400',
    border: 'border-purple-500/40',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
    neonColor: '#a855f7',
    chartStroke: '#c084fc',
    chartStop1: '#c084fc',
    chartStop2: '#a855f7',
    dot: 'bg-purple-500',
    ring: 'from-purple-500 via-pink-500 to-rose-500',
    chip: 'bg-gradient-to-r from-purple-500 to-pink-600'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Mint',
    gradient: 'from-emerald-600 to-teal-600',
    hoverGradient: 'hover:from-emerald-500 hover:to-teal-500',
    bg: 'bg-emerald-600',
    bgLight: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    border: 'border-emerald-500/40',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.5)]',
    neonColor: '#10b981',
    chartStroke: '#34d399',
    chartStop1: '#34d399',
    chartStop2: '#10b981',
    dot: 'bg-emerald-500',
    ring: 'from-emerald-500 via-teal-500 to-cyan-500',
    chip: 'bg-gradient-to-r from-emerald-500 to-teal-600'
  },
  amber: {
    id: 'amber',
    name: 'Sunset Amber',
    gradient: 'from-amber-500 to-rose-500',
    hoverGradient: 'hover:from-amber-400 hover:to-rose-400',
    bg: 'bg-amber-500',
    bgLight: 'bg-amber-500/15',
    text: 'text-amber-400',
    border: 'border-amber-500/40',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]',
    neonColor: '#f59e0b',
    chartStroke: '#fbbf24',
    chartStop1: '#fbbf24',
    chartStop2: '#f59e0b',
    dot: 'bg-amber-500',
    ring: 'from-amber-500 via-orange-500 to-rose-500',
    chip: 'bg-gradient-to-r from-amber-500 to-rose-500'
  },
  cyan: {
    id: 'cyan',
    name: 'Ocean Cyan',
    gradient: 'from-cyan-500 to-blue-600',
    hoverGradient: 'hover:from-cyan-400 hover:to-blue-500',
    bg: 'bg-cyan-500',
    bgLight: 'bg-cyan-500/15',
    text: 'text-cyan-400',
    border: 'border-cyan-500/40',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.5)]',
    neonColor: '#06b6d4',
    chartStroke: '#22d3ee',
    chartStop1: '#22d3ee',
    chartStop2: '#06b6d4',
    dot: 'bg-cyan-500',
    ring: 'from-cyan-500 via-sky-500 to-blue-600',
    chip: 'bg-gradient-to-r from-cyan-500 to-blue-600'
  },
  rose: {
    id: 'rose',
    name: 'Neon Rose',
    gradient: 'from-rose-500 to-red-600',
    hoverGradient: 'hover:from-rose-400 hover:to-red-500',
    bg: 'bg-rose-500',
    bgLight: 'bg-rose-500/15',
    text: 'text-rose-400',
    border: 'border-rose-500/40',
    glow: 'shadow-[0_0_20px_rgba(244,63,94,0.5)]',
    neonColor: '#f43f5e',
    chartStroke: '#fb7185',
    chartStop1: '#fb7185',
    chartStop2: '#f43f5e',
    dot: 'bg-rose-500',
    ring: 'from-rose-500 via-red-500 to-pink-600',
    chip: 'bg-gradient-to-r from-rose-500 to-red-600'
  }
};

// Default user profile
const defaultProfile = {
  name: 'Dilshod Rustamov',
  role: 'Admin / Lead Mentor',
  email: 'admin@edugrowth.uz',
  phone: '+998 90 123 45 67',
  location: 'Toshkent, O‘zbekiston',
  bio: 'Fullstack dasturchi va EduGrowth platformasi asoschisi. React va Node.js bo‘yicha 5+ yillik tajribaga ega.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
};

// Initial mock data
const initialStudents = [
  { id: 1, name: 'Ali Valiyev', email: 'ali.valiyev@gmail.com', course: 'React', status: 'Active', progress: 92, enrolled: '12 Jan 2026', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Malika Karimova', email: 'malika.k@gmail.com', course: 'VueJS', status: 'Active', progress: 88, enrolled: '20 Jan 2026', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Jasur Toshov', email: 'jasur.t@mail.ru', course: 'Python', status: 'Inactive', progress: 34, enrolled: '03 Feb 2026', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Zilola Usmonova', email: 'zilola.u@gmail.com', course: 'NodeJS', status: 'Active', progress: 100, enrolled: '15 Nov 2025', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Bobur Mirzayev', email: 'bobur.m@gmail.com', course: 'React', status: 'Active', progress: 75, enrolled: '28 Feb 2026', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
  { id: 6, name: 'Dilnoza Salimova', email: 'dilnoza.s@yahoo.com', course: 'VueJS', status: 'Inactive', progress: 20, enrolled: '05 Mar 2026', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
  { id: 7, name: 'Sardor Qodirov', email: 'sardor.q@gmail.com', course: 'Python', status: 'Active', progress: 95, enrolled: '10 Jan 2026', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
  { id: 8, name: 'Madina Umarova', email: 'madina.u@gmail.com', course: 'NodeJS', status: 'Active', progress: 84, enrolled: '18 Jan 2026', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' },
];

const initialCourses = [
  { id: 1, title: 'React 19 & Tailwind CSS Masterclass', instructor: 'Aziz Rahimov', studentsCount: 420, lessons: 36, rating: 4.9, category: 'React', price: '$49', level: 'Advanced', color: 'blue' },
  { id: 2, title: 'Fullstack NodeJS & Express API', instructor: 'Farrux Tursunov', studentsCount: 310, lessons: 48, rating: 4.8, category: 'NodeJS', price: '$69', level: 'Intermediate', color: 'purple' },
  { id: 3, title: 'VueJS 3 & Pinia Architecture', instructor: 'Madina Alimova', studentsCount: 285, lessons: 24, rating: 4.9, category: 'VueJS', price: '$39', level: 'Beginner', color: 'emerald' },
  { id: 4, title: 'Python, Data Science & AI Asoslari', instructor: 'Shavkat Jo‘rayev', studentsCount: 195, lessons: 42, rating: 4.7, category: 'Python', price: '$59', level: 'Intermediate', color: 'amber' },
  { id: 5, title: 'React Native bilan Mobile Ilovalar', instructor: 'Otabek G‘aniyev', studentsCount: 160, lessons: 30, rating: 4.8, category: 'React', price: '$55', level: 'Advanced', color: 'rose' },
  { id: 6, title: 'TypeScript & Next.js Fullstack', instructor: 'Aziz Rahimov', studentsCount: 140, lessons: 20, rating: 4.9, category: 'React', price: '$45', level: 'Intermediate', color: 'cyan' },
];

export const ThemeProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('app-auth');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'dark';
  });

  // Accent Color Theme ('blue' | 'purple' | 'emerald' | 'amber' | 'cyan' | 'rose')
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('app-accent') || 'blue';
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('app-profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [stats, setStats] = useState({
    totalStudents: 1245,
    courses: 48,
    revenue: 24560,
    studentGrowth: '+12%',
    coursesGrowth: '+8%',
    revenueGrowth: '+15%',
  });

  const [students, setStudents] = useState(initialStudents);
  const [courses, setCourses] = useState(initialCourses);

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Yangi talaba "Ali Valiyev" React kursiga qo‘shildi', time: '5 daqiqa oldin', unread: true },
    { id: 2, text: 'Oylik daromad $24,560 ga yetdi (+15%)', time: '1 soat oldin', unread: true },
    { id: 3, text: 'NodeJS darslari jadvali yangilandi', time: 'Bugun', unread: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('app-accent', accent);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem('app-auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('app-profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const currentAccent = accentPresets[accent] || accentPresets.blue;

  const updateUserProfile = (updates) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('app-profile', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Fullscreen error:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  const login = (userData) => {
    if (userData) {
      updateUserProfile(userData);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsLogoutModalOpen(false);
  };

  const addStudent = (newStudent) => {
    const student = {
      id: Date.now(),
      progress: 0,
      enrolled: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      avatar: newStudent.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      ...newStudent
    };
    setStudents(prev => [student, ...prev]);
    setStats(prev => ({ ...prev, totalStudents: prev.totalStudents + 1 }));
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setStats(prev => ({ ...prev, totalStudents: Math.max(0, prev.totalStudents - 1) }));
  };

  const toggleStudentStatus = (id) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return s;
    }));
  };

  const addCourse = (newCourse) => {
    const course = {
      id: Date.now(),
      studentsCount: 1,
      rating: 5.0,
      color: 'blue',
      ...newCourse
    };
    setCourses(prev => [course, ...prev]);
    setStats(prev => ({ ...prev, courses: prev.courses + 1 }));
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setStats(prev => ({ ...prev, courses: Math.max(0, prev.courses - 1) }));
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = courseFilter === 'All' || student.course.toLowerCase() === courseFilter.toLowerCase();
    const matchesStatus = statusFilter === 'All' || student.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCourse && matchesStatus;
  });

  const value = {
    isAuthenticated,
    login,
    logout,
    theme,
    setTheme,
    toggleTheme,
    accent,
    setAccent,
    currentAccent,
    accentPresets,
    isDark: theme === 'dark',
    isFullscreen,
    toggleFullscreen,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    statusFilter,
    setStatusFilter,
    stats,
    students,
    filteredStudents,
    courses,
    userProfile,
    setUserProfile,
    updateUserProfile,
    notifications,
    showNotifications,
    setShowNotifications,
    isAddStudentModalOpen,
    setIsAddStudentModalOpen,
    isAddCourseModalOpen,
    setIsAddCourseModalOpen,
    isLogoutModalOpen,
    setIsLogoutModalOpen,
    addStudent,
    deleteStudent,
    toggleStudentStatus,
    addCourse,
    deleteCourse,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
