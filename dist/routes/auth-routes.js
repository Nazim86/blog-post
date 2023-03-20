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
const input_validation_errors_middleware_1 = require("../middlewares/input-validation-errors-middleware");
const auth_validations_1 = require("../validations/auth-validations");
const jwt_service_1 = require("../domain/jwt-service");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const user_validations_1 = require("../validations/user-validations");
const auth_service_1 = require("../domain/auth-service");
const user_service_1 = require("../domain/user-service");
const check_user_account_credentials_middleware_1 = require("../middlewares/check-user-account-credentials-middleware");
exports.authRoutes = (0, express_1.Router)({});
exports.authRoutes.post('/login', auth_validations_1.authValidations, input_validation_errors_middleware_1.inputValidationErrorsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginOrEmail, password } = req.body;
    const user = yield user_service_1.userService.checkCredentials(loginOrEmail, password);
    if (!user) {
        res.sendStatus(401);
    }
    else {
        const token = yield jwt_service_1.jwtService.createJWT(user);
        res.status(200).send({ accessToken: token });
    }
}));
exports.authRoutes.post('/registration', user_validations_1.userInputValidations, check_user_account_credentials_middleware_1.checkUsersAccountsCredentialsMiddleware, input_validation_errors_middleware_1.inputValidationErrorsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password, email } = req.body;
    const newUser = yield auth_service_1.authService.createNewUser(login, password, email);
    if (newUser) {
        res.status(204).send(newUser);
    }
}));
exports.authRoutes.post('/registration-confirmation', auth_validations_1.confirmationCodeValidation, input_validation_errors_middleware_1.inputValidationErrorsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const confirmationCode = req.body.code;
    const registrationConfirmation = yield auth_service_1.authService.registrationConfirmation(confirmationCode);
    if (registrationConfirmation) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(400);
    }
}));
exports.authRoutes.post('/registration-email-resending', user_validations_1.emailValidation, input_validation_errors_middleware_1.inputValidationErrorsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const emailResending = yield auth_service_1.authService.resendEmail(email);
    if (!emailResending)
        res.sendStatus(400);
    res.sendStatus(204);
}));
//TODO also fix get here
exports.authRoutes.get('/me', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getCurrentUser = req.context.user;
    res.status(200).send(getCurrentUser);
}));
//# sourceMappingURL=auth-routes.js.map