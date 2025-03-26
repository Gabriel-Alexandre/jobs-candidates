'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Home } from 'lucide-react';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">{t('error.pageNotFound')}</h2>
        <p className="mt-2 text-muted-foreground">
          {t('error.pageNotFoundDescription')}
        </p>
        <Button asChild className="mt-8">
          <Link href="/marketing">
            <Home className="mr-2 h-4 w-4" />
            {t('error.backToHome')}
          </Link>
        </Button>
      </div>
    </div>
  );
}