import { Link } from '@tanstack/react-router';
import { AppWindowMacIcon, ArrowRightIcon, ServerCogIcon, UserRoundCheckIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge.tsx';
import { buttonVariants } from '@/components/ui/button.tsx';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';

const architectureSteps = [
  {
    label: '01 · Web account',
    title: 'Start in the browser',
    description: 'Create an account, choose a plan, and manage billing where it belongs.',
    detail: 'Better Auth and Stripe keep identity and subscription events together.',
    icon: UserRoundCheckIcon,
  },
  {
    label: '02 · Backend authority',
    title: 'Resolve access on the server',
    description: 'Subscription state becomes features, limits, and registered-device access.',
    detail: 'The backend stays the source of truth for every entitlement decision.',
    icon: ServerCogIcon,
  },
  {
    label: '03 · Desktop session',
    title: 'Open only what the plan allows',
    description:
      'Electron completes browser authentication without exposing credentials to the renderer.',
    detail: 'The desktop app refreshes its allowed features from the backend.',
    icon: AppWindowMacIcon,
  },
] as const;

const HeroSection = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex flex-col gap-12 py-16 sm:py-24 lg:py-32"
    >
      <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <Badge variant="secondary">Desktop SaaS architecture, made tangible</Badge>
          <div className="flex flex-col gap-5">
            <h1
              id="hero-heading"
              className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-7xl"
            >
              Sell desktop access without trusting the desktop app.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              DeskGate is a learning project for the commercial desktop workflow: browser sign-in,
              subscription billing, secure Electron sessions, and backend-enforced entitlements.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link to="/sign-up" className={buttonVariants({ size: 'lg' })}>
              Create an account
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
            <Link
              to="/pricing"
              className={buttonVariants({
                variant: 'outline',
                size: 'lg',
                className: 'bg-background',
              })}
            >
              Explore plans
            </Link>
          </div>
        </div>

        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardAction>
              <Badge variant="outline">The rule</Badge>
            </CardAction>
            <CardTitle>One source of truth</CardTitle>
            <CardDescription>
              The web app and Electron app are clients of the same identity, billing, and
              authorization platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Accounts, subscriptions, devices, feature limits, and access decisions stay on the
              backend—not in the Electron renderer.
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              The core DeskGate principle
            </p>
          </CardFooter>
        </Card>
      </div>

      <div aria-label="DeskGate access flow" className="grid gap-4 md:grid-cols-3">
        {architectureSteps.map((step) => {
          const Icon = step.icon;

          return (
            <Card key={step.label} className="h-full">
              <CardHeader>
                <CardAction>
                  <Icon aria-hidden="true" className="text-muted-foreground" />
                </CardAction>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              </CardContent>
              <CardFooter>
                <Badge variant="secondary">{step.label}</Badge>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
