import { Link } from '@tanstack/react-router';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';

import { LogoutButton } from '@/components/logout-button';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { authClient } from '@/lib/auth-client';

const navigationItems = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Pricing' },
] as const;

const navigationLinkClassName =
  'text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground';

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav
      aria-label="Primary navigation"
      className="flex flex-col gap-5 md:flex-row md:items-center md:gap-7"
    >
      {navigationItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={navigationLinkClassName}
          activeProps={{ className: 'text-foreground' }}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function GuestActions({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <Button variant="ghost" render={<Link to="/sign-in" />} onClick={onNavigate}>
        Sign in
      </Button>
      <Button render={<Link to="/sign-up" />} onClick={onNavigate}>
        Sign up
      </Button>
    </div>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated = Boolean(session?.user);

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="DeskGate home">
          <img src="/deskgate-logo.png" alt="" className="size-8 shrink-0" width="32" height="32" />
          <span className="font-heading text-base font-semibold tracking-wider uppercase">
            DeskGate
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavigationLinks />
          {isAuthenticated ? <LogoutButton /> : !isPending && <GuestActions />}
        </div>

        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon-sm" aria-label="Open navigation menu">
                  <MenuIcon />
                </Button>
              }
            />
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>Browse DeskGate and manage your session.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-1 flex-col gap-8 px-8 pb-8">
                <NavigationLinks onNavigate={() => setIsMenuOpen(false)} />
                <div className="flex flex-col gap-3">
                  {isAuthenticated ? (
                    <LogoutButton onSuccess={() => setIsMenuOpen(false)} />
                  ) : (
                    !isPending && <GuestActions onNavigate={() => setIsMenuOpen(false)} />
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
