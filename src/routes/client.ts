import express from "express"
import {useErrorHandler} from "utils/useErrorHandler"
import { validateData } from "app/middleware/validation.middeleware"
import { createClientSchema } from "app/schemas/clientSchema"
import ClientController from "app/controllers/ClientController"

const router = express.Router()

// Create client
router.post("/", validateData(createClientSchema), useErrorHandler(ClientController.Create))
// get all clients
router.get("/", useErrorHandler(ClientController.GetAll))
// update client
router.patch("/:id", useErrorHandler(ClientController.Update))
// get client by id
router.get("/:id", useErrorHandler(ClientController.Get))
// delete client
router.delete("/:id", useErrorHandler(ClientController.Delete))

export default router
