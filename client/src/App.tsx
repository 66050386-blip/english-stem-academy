import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { AppLayout } from './components/Layout/AppLayout';
import { ActivePage } from './components/Layout/Sidebar';

// Pages
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { CoursesPage } from './pages/CoursesPage';
import { LessonViewerPage } from './pages/LessonViewerPage';
import { VocabularyPage } from './pages/VocabularyPage';
import { GrammarPage } from './pages/GrammarPage';
import { ListeningPage } from './pages/ListeningPage';
import { SpeakingPage } from './pages/SpeakingPage';
import { ReadingPage } from './pages/ReadingPage';
import { WritingPage } from './pages/WritingPage';
import { ToeicPage } from './pages/ToeicPage';
import { StemPage } from './pages/StemPage';
import { LogicPage } from './pages/LogicPage';
import { PersonalityPage } from './pages/PersonalityPage';
import { MockExamPage } from './pages/MockExamPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AdminPage } from './pages/AdminPage';
import { WardrobePage } from './pages/WardrobePage';
import { ProfilePage } from './pages/ProfilePage';

export const App: React.FC = () => {
  const { user, loading } = useAuth();
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          <p className="text-xs font-semibold text-slate-400">กำลังเชื่อมต่อ Academy Platform...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const handleNavigate = (page: ActivePage, extraId?: string) => {
    if (page === 'lesson' && extraId) {
      setSelectedLessonId(extraId);
    }
    setActivePage(page);
  };

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setActivePage('lesson');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'courses':
        return <CoursesPage onSelectLesson={handleSelectLesson} />;
      case 'lesson':
        return selectedLessonId ? (
          <LessonViewerPage
            lessonId={selectedLessonId}
            onBack={() => setActivePage('courses')}
            onNextLesson={handleSelectLesson}
          />
        ) : (
          <CoursesPage onSelectLesson={handleSelectLesson} />
        );
      case 'vocabulary':
        return <VocabularyPage />;
      case 'grammar':
        return <GrammarPage />;
      case 'listening':
        return <ListeningPage />;
      case 'speaking':
        return <SpeakingPage />;
      case 'reading':
        return <ReadingPage />;
      case 'writing':
        return <WritingPage />;
      case 'toeic':
        return <ToeicPage />;
      case 'stem':
        return <StemPage />;
      case 'logic':
        return <LogicPage />;
      case 'personality':
        return <PersonalityPage />;
      case 'mock-exam':
        return <MockExamPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'wardrobe':
        return <WardrobePage />;
      case 'profile':
        return <ProfilePage onNavigateToWardrobe={() => setActivePage('wardrobe')} />;
      case 'admin':
        return user.role === 'ADMIN' ? <AdminPage /> : <DashboardPage onNavigate={handleNavigate} />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AppLayout activePage={activePage} onSelectPage={setActivePage}>
      {renderContent()}
    </AppLayout>
  );
};
