import express from "express"
import {useErrorHandler} from "utils/useErrorHandler"
import { validateData } from "app/middleware/validation.middeleware"
import { createWalletSchema } from "app/schemas/walletSchema"
import WalletController from "app/controllers/WalletController"

const router = express.Router()

// Create client
router.post("/", validateData(createWalletSchema), useErrorHandler(WalletController.Create))
// get all clients
router.get("/", useErrorHandler(WalletController.GetAll))
// update client
router.patch("/:id", useErrorHandler(WalletController.Update))
// get client by id
router.get("/:id", useErrorHandler(WalletController.Get))
// delete client
router.delete("/:id", useErrorHandler(WalletController.Delete))

export default router
