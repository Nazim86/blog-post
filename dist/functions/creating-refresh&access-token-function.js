"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_service_1 = require("../domain/jwt-service");
const settings_1 = require("../settings");
const creatingRefreshAccessToken = (user) => {
    const accessToken = yield jwt_service_1.jwtService.createJWT(user, settings_1.settings.ACCESS_TOKEN_SECRET, "10s");
    const refreshToken = yield jwt_service_1.jwtService.createJWT(user, settings_1.settings.REFRESH_TOKEN_SECRET, "20s");
    res.cookie('refreshToken', refreshToken, { httpOnly: true,
        sameSite: 'strict', secure: true,
        maxAge: 24 * 60 * 60 * 1000 });
};
//# sourceMappingURL=creating-refresh&access-token-function.js.map