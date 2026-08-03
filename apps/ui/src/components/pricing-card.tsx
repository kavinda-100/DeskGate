import { CheckIcon, LoaderCircleIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type PricingCardProps = {
  name: string;
  description: string;
  price: string;
  features: readonly string[];
  actionLabel: string;
  onAction: () => void;
  isCurrentPlan?: boolean;
  isFeatured?: boolean;
  isPending?: boolean;
  isDisabled?: boolean;
};

export function PricingCard({
  name,
  description,
  price,
  features,
  actionLabel,
  onAction,
  isCurrentPlan = false,
  isFeatured = false,
  isPending = false,
  isDisabled = false,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        'h-full border-l-4 transition-colors',
        isCurrentPlan || isFeatured ? 'border-l-primary' : 'border-l-transparent',
      )}
    >
      <CardHeader>
        <CardAction>
          {isCurrentPlan ? (
            <Badge>Current plan</Badge>
          ) : (
            isFeatured && <Badge variant="default">Most popular</Badge>
          )}
        </CardAction>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6">
        <div className="flex items-end gap-2">
          <span className="font-heading text-5xl font-semibold tracking-tight">{price}</span>
          <span className="pb-1 text-sm text-muted-foreground">per month</span>
        </div>
        <ul className="flex flex-col gap-3" aria-label={`${name} plan features`}>
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
              <CheckIcon aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={isCurrentPlan ? 'outline' : isFeatured ? 'default' : 'outline'}
          disabled={isPending || isDisabled}
          onClick={onAction}
        >
          {isPending && <LoaderCircleIcon data-icon="inline-start" className="animate-spin" />}
          {isPending ? 'Please wait' : actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
