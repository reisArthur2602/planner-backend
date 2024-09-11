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

// src/usecases/user.usecase.ts
var user_usecase_exports = {};
__export(user_usecase_exports, {
  UserUseCase: () => UserUseCase
});
module.exports = __toCommonJS(user_usecase_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserUseCase
});
