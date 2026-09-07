'use client';

import { useRouter } from 'next/navigation';

// Drop-in replacement for the old `onNavigate` prop the Vite SPA threaded
// through every component (App.tsx -> window.history.pushState). Same
// `(path: string) => void` signature, so component bodies didn't need to
// change beyond swapping the prop for this hook -- now backed by Next's
// client-side router instead of manual history manipulation.
export function useNavigate(): (path: string) => void {
  const router = useRouter();
  return (path: string) => router.push(path);
}
