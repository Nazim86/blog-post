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
exports.userRouter = void 0;
const express_1 = require("express");
const pagination_values_1 = require("../functions/pagination-values");
const user_validations_1 = require("../validations/user-validations");
const user_service_1 = require("../domain/user-service");
const base_auth_middlewares_1 = require("../middlewares/base-auth-middlewares");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const user_query_repo_1 = require("../query-repositories/user-query-repo");
const check_user_credentials_middleware_1 = require("../middlewares/check-user-credentials-middleware");
exports.userRouter = (0, express_1.Router)({});
exports.userRouter.get("/", base_auth_middlewares_1.baseAuthorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm } = (0, pagination_values_1.getPaginationValues)(req.query);
    const getUsers = yield user_query_repo_1.userQueryRepo.getUsers(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm);
    res.status(200).send(getUsers);
}));
exports.userRouter.post("/", base_auth_middlewares_1.baseAuthorizationMiddleware, user_validations_1.userInputValidations, check_user_credentials_middleware_1.checkUserCredentialsMiddleware, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const login = req.body.login;
    const password = req.body.password;
    const email = req.body.email;
    const newUser = yield user_service_1.userService.createNewUser(login, password, email);
    if (newUser) {
        res.status(201).send(newUser);
    }
}));
exports.userRouter.delete("/:id", base_auth_middlewares_1.baseAuthorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deleteUser = yield user_service_1.userService.deleteUser(id);
    if (deleteUser) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
