'use client';

import React, { createContext, useContext } from 'react';

// Lets a page's content (e.g. HomeView's "Inspect Quality Gates" CTA) open the
// global Audit modal even though its open/close state lives in AppChrome, a
// client component several server/client boundaries up the tree -- children
// passed from a server layout into a client wrapper can't have props injected
// after the fact, so this is the standard escape hatch for that shape.
const AuditModalContext = createContext<(() => void) | null>(null);

export const AuditModalProvider: React.FC<{ open: () => void; children: React.ReactNode }> = ({
  open,
  children,
}) => <AuditModalContext.Provider value={open}>{children}</AuditModalContext.Provider>;

export function useOpenAuditModal(): () => void {
  const open = useContext(AuditModalContext);
  if (!open) throw new Error('useOpenAuditModal must be used within AuditModalProvider');
  return open;
}
