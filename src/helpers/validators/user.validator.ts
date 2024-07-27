import { z } from 'zod';

export const UserValidator = z.object({
  email: z
    .string()
    .min(
      1,
      'Para continuar, precisamos do seu email. Por favor, forneça um email válido.'
    )
    .email(
      'O formato do email que você digitou não é válido. Por favor, verifique e insira um email válido.'
    ),
});
