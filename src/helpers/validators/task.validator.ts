import { z } from 'zod';
import { dateRegex } from '../../utils/regex';

export const TaskValidator = z.object({
  title: z
    .string()
    .min(
      1,
      'Oops! Parece que você esqueceu de adicionar um título para a sua tarefa. Por favor, insira um título e tente novamente.'
    ),
  description: z
    .string()
    .min(
      1,
      'Parece que a descrição da tarefa não foi enviada. Por favor, adicione uma descrição para continuar.'
    ),
  when: z
    .string()
    .refine(
      (date) => dateRegex.test(date),
      'O formato da data que você inseriu não é válido. Por favor, certifique-se de enviar a data no formato correto (por exemplo, AAAA-MM-DDTHH:MM.sss) e tente novamente.'
    )
    .transform((date) => new Date(date)),
});

// type: z.enum(['study', 'gym', 'work', 'food', 'people', 'travel', 'code']),
