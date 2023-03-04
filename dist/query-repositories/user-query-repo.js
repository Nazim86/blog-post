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
exports.userQueryRepo = void 0;
const db_1 = require("../db/db");
const user_mapping_1 = require("../mapping/user-mapping");
exports.userQueryRepo = {
    getUsers(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = (pageNumber - 1) * pageSize;
            const filter = { login: { $regex: searchLoginTerm !== null && searchLoginTerm !== void 0 ? searchLoginTerm : "", $options: 'i' }, email: { $regex: searchEmailTerm !== null && searchEmailTerm !== void 0 ? searchEmailTerm : "", $options: "i" } };
            const totalCount = yield db_1.usersCollection.countDocuments(filter);
            const pagesCount = Math.ceil(totalCount / pageSize);
            const getUsers = yield db_1.usersCollection.find(filter)
                .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
                .skip(skipSize)
                .limit(pageSize)
                .toArray();
            const mappedUsers = (0, user_mapping_1.userMapping)(getUsers);
            return {
                pagesCount: pagesCount,
                page: pageSize,
                totalCount: totalCount,
                items: mappedUsers
            };
        });
    }
};
