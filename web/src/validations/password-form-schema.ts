import { z } from 'zod';

export const forgotPasswordFormSchema = z.object({
  email: z.string().trim().min(1, { error: 'Email é obrigatório' }),
});

export type IForgotPasswordFormSchema = z.infer<
  typeof forgotPasswordFormSchema
>;
