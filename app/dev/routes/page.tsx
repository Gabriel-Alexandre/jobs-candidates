'use client';

import { routes } from '@/components/AuthGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function DevRoutesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Available Routes</h1>
      <Card>
        <CardHeader>
          <CardTitle>Route List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routes.map((route) => (
              <div
                key={route.path}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Link
                    href={route.path}
                    className="text-primary hover:underline"
                  >
                    {route.path}
                  </Link>
                  <span className="text-muted-foreground">{route.label}</span>
                </div>
                <Badge variant={route.isPublic ? 'secondary' : 'default'}>
                  {route.isPublic ? 'Public' : 'Private'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}