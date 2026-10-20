import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Sidebar, ActivePage } from './Sidebar';
import { TopupModal } from '../Payment/TopupModal';

interface AppLayoutProps {
  activePage: ActivePage;
  onSelectPage: (page: ActivePage) => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  activePage,
  onSelectPage,
  children,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [isPinned, setIsPinned] = useState<boolean>(() => {
    try {
      return localStorage.getItem('academy_sidebar_pinned') !== 'false';
    } catch {
      return true;
    }
  });

  // Global event listener so any page/component can trigger topup modal
  useEffect(() => {
    const handleOpenModal = () => setShowTopupModal(true);
    window.addEventListener('open-topup-modal', handleOpenModal);
    return () => window.removeEventListener('open-topup-modal', handleOpenModal);
  }, []);

  const handleTogglePin = () => {
    setIsPinned((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('academy_sidebar_pinned', String(next));
      } catch {}
      return next;
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Fixed Sidebar with Hover Slide-out and Modern Pin control */}
      <Sidebar
        activePage={activePage}
        onSelectPage={onSelectPage}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        isPinned={isPinned}
        onTogglePin={handleTogglePin}
      />

      {/* Main Content Area: Fixed Viewport, Zero Duplicate Buttons in Navbar */}
      <div className="flex flex-1 flex-col min-w-0 h-screen overflow-hidden">
        {activePage === 'lesson' ? (
          <main className="flex-1 h-screen overflow-hidden p-0 m-0">
            {children}
          </main>
        ) : (
          <>
            <Navbar
              onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
              onSelectPage={onSelectPage}
              activePage={activePage}
              onOpenTopup={() => setShowTopupModal(true)}
            />
            <main
              className={`flex-1 overflow-y-auto p-3 sm:p-5 lg:p-8 overscroll-contain relative transition-all duration-300 ${
                activePage === 'dashboard' ? 'bg-slate-950 text-white' : ''
              }`}
              style={
                activePage === 'dashboard'
                  ? {
                      backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.72) 0%, rgba(6, 78, 59, 0.45) 35%, rgba(15, 23, 42, 0.88) 100%), url('/adventure-forest-bg.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center top',
                      backgroundAttachment: 'fixed',
                      backgroundRepeat: 'no-repeat',
                    }
                  : undefined
              }
            >
              <div className="mx-auto max-w-7xl pb-12 relative z-10">{children}</div>
            </main>
          </>
        )}
      </div>

      {/* Global SCB Topup Modal */}
      <TopupModal
        isOpen={showTopupModal}
        onClose={() => setShowTopupModal(false)}
      />
    </div>
  );
};

