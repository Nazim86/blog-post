import {Router} from "express";
import {checkRefreshTokenMiddleware} from "../middlewares/check-refreshToken-middleware";
import {deviceIdValidation} from "../validations/device-validations";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {securityController} from "../composition-root";


export const securityRoutes = Router({})


securityRoutes.get("/devices", checkRefreshTokenMiddleware, securityController.getDevices.bind(securityController))

securityRoutes.delete("/devices", checkRefreshTokenMiddleware, securityController.deleteDevices.bind(securityController))

securityRoutes.delete("/devices/:id", deviceIdValidation, inputValidationErrorsMiddleware, checkRefreshTokenMiddleware,
    securityController.deleteDeviceByDeviceId.bind(securityController))

