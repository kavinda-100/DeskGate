import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.email({ error: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { error: 'Password must be at least 8 characters long' })
      .max(128, { error: 'Password must be at most 128 characters long' }),
    confirmPassword: z
      .string()
      .min(8, { error: 'Confirm password must be at least 8 characters long' })
      .max(128, { error: 'Confirm password must be at most 128 characters long' }),
    name: z
      .string({ error: 'Name is required' })
      .min(3, { error: 'Name must be at least 3 characters long' })
      .max(100, { error: 'Name must be at most 100 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: z.email({ error: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { error: 'Password must be at least 8 characters long' })
    .max(128, { error: 'Password must be at most 128 characters long' }),
  rememberMe: z.boolean(),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type SignInSchemaType = z.infer<typeof signInSchema>;
