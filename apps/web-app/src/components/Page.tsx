'use client';

import { backButton } from '@telegram-apps/sdk-react';
import { type PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Page({
  children,
  back = true,
}: PropsWithChildren<{
  /**
   * Whether to show the Telegram native back button for this page.
   * @default true
   */
  back?: boolean;
}>) {
  const router = useRouter();

  useEffect(() => {
    // Guard: backButton may not be mounted outside Telegram env
    if (!backButton.isMounted()) return;

    if (back) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [back]);

  useEffect(() => {
    if (!backButton.isMounted()) return;

    return backButton.onClick(() => {
      router.back();
    });
  }, [router]);

  return <>{children}</>;
}
