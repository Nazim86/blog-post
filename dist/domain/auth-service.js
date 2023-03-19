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
exports.authService = void 0;
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_db_repository_1 = require("../repositories/auth-db-repository");
const uuid_1 = require("uuid");
const add_1 = __importDefault(require("date-fns/add"));
const email_manager_1 = require("../managers/email-manager");
exports.authService = {
    createNewUser(login, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcrypt_1.default.genSalt(10);
            const passwordHash = yield this._generateHash(password, passwordSalt);
            const newUser = {
                _id: new mongodb_1.ObjectId(),
                accountData: {
                    login: login,
                    passwordHash,
                    email: email,
                    createdAt: new Date().toISOString()
                },
                emailConfirmation: {
                    confirmationCode: (0, uuid_1.v4)(),
                    emailExpiration: (0, add_1.default)(new Date(), {
                        hours: 1,
                        minutes: 3
                    })
                }
            };
            const createUser = yield auth_db_repository_1.authRepository.createNewUser(newUser);
            try {
                yield email_manager_1.emailManager.sendConfirmationEmail(createUser);
            }
            catch (e) {
                return null;
            }
            return createUser;
        });
    },
    _generateHash(password, passwordSalt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, passwordSalt);
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield auth_db_repository_1.authRepository.deleteUser(id);
        });
    },
    checkCredentials(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_db_repository_1.authRepository.checkCredentials(loginOrEmail);
            if (!user)
                return null;
            const passwordSalt = user.passwordSalt;
            const passwordHash = yield this._generateHash(password, passwordSalt);
            if (passwordHash !== user.passwordHash) {
                return null;
            }
            return user;
        });
    },
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield auth_db_repository_1.authRepository.findUserById(userId);
        });
    }
};
//# sourceMappingURL=auth-service.js.map