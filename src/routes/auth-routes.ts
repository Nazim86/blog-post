import { Router} from "express";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {authValidations, confirmationCodeValidation, recoveryCodeValidation} from "../validations/auth-validations";
import {
    emailValidation,
    newPasswordValidation,
    userInputValidations
} from "../validations/user-validations";
import {
    checkUsersAccountsCredentialsMiddleware
} from "../middlewares/check-user-account-credentials-middleware";
import {checkRefreshTokenMiddleware} from "../middlewares/check-refreshToken-middleware";
import {checkIpLimitMiddleware} from "../middlewares/check-ip-limit-middleware";
import {container} from "../composition-root";
import {AuthController} from "../controllers/auth-controller";


export const authRoutes = Router({});

const authController = container.resolve(AuthController)


authRoutes.post('/registration', checkIpLimitMiddleware, userInputValidations, checkUsersAccountsCredentialsMiddleware, inputValidationErrorsMiddleware,
    authController.userRegistration.bind(authController));

authRoutes.post('/registration-email-resending', checkIpLimitMiddleware, emailValidation, inputValidationErrorsMiddleware,
    authController.reSendRegistrationEmail.bind(authController));

authRoutes.post('/registration-confirmation', checkIpLimitMiddleware, confirmationCodeValidation, inputValidationErrorsMiddleware,
    authController.confirmRegistration.bind(authController));

authRoutes.post('/login', checkIpLimitMiddleware, authValidations, inputValidationErrorsMiddleware,
    authController.userLogining.bind(authController));

authRoutes.post('/refresh-token', checkRefreshTokenMiddleware,
    authController.getNewRefreshToken.bind(authController));

authRoutes.get('/me', checkRefreshTokenMiddleware, authController.getCurrentUser.bind(authController))

authRoutes.post('/password-recovery', checkIpLimitMiddleware, emailValidation, inputValidationErrorsMiddleware,
    authController.sendPasswordRecoveryCode.bind(authController));

authRoutes.post('/new-password', checkIpLimitMiddleware, newPasswordValidation, recoveryCodeValidation, inputValidationErrorsMiddleware,
    authController.setNewPassword.bind(authController));

authRoutes.post('/logout', checkRefreshTokenMiddleware,
    authController.logout.bind(authController));





