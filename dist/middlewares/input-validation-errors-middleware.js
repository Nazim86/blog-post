"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationErrorsMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationErrorsMiddleware = (req, res, next) => {
    const errorsMessages = (0, express_validator_1.validationResult)(req);
    if (!errorsMessages.isEmpty()) {
        const errorsResponse = errorsMessages.array({ onlyFirstError: true }).map(err => ({
            message: err.msg,
            field: err.param
        }));
        return res.status(400).json({ errorsMessages: errorsResponse });
    }
    else {
        next();
    }
};
exports.inputValidationErrorsMiddleware = inputValidationErrorsMiddleware;
//# sourceMappingURL=input-validation-errors-middleware.js.map