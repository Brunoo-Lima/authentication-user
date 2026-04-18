import { z } from 'zod';

export const forgotPasswordFormSchema = z.object({
  email: z.string().trim().min(1, { error: 'Email é obrigatório' }),
});

export type IForgotPasswordFormSchema = z.infer<
  typeof forgotPasswordFormSchema
>;

export const resetPasswordFormSchema = z.object({
  password: z
    .string('Senha é obrigatória')
    .trim()
    .min(6, { error: 'Senha deve ter pelo menos 6 caracteres' }),
  confirmPassword: z
    .string('Senha é obrigatória')
    .trim()
    .min(6, { error: 'Senha deve ter pelo menos 6 caracteres' }),
});

export type IResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
