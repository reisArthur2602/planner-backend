"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_config = require("dotenv/config");
var import_express_async_errors = require("express-async-errors");
var import_express3 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));

// src/middlewares/hasError.ts
var import_zod = require("zod");
var hasError = (error, req, res, next) => {
  if (error instanceof import_zod.ZodError) {
    const validationErrors = error.errors.map((err) => ({
      path: err.path[0],
      message: err.message
    }));
    console.error(validationErrors);
    return res.status(400).json(validationErrors);
  } else {
    const statusCode = error.statusCode ?? 500;
    const message = error.message ?? "Internal Server Error";
    console.error({ message });
    return res.status(statusCode).json({ message });
  }
};

// src/routes/user.routes.ts
var import_express = require("express");

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
var UnauthorizedError = class extends AplicationError {
  constructor(message) {
    super(message, 401);
  }
};
var ConflictError = class extends AplicationError {
  constructor(message) {
    super(message, 409);
  }
};

// src/database/prisma.ts
var import_client = require("@prisma/client");
var db = new import_client.PrismaClient();

// src/repositories/user.repository.ts
var UserRepositoryPrisma = class {
  async create(data) {
    return await db.user.create({ data });
  }
  async findByEmailOrId(data) {
    return await db.user.findFirst({
      where: { OR: [{ email: data.email }, { id: data.id }] }
    });
  }
};

// src/usecases/user.usecase.ts
var UserUseCase = class {
  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }
  async create(data) {
    const user = await this.userRepository.findByEmailOrId(data);
    if (user)
      throw new ConflictError(
        "O email informado j\xE1 est\xE1 associado a uma conta"
      );
    return await this.userRepository.create(data);
  }
  async auth(data) {
    const user = await this.userRepository.findByEmailOrId(data);
    if (!user) throw new NotFoundError("O Usu\xE1rio n\xE3o foi encontrado ");
    return user;
  }
  async details(data) {
    const user = await this.userRepository.findByEmailOrId(data);
    if (!user) throw new NotFoundError("O Usu\xE1rio n\xE3o foi encontrado");
    return user;
  }
};

// src/middlewares/isAuthenticated.ts
var userRepository = new UserRepositoryPrisma();
var isAuthenticated = async (req, res, next) => {
  const userId = req.headers["userid"];
  if (!userId) throw new UnauthorizedError("O Usu\xE1rio n\xE3o est\xE1 autenticado");
  const user = await userRepository.findByEmailOrId({ id: userId });
  if (!user) throw new UnauthorizedError("O Usu\xE1rio n\xE3o est\xE1 autenticado");
  req.userId = user.id;
  return next();
};

// src/helpers/validators/user.validator.ts
var import_zod2 = require("zod");
var UserValidator = import_zod2.z.object({
  email: import_zod2.z.string().min(
    1,
    "Para continuar, precisamos do seu email. Por favor, forne\xE7a um email v\xE1lido."
  ).email(
    "O formato do email que voc\xEA digitou n\xE3o \xE9 v\xE1lido. Por favor, verifique e insira um email v\xE1lido."
  )
});

// src/routes/user.routes.ts
var UserRoutes = (0, import_express.Router)();
var userUseCase = new UserUseCase();
UserRoutes.post("/register", async (req, res) => {
  const body = UserValidator.parse(req.body);
  const user = await userUseCase.create(body);
  return res.status(201).json(user);
});
UserRoutes.post("/session", async (req, res) => {
  const body = UserValidator.parse(req.body);
  const user = await userUseCase.auth(body);
  return res.json(user);
});
UserRoutes.get("/me", isAuthenticated, async (req, res) => {
  const id = req.userId;
  const user = await userUseCase.details({ id });
  return res.json(user);
});

// src/routes/task.routes.ts
var import_express2 = require("express");

// src/repositories/task.repository.ts
var import_date_fns = require("date-fns");
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

