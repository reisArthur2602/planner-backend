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

// src/repositories/task.repository.ts
var task_repository_exports = {};
__export(task_repository_exports, {
  TaskRepositoryPrisma: () => TaskRepositoryPrisma
});
module.exports = __toCommonJS(task_repository_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TaskRepositoryPrisma
});
