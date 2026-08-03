import { createFileRoute, Outlet } from '@tanstack/react-router';
import Header from '@/components/Header.tsx';

export const Route = createFileRoute('/(main)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-svh">
      <Header />
      <section className={'container mx-auto'}>
        <Outlet />
      </section>
    </main>
  );
}
