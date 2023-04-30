import {Router} from "express";
import {userInputValidations} from "../validations/user-validations";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {checkUserCredentialsMiddleware} from "../middlewares/check-user-credentials-middleware";
import {container} from "../composition-root";
import {UserController} from "../controllers/user-controller";

export const userRoutes = Router({})

const userController = container.resolve(UserController)

userRoutes.get("/", baseAuthorizationMiddleware, userController.getUsers.bind(userController))

userRoutes.post("/", baseAuthorizationMiddleware, userInputValidations, checkUserCredentialsMiddleware, inputValidationErrorsMiddleware,
    userController.createUser.bind(userController))

userRoutes.delete("/:id", baseAuthorizationMiddleware, userController.deleteUser.bind(userController))
