import { Avatar, AvatarFallback } from '@/components/ui/avatar.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';

const learnerStories = [
  {
    initials: 'MN',
    name: 'Maya N.',
    role: 'Frontend developer',
    topic: 'Desktop authentication',
    quote:
      'The browser-to-Electron callback made the security boundary click for me. The renderer never has to hold the long-lived desktop credential.',
  },
  {
    initials: 'JR',
    name: 'Jordan R.',
    role: 'Full-stack learner',
    topic: 'Subscription lifecycle',
    quote:
      'Following a Stripe event into local subscription state showed me why payment success is not the same thing as permission to use a feature.',
  },
  {
    initials: 'SK',
    name: 'Sam K.',
    role: 'Electron developer',
    topic: 'Server-side entitlements',
    quote:
      'I could see exactly where plans become limits, device access, and feature checks—and why the desktop UI cannot make those calls alone.',
  },
] as const;

const TestimonialSection = () => {
  return (
    <section
      aria-labelledby="learner-stories-heading"
      className="flex flex-col gap-10 border-t py-16 sm:py-24"
    >
      <div className="flex max-w-2xl flex-col gap-4">
        <Badge variant="secondary">Fictional learning scenarios</Badge>
        <div className="flex flex-col gap-3">
          <h2
            id="learner-stories-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Learn the boundary before you build the product.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            DeskGate turns common desktop SaaS decisions into an end-to-end project you can inspect,
            test, and extend.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {learnerStories.map((story) => (
          <Card key={story.initials} className="h-full">
            <CardHeader>
              <CardAction>
                <Badge variant="outline">{story.topic}</Badge>
              </CardAction>
              <CardTitle>Example learner story</CardTitle>
              <CardDescription>{story.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <blockquote className="text-base leading-relaxed text-foreground">
                “{story.quote}”
              </blockquote>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-3">
                <Avatar size="lg">
                  <AvatarFallback>{story.initials}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{story.name}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
