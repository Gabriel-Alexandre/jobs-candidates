'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';

interface RouteMetadata {
  path: string;
  isPublic: boolean;
  label: string;
}

export const routes: RouteMetadata[] = [
  { path: '/', isPublic: true, label: 'Marketing' },
  { path: '/auth/login', isPublic: true, label: 'Login' },
  { path: '/auth/signup', isPublic: true, label: 'Sign Up' },
  { path: '/auth/forgot-password', isPublic: true, label: 'Forgot Password' },
  { path: '/dashboard', isPublic: false, label: 'Dashboard' },
  { path: '/jobs', isPublic: false, label: 'Jobs' },
  { path: '/profile', isPublic: false, label: 'Profile' },
  { path: '/settings', isPublic: false, label: 'Settings' },
  { path: '/notifications', isPublic: false, label: 'Notifications' },
];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isDevelopmentMode } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip auth check in development mode
    if (isDevelopmentMode) {
      return;
    }

    const currentRoute = routes.find((route) => route.path === pathname);
    const isPublicRoute = currentRoute?.isPublic ?? false;

    if (!isAuthenticated && !isPublicRoute) {
      router.push('/auth/login');
    } else if (isAuthenticated && isPublicRoute) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, pathname, router, isDevelopmentMode]);

  return <>{children}</>;
}