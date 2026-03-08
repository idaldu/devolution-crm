import Link from 'next/link';
import { Button } from '@devolution/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@devolution/ui/card';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Devolution CRM</CardTitle>
          <CardDescription>Modern fullstack monorepo with NestJS + Next.js</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Link href="/users">
            <Button>View Users</Button>
          </Link>
          <a href="http://localhost:3001/docs" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">API Docs</Button>
          </a>
        </CardContent>
      </Card>
    </main>
  );
}
