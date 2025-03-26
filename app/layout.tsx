'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { usePathname } from 'next/navigation';
import { AuthGuard } from '@/components/AuthGuard';
import Sidebar from '@/components/Sidebar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

const privateRoutes = ['/dashboard', '/jobs', '/profile', '/settings', '/notifications', '/candidates'];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPrivateRoute = privateRoutes.some(route => pathname?.startsWith(route));

  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthGuard>
              {isPrivateRoute ? (
                <div className="flex min-h-screen">
                  <Sidebar />
                  <main className="flex-1 bg-background md:pl-64">
                    <div className="md:hidden h-16" /> {/* Mobile header spacer */}
                    <div className="p-6">{children}</div>
                  </main>
                </div>
              ) : (
                children
              )}
            </AuthGuard>
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}