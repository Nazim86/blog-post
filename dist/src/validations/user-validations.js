"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInputValidations = exports.emailValidation = exports.passwordValidation = exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidation = (0, express_validator_1.body)('login').isString().trim().notEmpty().isLength({ min: 3, max: 10 }).matches('^[a-zA-Z0-9_-]*$');
exports.passwordValidation = (0, express_validator_1.body)('password').isString().trim().notEmpty().isLength({ min: 6, max: 20 });
exports.emailValidation = (0, express_validator_1.body)('email').isString().trim().notEmpty().matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
exports.userInputValidations = [exports.loginValidation, exports.passwordValidation, exports.emailValidation];
