import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .email({
            message: 'Invalid email. Please enter a valid email',
        })
        .trim()
        .min(1, {
            error: 'Email is required',
        }),
    password: z
        .string('Password is required')
        .trim()
        .min(6, { error: 'Password must be at least 6 characters' }),
});
