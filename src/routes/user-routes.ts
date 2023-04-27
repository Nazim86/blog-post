import {Router} from "express";
import {userInputValidations} from "../validations/user-validations";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {checkUserCredentialsMiddleware} from "../middlewares/check-user-credentials-middleware";
import {userController} from "../composition-root";

export const userRoutes = Router({})

userRoutes.get("/", baseAuthorizationMiddleware, userController.getUsers.bind(userController))

userRoutes.post("/", baseAuthorizationMiddleware, userInputValidations, checkUserCredentialsMiddleware, inputValidationErrorsMiddleware,
    userController.createUser.bind(userController))

userRoutes.delete("/:id", baseAuthorizationMiddleware, userController.deleteUser.bind(userController))
