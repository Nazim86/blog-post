"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteUrl = exports.description = exports.nameValidation = void 0;
const express_validator_1 = require("express-validator");
exports.nameValidation = (0, express_validator_1.body)("name").isString().trim().notEmpty().isLength({ max: 15 });
exports.description = (0, express_validator_1.body)("description").isString().trim().notEmpty().isLength({ max: 500 });
exports.websiteUrl = (0, express_validator_1.body)("websiteUrl").isString().trim().notEmpty().isLength({ max: 100 }).matches("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$");
