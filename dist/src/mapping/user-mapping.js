"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMapping = void 0;
const userMapping = (newUser) => {
    return newUser.map((user) => {
        return {
            id: user._id.toString(),
            login: user.login,
            email: user.email,
            createdAt: user.createdAt
        };
    });
};
exports.userMapping = userMapping;
