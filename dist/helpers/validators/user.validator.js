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

// src/helpers/validators/user.validator.ts
var user_validator_exports = {};
__export(user_validator_exports, {
  UserValidator: () => UserValidator
});
module.exports = __toCommonJS(user_validator_exports);
var import_zod = require("zod");
var UserValidator = import_zod.z.object({
  email: import_zod.z.string().min(
    1,
    "Para continuar, precisamos do seu email. Por favor, forne\xE7a um email v\xE1lido."
  ).email(
    "O formato do email que voc\xEA digitou n\xE3o \xE9 v\xE1lido. Por favor, verifique e insira um email v\xE1lido."
  )
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserValidator
});
