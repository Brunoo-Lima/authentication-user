import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().trim().min(1, { error: 'Email is required' }),
  password: z
    .string('Password is required')
    .trim()
    .min(6, { error: 'Password must be at least 6 characters' }),
});

export type ILoginFormSchema = z.infer<typeof loginFormSchema>;
