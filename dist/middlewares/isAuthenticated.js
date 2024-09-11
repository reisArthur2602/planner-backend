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

// src/middlewares/isAuthenticated.ts
var isAuthenticated_exports = {};
__export(isAuthenticated_exports, {
  isAuthenticated: () => isAuthenticated
});
module.exports = __toCommonJS(isAuthenticated_exports);

// src/helpers/error.ts
var AplicationError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};
var UnauthorizedError = class extends AplicationError {
  constructor(message) {
    super(message, 401);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isAuthenticated
});
