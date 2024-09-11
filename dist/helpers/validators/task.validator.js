"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/helpers/validators/task.validator.ts
var task_validator_exports = {};
__export(task_validator_exports, {
  TaskValidator: () => TaskValidator
});
module.exports = __toCommonJS(task_validator_exports);
var import_zod = require("zod");

// src/utils/regex.ts
var dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

// src/helpers/validators/task.validator.ts
var TaskValidator = import_zod.z.object({
  title: import_zod.z.string().min(
    1,
    "Oops! Parece que voc\xEA esqueceu de adicionar um t\xEDtulo para a sua tarefa. Por favor, insira um t\xEDtulo e tente novamente."
  ),
  done: import_zod.z.coerce.boolean(),
  description: import_zod.z.string().min(
    1,
    "Parece que a descri\xE7\xE3o da tarefa n\xE3o foi enviada. Por favor, adicione uma descri\xE7\xE3o para continuar."
  ),
  type: import_zod.z.enum(["study", "gym", "work", "food", "personal", "travel"], {
    message: "O tipo de tarefa selecionado n\xE3o \xE9 v\xE1lido. Por favor, escolha um dos seguintes tipos: study, gym, work, food, personal, travel."
  }),
  when: import_zod.z.string().refine(
    (date) => dateRegex.test(date),
    "A data que voc\xEA enviou n\xE3o est\xE1 em um formato v\xE1lido. Por favor, certifique-se de enviar a data no formato correto (por exemplo, AAAA-MM-DDTHH:MM.sss) e tente novamente."
  ).transform((date) => new Date(date))
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TaskValidator
});
