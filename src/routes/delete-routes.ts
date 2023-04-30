import {Router} from "express";
import {DeleteController} from "../controllers/delete-controller";


export const deleteRoutes = Router({})

const deleteController = new DeleteController()

deleteRoutes.delete('/', deleteController.deleteRoutes.bind(deleteController))
