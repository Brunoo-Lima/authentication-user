import { z } from 'zod';

export const registerFormSchema = z.object({
  name: z.string('Nome é obrigatório').trim().min(1, {
    error: 'Nome é obrigatório',
  }),
  email: z.string().trim().min(1, { error: 'Email é obrigatório' }),
  password: z
    .string('Senha é obrigatória')
    .trim()
    .min(6, { error: 'Senha deve ter pelo menos 6 caracteres' }),
});

export type IRegisterFormSchema = z.infer<typeof registerFormSchema>;
