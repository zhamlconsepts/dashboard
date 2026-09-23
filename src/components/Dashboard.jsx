import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { DashboardView } from './views/DashboardView';
import { StudentTable } from './StudentTable';
import { CoursesView } from './views/CoursesView';
import { AnalyticsView } from './views/AnalyticsView';
import { ComponentShowcase } from './views/ComponentShowcase';
import { SettingsView } from './views/SettingsView';
import { useTheme } from '../context/ThemeContext';

export const Dashboard = () => {
  const { isDark, activeTab } = useTheme();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'students':
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <StudentTable />
          </div>
        );
      case 'courses':
        return <CoursesView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'components':
        return <ComponentShowcase />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div
      className={`w-full min-h-[calc(100vh-130px)] rounded-[28px] sm:rounded-[36px] p-4 sm:p-6 lg:p-7 transition-all duration-500 relative select-none shadow-2xl flex flex-col ${
        isDark ? 'clay-container-dark' : 'clay-container-light'
      }`}
    >
      {/* Outer ambient glow */}
      <div 
        className={`absolute -inset-1 rounded-[38px] filter blur-2xl opacity-20 pointer-events-none transition-opacity duration-500 ${
          isDark ? 'bg-blue-600/30' : 'bg-blue-400/20'
        }`} 
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-5 sm:gap-6 flex-1">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <Topbar />

          {/* Active Dynamic View */}
          <div className="flex-1">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
