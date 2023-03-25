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
exports.checkRefreshTokenMiddleware = void 0;
const jwt_service_1 = require("../domain/jwt-service");
const settings_1 = require("../settings");
const auth_service_1 = require("../domain/auth-service");
const db_1 = require("../db/db");
const checkRefreshTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    const expiredTokens = yield db_1.tokensCollection.findOne({ refreshToken: refreshToken });
    if (!req.cookies.refreshToken || expiredTokens) {
        res.sendStatus(401);
        return;
    }
    const userId = yield jwt_service_1.jwtService.getUserIdByToken(refreshToken, settings_1.settings.REFRESH_TOKEN_SECRET);
    if (!userId) {
        res.sendStatus(401);
    }
    else {
        req.context = {};
        req.context.user = yield auth_service_1.authService.findUserById(userId);
        next();
    }
});
exports.checkRefreshTokenMiddleware = checkRefreshTokenMiddleware;
//# sourceMappingURL=check-refreshToken-middleware.js.map