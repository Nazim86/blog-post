"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseAuthorizationMiddleware = void 0;
const baseAuthorizationMiddleware = (req, res, next) => {
    const userLoginPassword = req.headers.authorization;
    const encodedLoginPassword = Buffer.from("admin:qwerty", 'utf8').toString('base64');
    if (userLoginPassword != "Basic " + encodedLoginPassword) {
        return res.send(401);
    }
    else {
        next();
    }
};
exports.baseAuthorizationMiddleware = baseAuthorizationMiddleware;
