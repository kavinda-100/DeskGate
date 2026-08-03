import { Link } from '@tanstack/react-router';

import { Separator } from '@/components/ui/separator';

const navigationItems = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Pricing' },
] as const;

const navigationLinkClassName =
  'text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-sm flex-col gap-3">
            <Link to="/" className="flex items-center gap-3" aria-label="DeskGate home">
              <img
                src="/deskgate-logo.png"
                alt=""
                className="size-8 shrink-0"
                width="32"
                height="32"
              />
              <span className="font-heading text-base font-semibold tracking-wider uppercase">
                DeskGate
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Secure subscriptions and controlled access for desktop software.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-7 gap-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={navigationLinkClassName}
                activeProps={{ className: 'text-foreground' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Separator />

        <p className="text-xs font-medium tracking-wide text-muted-foreground">
          © {currentYear} DeskGate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
