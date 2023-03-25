"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
exports.settings = {
    MONGO_URI: process.env.MONGO_URL || 'mondodb:/0.0.0.0:27817',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "123",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "456"
};
//# sourceMappingURL=settings.js.map