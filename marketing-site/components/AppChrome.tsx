'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SearchModal } from './SearchModal';
import { AuditModal } from './AuditModal';
import { MatrixRain } from './MatrixRain';
import { AuditModalProvider } from './AuditModalContext';

interface Props {
  children: React.ReactNode;
}

// Client-side shell around every page's (server-rendered) content: nav/search/
// audit modal state, the decorative background layers, and global Cmd+K.
// `children` is passed in from the server RootLayout, so each page's own
// content is still resolved server-side -- only this shell hydrates.
export const AppChrome: React.FC<Props> = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col relative selection:bg-[#00FF41]/30 selection:text-[#00FF41] crt-scanlines overflow-x-hidden">
      <div
        className="fixed inset-0 opacity-[0.035] pointer-events-none bg-matrix-grid z-0"
        aria-hidden="true"
      />
      <MatrixRain />
      <div
        className="fixed inset-[-200%] w-[500%] h-[500%] opacity-40 pointer-events-none bg-film-grain animate-film-grain z-0"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Navbar onOpenSearch={() => setSearchOpen(true)} onOpenAudit={() => setAuditOpen(true)} />
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <AuditModalProvider open={() => setAuditOpen(true)}>{children}</AuditModalProvider>
      </main>

      <div className="relative z-10">
        <Footer onOpenAudit={() => setAuditOpen(true)} />
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
    </div>
  );
};
