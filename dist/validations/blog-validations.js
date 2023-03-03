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
exports.ParamBlogIdValidation = exports.postForBlogValidations = exports.contentValidation = exports.shortDescriptionValidation = exports.titleValidation = exports.queryValidations = exports.pageSizeValidation = exports.pageNumberValidation = exports.sortDirectionValidation = exports.sortByValidation = exports.searchNameValidation = exports.websiteUrl = exports.description = exports.nameValidation = void 0;
const express_validator_1 = require("express-validator");
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
exports.nameValidation = (0, express_validator_1.body)("name").isString().trim().notEmpty().isLength({ max: 15 });
exports.description = (0, express_validator_1.body)("description").isString().trim().notEmpty().isLength({ max: 500 });
exports.websiteUrl = (0, express_validator_1.body)("websiteUrl").isString().trim().notEmpty().isLength({ max: 100 }).matches("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$");
exports.searchNameValidation = (0, express_validator_1.query)('searchName').isString();
exports.sortByValidation = (0, express_validator_1.query)('sortBy').isString();
exports.sortDirectionValidation = (0, express_validator_1.query)('sortDirection').isString();
exports.pageNumberValidation = (0, express_validator_1.query)('pageNumber').isNumeric();
exports.pageSizeValidation = (0, express_validator_1.query)('pageSize').isNumeric();
exports.queryValidations = [exports.searchNameValidation, exports.sortByValidation, exports.sortDirectionValidation, exports.pageSizeValidation, exports.pageNumberValidation];
exports.titleValidation = (0, express_validator_1.body)('title').isString().trim().notEmpty().isLength({ max: 30 });
exports.shortDescriptionValidation = (0, express_validator_1.body)('shortDescription').isString().trim().notEmpty().isLength({ max: 100 });
exports.contentValidation = (0, express_validator_1.body)('content').isString().trim().notEmpty().isLength({ max: 1000 });
exports.postForBlogValidations = [exports.titleValidation, exports.shortDescriptionValidation, exports.contentValidation];
exports.ParamBlogIdValidation = (0, express_validator_1.param)("blogId").isString().trim().notEmpty().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = yield db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(value) });
    if (!blogId) {
        throw new Error();
    }
    else {
        return true;
    }
}));
