import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { authClient } from '@/lib/auth-client.ts';
import LoadingScreen from '@/components/loading-screen.tsx';

export const Route = createFileRoute('/(main)/dashboard')({
  beforeLoad: async () => {
    const { data: session, error } = await authClient.getSession();

    if (error || !session) {
      throw redirect({
        to: '/sign-in',
        search: { returnTo: '/' },
      });
    }
  },
  pendingComponent: LoadingScreen,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className={'container mx-auto'}>
      <Outlet />
    </section>
  );
}
