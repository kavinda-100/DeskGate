import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.email({ error: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { error: 'Password must be at least 6 characters long' })
      .max(12, { error: 'Password must be at most 12 characters long' }),
    confirmPassword: z
      .string()
      .min(6, { error: 'Confirm Password must be at least 6 characters long' })
      .max(12, { error: 'Confirm Password must be at most 12 characters long' }),
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
    .min(6, { error: 'Password must be at least 6 characters long' })
    .max(12, { error: 'Password must be at most 12 characters long' }),
  rememberMe: z.boolean().optional().default(false),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type SignInSchemaType = z.infer<typeof signInSchema>;
