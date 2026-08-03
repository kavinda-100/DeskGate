import { createFileRoute, Outlet } from '@tanstack/react-router';
import Header from '@/components/Header.tsx';
import Footer from '@/components/Footer.tsx';

export const Route = createFileRoute('/(main)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex min-h-svh flex-col">
      <Header />
      <section className="container mx-auto flex-1">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}
