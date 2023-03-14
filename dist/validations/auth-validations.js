"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidations = exports.passwordValidation = exports.loginOrEmailValidation = void 0;
const express_validator_1 = require("express-validator");
exports.loginOrEmailValidation = (0, express_validator_1.body)("loginOrEmail").isString().trim().notEmpty();
exports.passwordValidation = (0, express_validator_1.body)("password").isString().trim().notEmpty();
exports.authValidations = [exports.loginOrEmailValidation, exports.passwordValidation];
//# sourceMappingURL=auth-validations.js.map