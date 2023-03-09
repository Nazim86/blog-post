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
exports.checkUserCredentialsMiddleware = void 0;
const db_1 = require("../db/db");
const checkUserCredentialsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const login = req.body.login;
    const email = req.body.email;
    const checkCredentials = yield db_1.usersCollection.findOne({ $or: [{ login: login }, { email: email }] });
    if (checkCredentials) {
        res.status(400).send("This user exists in the system");
    }
    else {
        next();
    }
});
exports.checkUserCredentialsMiddleware = checkUserCredentialsMiddleware;
