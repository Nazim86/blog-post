"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const auth_validations_1 = require("../validations/auth-validations");
const user_service_1 = require("../domain/user-service");
exports.authRoutes = (0, express_1.Router)({});
exports.authRoutes.post('/', auth_validations_1.authValidations, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginOrEmail, password } = req.body;
    const checkCredentials = yield user_service_1.userService.checkCredentials(loginOrEmail, password);
    if (checkCredentials) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(401);
    }
}));
