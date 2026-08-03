import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { authClient } from '@/lib/auth-client.ts';
import LoadingScreen from '@/components/loading-screen.tsx';

export const Route = createFileRoute('/(auth)')({
  beforeLoad: async () => {
    const { data: session, error } = await authClient.getSession();

    if (!error && session) {
      throw redirect({ to: '/' });
    }
  },
  pendingComponent: LoadingScreen,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section
      className={'flex flex-col items-center justify-center min-h-screen w-full max-w-svh mx-auto'}
    >
      <Outlet />
    </section>
  );
}
