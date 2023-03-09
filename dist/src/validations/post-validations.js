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
exports.blogIdValidation = exports.contentValidation = exports.descriptionValidation = exports.postNameValidation = void 0;
const express_validator_1 = require("express-validator");
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
exports.postNameValidation = (0, express_validator_1.body)("title").isString().trim().notEmpty().isLength({ max: 30 });
exports.descriptionValidation = (0, express_validator_1.body)("shortDescription").isString().trim().notEmpty().isLength({ max: 100 });
exports.contentValidation = (0, express_validator_1.body)("content").isString().trim().notEmpty().isLength({ max: 1000 });
exports.blogIdValidation = (0, express_validator_1.body)("blogId").isString().trim().notEmpty().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(value) });
    if (!blog) {
        throw new Error();
    }
    else {
        return true;
    }
}));
