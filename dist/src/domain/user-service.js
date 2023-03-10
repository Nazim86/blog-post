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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_in_db_memory_1 = require("../repositories/user-in-db-memory");
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userService = {
    createNewUser(login, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcrypt_1.default.genSalt(10);
            const passwordHash = yield this._generateHash(password, passwordSalt);
            const newUser = {
                _id: new mongodb_1.ObjectId(),
                login: login,
                passwordHash,
                passwordSalt,
                email: email,
                createdAt: new Date().toISOString()
            };
            return yield user_in_db_memory_1.userRepository.createNewUser(newUser);
        });
    },
    _generateHash(password, passwordSalt) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield bcrypt_1.default.hash(password, passwordSalt);
            return hash;
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_in_db_memory_1.userRepository.deleteUser(id);
        });
    },
    checkCredentials(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_in_db_memory_1.userRepository.checkCredentials(loginOrEmail);
            if (!user)
                return user;
            const passwordSalt = user.passwordSalt;
            const passwordHash = yield this._generateHash(password, passwordSalt);
            if (passwordHash !== user.passwordHash) {
                return user;
            }
            return user;
        });
    },
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_in_db_memory_1.userRepository.findUserById(userId);
        });
    }
};
