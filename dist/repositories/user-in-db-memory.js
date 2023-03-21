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
exports.userRepository = void 0;
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
exports.userRepository = {
    createNewUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.usersAccountsCollection.insertOne(newUser);
            return {
                id: newUser._id.toString(),
                login: newUser.accountData.login,
                email: newUser.accountData.email,
                createdAt: newUser.accountData.createdAt
            };
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.usersAccountsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
                return result.deletedCount === 1;
            }
            catch (e) {
                return false;
            }
        });
    },
    checkCredentials(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.usersAccountsCollection.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] });
        });
    },
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.usersAccountsCollection.findOne({ _id: new mongodb_1.ObjectId(userId) });
            if (result) {
                return {
                    email: result.accountData.email,
                    login: result.accountData.login,
                    userId: result._id.toString()
                };
            }
            else {
                return null;
            }
        });
    }
};
//# sourceMappingURL=user-in-db-memory.js.map