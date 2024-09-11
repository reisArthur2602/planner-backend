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

// src/usecases/task.usecase.ts
var task_usecase_exports = {};
__export(task_usecase_exports, {
  TaskUseCase: () => TaskUseCase
});
module.exports = __toCommonJS(task_usecase_exports);

// src/repositories/task.repository.ts
var import_date_fns = require("date-fns");

// src/database/prisma.ts
var import_client = require("@prisma/client");
var db = new import_client.PrismaClient();

// src/repositories/task.repository.ts
var TaskRepositoryPrisma = class {
  async create(data) {
    await db.task.create({ data });
  }
  async findByDate(data) {
    return await db.task.findFirst({
      where: { AND: [{ when: data.when }, { user_id: data.user_id }] },
      select: { id: true }
    });
  }
  async findById(data) {
    return await db.task.findFirst({
      where: { id: data.id }
    });
  }
  async findWithoutId(data) {
    return await db.task.findFirst({
      where: {
        AND: [
          { NOT: { id: data.id } },
          { when: data.when },
          { user_id: data.user_id }
        ]
      },
      select: { id: true }
    });
  }
  async delete(data) {
    await db.task.delete({ where: { id: data.id } });
  }
  async update(data) {
    const { id, description, title, when, type, done } = data;
    await db.task.update({
      where: { id },
      data: { description, title, when, type, done }
    });
  }
  async done(data) {
    await db.task.update({
      where: { id: data.id },
      data: { done: data.done }
    });
  }
  async getAll(data) {
    const current = /* @__PURE__ */ new Date();
    return await db.task.findMany({
      where: { AND: [{ user_id: data.user_id }, { when: { gte: current } }] },
      orderBy: { when: "asc" }
    });
  }
  async getToday(data) {
    const current = /* @__PURE__ */ new Date();
    return await db.task.findMany({
      where: {
        AND: [
          { user_id: data.user_id },
          {
            when: {
              gte: (0, import_date_fns.startOfDay)(current) && current,
              lte: (0, import_date_fns.endOfDay)(current)
            }
          }
        ]
      },
      orderBy: { when: "asc" }
    });
  }
  async getWeek(data) {
    const current = /* @__PURE__ */ new Date();
    return await db.task.findMany({
      where: {
        AND: [
          { user_id: data.user_id },
          {
            when: {
              gte: (0, import_date_fns.startOfWeek)(current) && current,
              lte: (0, import_date_fns.endOfWeek)(current)
            }
          }
        ]
      },
      orderBy: { when: "asc" }
    });
  }
  async getMonth(data) {
    const current = /* @__PURE__ */ new Date();
    return await db.task.findMany({
      where: {
        AND: [
          { user_id: data.user_id },
          {
            when: {
              gte: (0, import_date_fns.startOfMonth)(current) && current,
              lte: (0, import_date_fns.endOfMonth)(current)
            }
          }
        ]
      },
      orderBy: { when: "asc" }
    });
  }
  async late(data) {
    const current = /* @__PURE__ */ new Date();
    return await db.task.findMany({
      where: {
        AND: [
          { user_id: data.user_id },
          {
            when: { lt: current }
          }
        ]
      },
      orderBy: { when: "asc" }
    });
  }
  async getYear(data) {
    const current = /* @__PURE__ */ new Date();
    return await db.task.findMany({
      where: {
        AND: [
          { user_id: data.user_id },
          {
            when: {
              gte: (0, import_date_fns.startOfYear)(current) && current,
              lte: (0, import_date_fns.endOfYear)(current)
            }
          }
        ]
      },
      orderBy: { when: "asc" }
    });
  }
};

// src/usecases/task.usecase.ts
var import_date_fns2 = require("date-fns");

// src/helpers/error.ts
var AplicationError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};
var NotFoundError = class extends AplicationError {
  constructor(message) {
    super(message, 404);
  }
};
var ConflictError = class extends AplicationError {
  constructor(message) {
    super(message, 409);
  }
};

// src/usecases/task.usecase.ts
var TaskUseCase = class {
  constructor() {
    this.taskRepository = new TaskRepositoryPrisma();
  }
  async create(data) {
    if ((0, import_date_fns2.isPast)(data.when))
      throw new ConflictError(
        "Por favor, selecione uma data e hora futuras para sua tarefa."
      );
    const task = await this.taskRepository.findByDate({
      when: data.when,
      user_id: data.user_id
    });
    if (task)
      throw new ConflictError(
        "Ops! J\xE1 existe uma tarefa agendada para este dia e hor\xE1rio. Por favor, escolha um momento diferente."
      );
    await this.taskRepository.create(data);
  }
  async find(data) {
    const task = await this.taskRepository.findById(data);
    if (!task)
      throw new NotFoundError(
        "Desculpe, n\xE3o conseguimos encontrar a tarefa que voc\xEA est\xE1 procurando. Verifique se o ID da tarefa est\xE1 correto ou se ela ainda est\xE1 dispon\xEDvel."
      );
    return task;
  }
  async delete(data) {
    await this.taskRepository.delete(data).catch(() => {
      throw new NotFoundError(
        "Desculpe, n\xE3o conseguimos encontrar a tarefa que voc\xEA est\xE1 procurando. Verifique se o ID da tarefa est\xE1 correto ou se ela ainda est\xE1 dispon\xEDvel."
      );
    });
  }
  async update(data) {
    if ((0, import_date_fns2.isPast)(data.when))
      throw new ConflictError(
        "Por favor, selecione uma data e hora futuras para sua tarefa."
      );
    const task = await this.taskRepository.findWithoutId({
      id: data.id,
      when: data.when,
      user_id: data.user_id
    });
    if (task)
      throw new ConflictError(
        "Ops! J\xE1 existe uma tarefa agendada para este dia e hor\xE1rio. Por favor, escolha um momento diferente."
      );
    await this.taskRepository.update({
      id: data.id,
      description: data.description,
      title: data.title,
      when: data.when,
      type: data.type,
      done: data.done
    }).catch(() => {
      throw new NotFoundError(
        "Desculpe, n\xE3o conseguimos encontrar a tarefa que voc\xEA est\xE1 procurando. Verifique se o ID da tarefa est\xE1 correto ou se ela ainda est\xE1 dispon\xEDvel."
      );
    });
  }
  async done(data) {
    await this.taskRepository.done(data).catch(() => {
      throw new NotFoundError(
        "Desculpe, n\xE3o conseguimos encontrar a tarefa que voc\xEA est\xE1 procurando. Verifique se o ID da tarefa est\xE1 correto ou se ela ainda est\xE1 dispon\xEDvel."
      );
    });
  }
  async getAll(data) {
    return await this.taskRepository.getAll(data);
  }
  async getToday(data) {
    return await this.taskRepository.getToday(data);
  }
  async getWeek(data) {
    return await this.taskRepository.getWeek(data);
  }
  async getMonth(data) {
    return await this.taskRepository.getMonth(data);
  }
  async getYear(data) {
    return await this.taskRepository.getYear(data);
  }
  async late(data) {
    return await this.taskRepository.late(data);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TaskUseCase
});
