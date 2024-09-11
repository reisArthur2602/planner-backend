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

// src/routes/user.routes.ts
var user_routes_exports = {};
__export(user_routes_exports, {
  UserRoutes: () => UserRoutes
});
module.exports = __toCommonJS(user_routes_exports);
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
var import_zod = require("zod");
var UserValidator = import_zod.z.object({
  email: import_zod.z.string().min(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserRoutes
});
