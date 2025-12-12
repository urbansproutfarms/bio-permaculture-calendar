'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Storage } from '@/lib/storage';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has completed onboarding
    const hasProfile = Storage.hasProfile();

    if (hasProfile) {
      router.push('/dashboard');
    } else {
      router.push('/onboarding');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
