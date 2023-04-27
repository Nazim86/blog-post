import {Router} from "express";
import {deleteController} from "../composition-root";


export const deleteRoutes = Router({})

deleteRoutes.delete('/', deleteController.deleteRoutes.bind(deleteController))
