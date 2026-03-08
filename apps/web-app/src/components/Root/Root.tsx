'use client';

import { type PropsWithChildren, useEffect } from 'react';
import { miniApp, useLaunchParams, useSignal, initData } from '@telegram-apps/sdk-react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useDidMount } from '@/hooks/useDidMount';
import { init } from '@/core/init';

function RootInner({ children }: PropsWithChildren) {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  useEffect(() => {
    // Apply dark/light class for Tailwind dark mode
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return <>{children}</>;
}

export function Root({ children }: PropsWithChildren) {
  const didMount = useDidMount();

  useEffect(() => {
    if (!didMount) return;

    const isMacOS = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);
    const isDev = process.env.NODE_ENV === 'development';

    init({
      debug: isDev,
      eruda: isDev,
      mockForMacOS: isMacOS,
    }).catch(console.error);
  }, [didMount]);

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner>{children}</RootInner>
    </ErrorBoundary>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground text-sm">Loading…</p>
    </div>
  );
}