// src/helpers/validators/task.validator.ts
var import_zod3 = require("zod");

// src/utils/regex.ts
var dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

// src/helpers/validators/task.validator.ts
var TaskValidator = import_zod3.z.object({
  title: import_zod3.z.string().min(
    1,
    "Oops! Parece que voc\xEA esqueceu de adicionar um t\xEDtulo para a sua tarefa. Por favor, insira um t\xEDtulo e tente novamente."
  ),
  done: import_zod3.z.coerce.boolean(),
  description: import_zod3.z.string().min(
    1,
    "Parece que a descri\xE7\xE3o da tarefa n\xE3o foi enviada. Por favor, adicione uma descri\xE7\xE3o para continuar."
  ),
  type: import_zod3.z.enum(["study", "gym", "work", "food", "personal", "travel"], {
    message: "O tipo de tarefa selecionado n\xE3o \xE9 v\xE1lido. Por favor, escolha um dos seguintes tipos: study, gym, work, food, personal, travel."
  }),
  when: import_zod3.z.string().refine(
    (date) => dateRegex.test(date),
    "A data que voc\xEA enviou n\xE3o est\xE1 em um formato v\xE1lido. Por favor, certifique-se de enviar a data no formato correto (por exemplo, AAAA-MM-DDTHH:MM.sss) e tente novamente."
  ).transform((date) => new Date(date))
});

// src/routes/task.routes.ts
var TaskRoutes = (0, import_express2.Router)();
var taskUseCase = new TaskUseCase();
TaskRoutes.post("/", isAuthenticated, async (req, res) => {
  const body = TaskValidator.parse(req.body);
  const user_id = req.userId;
  await taskUseCase.create({ ...body, user_id });
  return res.status(201).send();
});
TaskRoutes.get("/all", isAuthenticated, async (req, res) => {
  const user_id = req.userId;
  const task = await taskUseCase.getAll({ user_id });
  return res.json(task);
});
TaskRoutes.get("/today", isAuthenticated, async (req, res) => {
  const user_id = req.userId;
  const task = await taskUseCase.getToday({ user_id });
  return res.json(task);
});
TaskRoutes.get("/week", isAuthenticated, async (req, res) => {
  const user_id = req.userId;
  const task = await taskUseCase.getWeek({ user_id });
  return res.json(task);
});
TaskRoutes.get("/month", isAuthenticated, async (req, res) => {
  const user_id = req.userId;
  const task = await taskUseCase.getMonth({ user_id });
  return res.json(task);
});
TaskRoutes.get("/year", isAuthenticated, async (req, res) => {
  const user_id = req.userId;
  const task = await taskUseCase.getYear({ user_id });
  return res.json(task);
});
TaskRoutes.get("/late", isAuthenticated, async (req, res) => {
  const user_id = req.userId;
  const task = await taskUseCase.late({ user_id });
  return res.json(task);
});
TaskRoutes.get("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const task = await taskUseCase.find({ id });
  return res.json(task);
});
TaskRoutes.delete("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  await taskUseCase.delete({ id });
  return res.status(201).send();
});
TaskRoutes.put("/:id", isAuthenticated, async (req, res) => {
  const body = TaskValidator.parse(req.body);
  const { id } = req.params;
  const user_id = req.userId;
  await taskUseCase.update({ ...body, id, user_id });
  return res.status(200).send();
});
TaskRoutes.patch("/:id/:done", isAuthenticated, async (req, res) => {
  const { id, done } = req.params;
  await taskUseCase.done({ id, done: done === "true" ? true : false });
  return res.status(200).send();
});

// src/server.ts
var app = (0, import_express3.default)();
app.use(import_express3.default.json());
app.use((0, import_cors.default)());
app.use("/user", UserRoutes);
app.use("/task", TaskRoutes);
app.use(hasError);
app.listen(
  process.env.PORT,
  () => console.log(`Server running on PORT ${process.env.PORT}`)
);
