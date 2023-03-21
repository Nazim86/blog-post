"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage = void 0;
const errorMessage = (msg, field) => {
    return {
        errorsMessages: [{
                message: msg,
                field: field
            }]
    };
};
exports.errorMessage = errorMessage;
//# sourceMappingURL=error-handler.js.map