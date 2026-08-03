import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';

import { signInSchema } from '@deskgate/schemas';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast.tsx';
import { authClient } from '@/lib/auth-client.ts';

export const Route = createFileRoute('/(auth)/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const formId = 'sign-in-form';
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          rememberMe: value.rememberMe,
        },
        {
          onError: (error) => {
            toast.add({
              type: 'error',
              title: 'Sign In Failed',
              description: error.error.message ?? 'Invalid email or password.',
            });
          },
          onSuccess: () => {
            toast.add({
              type: 'success',
              title: 'Signed In',
              description: 'Welcome back.',
            });
            router.navigate({ to: '/' });
          },
        },
      );
    },
  });

  return (
    <Card className="w-full sm:max-w-lg">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id={formId}
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="email"
                      placeholder="you@example.com"
                      type="email"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      type="password"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="rememberMe"
              children={(field) => (
                <Field orientation="horizontal">
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                  <FieldLabel htmlFor={field.name}>Remember me</FieldLabel>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col gap-6">
          <p className="text-start text-sm text-muted-foreground">
            Do not have an account?{' '}
            <Link className="font-medium text-primary underline underline-offset-4" to="/sign-up">
              Sign up
            </Link>
          </p>
          <Field orientation="horizontal">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit" form={formId}>
              Sign In
            </Button>
          </Field>
        </div>
      </CardFooter>
    </Card>
  );
}
