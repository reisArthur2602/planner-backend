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

// src/helpers/error.ts
var error_exports = {};
__export(error_exports, {
  AplicationError: () => AplicationError,
  BadRequestError: () => BadRequestError,
  ConflictError: () => ConflictError,
  NotFoundError: () => NotFoundError,
  UnauthorizedError: () => UnauthorizedError
});
module.exports = __toCommonJS(error_exports);
var AplicationError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};
var BadRequestError = class extends AplicationError {
  constructor(message) {
    super(message, 400);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AplicationError,
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError
});
