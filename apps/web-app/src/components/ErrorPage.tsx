'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@devolution/ui/card';

export function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-destructive">Something went wrong</CardTitle>
          <CardDescription>The application encountered an unexpected error.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-mono text-muted-foreground break-all">{error.message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
