'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@devolution/ui/card';
import { Badge } from '@devolution/ui/badge';
import { usersControllerFindAllOptions } from '@devolution/api-client';

export default function UsersPage() {
  const { data: users, isLoading, isError, error } = useQuery(usersControllerFindAllOptions());

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>{error?.message ?? 'Failed to load users'}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">
            List of users fetched via TanStack Query + heyapi generated client
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users?.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle className="text-base">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">ID: {user.id}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
