import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().trim().min(1, { error: 'Email é obrigatório' }),
  password: z
    .string('Senha é obrigatória')
    .trim()
    .min(6, { error: 'Senha deve ter pelo menos 6 caracteres' }),
});

export type ILoginFormSchema = z.infer<typeof loginFormSchema>;
