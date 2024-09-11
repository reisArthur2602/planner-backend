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

// src/middlewares/hasError.ts
var hasError_exports = {};
__export(hasError_exports, {
  hasError: () => hasError
});
module.exports = __toCommonJS(hasError_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hasError
});
