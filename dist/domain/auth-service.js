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
const db_1 = require("../db/db");
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
                    passwordSalt,
                    email: email,
                    createdAt: new Date().toISOString()
                },
                emailConfirmation: {
                    confirmationCode: (0, uuid_1.v4)(),
                    emailExpiration: (0, add_1.default)(new Date(), {
                        hours: 1,
                        minutes: 3
                    }),
                    isConfirmed: false,
                    sentEmailsByDate: new Date()
                }
            };
            const createUser = yield auth_db_repository_1.authRepository.createNewUser(newUser);
            try {
                yield email_manager_1.emailManager.sendConfirmationEmail(createUser.emailConfirmation.confirmationCode, createUser.accountData.email);
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
    registrationConfirmation(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_db_repository_1.authRepository.findUserByConfirmationCode(code);
            if (!user)
                return false;
            if (user.emailConfirmation.isConfirmed)
                return false;
            if (user.emailConfirmation.confirmationCode !== code)
                return false;
            if (user.emailConfirmation.emailExpiration < new Date())
                return false;
            return yield auth_db_repository_1.authRepository.updateConfirmation(user._id);
        });
    },
    resendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_db_repository_1.authRepository.findUserByEmail(email);
            if (!user)
                return false;
            if (user.emailConfirmation.isConfirmed)
                return false;
            if (user.emailConfirmation.emailExpiration < new Date())
                return false;
            try {
                //Checking time difference between last email sent date. Should be more than 10 sec. to send again
                if (new Date().getTime() - user.emailConfirmation.sentEmailsByDate.getTime() < 10000) {
                    return "Try";
                }
                const newCode = (0, uuid_1.v4)();
                console.log(user.emailConfirmation.sentEmailsByDate);
                yield db_1.usersAccountsCollection.updateMany({ _id: user._id }, [{ $set: { "emailConfirmation.confirmationCode": newCode } },
                    { $set: { "emailConfirmation.sentEmailsByDate": new Date() } }]);
                yield email_manager_1.emailManager.sendConfirmationEmail(newCode, user.accountData.email);
            }
            catch (e) {
                return false;
            }
            return true;
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
            if (!user.emailConfirmation.isConfirmed)
                return null;
            const passwordSalt = user.accountData.passwordSalt;
            const passwordHash = yield this._generateHash(password, passwordSalt);
            if (passwordHash !== user.accountData.passwordHash)
                return null;
            return user;
        });
    },
};
//# sourceMappingURL=auth-service.js.map