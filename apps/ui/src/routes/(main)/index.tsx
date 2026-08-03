import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(main)/')({ component: App });

function App() {
  return <div className="size-full">home</div>;
}
