import type { ReactNode } from 'react';
import { Header } from '@/components/Header';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto flex h-dvh max-w-lg flex-col border-x bg-background shadow-2xl">
      <Header />
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}
