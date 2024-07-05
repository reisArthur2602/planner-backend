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
  type: z.enum(['study', 'gym', 'work', 'food', 'personal', 'travel'], {
    message:
      'O tipo de tarefa selecionado não é válido. Por favor, escolha um dos seguintes tipos: study, gym, work, food, personal, travel.',
  }),
  when: z
    .string()
    .refine(
      (date) => dateRegex.test(date),
      'A data que você enviou não está em um formato válido. Por favor, certifique-se de enviar a data no formato correto (por exemplo, AAAA-MM-DDTHH:MM.sss) e tente novamente.'
    )
    .transform((date) => new Date(date)),
});
