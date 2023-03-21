"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMapping = void 0;
const userMapping = (newUser) => {
    return newUser.map((user) => {
        return {
            id: user._id.toString(),
            login: user.accountData.login,
            email: user.accountData.email,
            createdAt: user.accountData.createdAt
        };
    });
};
exports.userMapping = userMapping;
//# sourceMappingURL=user-mapping.js.map