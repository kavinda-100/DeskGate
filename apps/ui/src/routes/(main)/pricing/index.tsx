import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(main)/pricing/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="size-full">pricing</div>;
}
