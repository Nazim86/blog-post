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
exports.checkUserByAccessTokenMiddleware = void 0;
const jwt_service_1 = require("../domain/jwt-service");
const settings_1 = require("../settings");
const auth_service_1 = require("../domain/auth-service");
const checkUserByAccessTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.sendStatus(401);
        return;
    }
    const token = req.headers.authorization.split(" ")[1];
    const userId = yield jwt_service_1.jwtService.getUserIdByToken(token, settings_1.settings.ACCESS_TOKEN_SECRET);
    if (!userId) {
        res.sendStatus(401);
    }
    else {
        req.context = {};
        req.context.user = yield auth_service_1.authService.findUserById(userId);
        next();
    }
});
exports.checkUserByAccessTokenMiddleware = checkUserByAccessTokenMiddleware;
//# sourceMappingURL=check-user-by-accessToken-middleware.js.map