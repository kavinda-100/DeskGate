import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const App = () => (
  <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>DeskGate Desktop</CardTitle>
        <CardDescription>
          Your desktop workspace is ready for browser sign-in and subscription-aware features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Authentication, subscription, and dashboard experiences will appear here as they are
          connected to the DeskGate API.
        </p>
      </CardContent>
      <CardFooter>
        <Button disabled>Sign in with browser</Button>
      </CardFooter>
    </Card>
  </main>
);
