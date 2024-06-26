import express from "express"
import {useErrorHandler} from "utils/useErrorHandler"
import { validateData } from "app/middleware/validation.middeleware"
import { createWalletSchema } from "app/schemas/walletSchema"
import WalletController from "app/controllers/WalletController"

const router = express.Router()

// Create wallet
router.post("/", validateData(createWalletSchema), useErrorHandler(WalletController.Create))
// get all wallets
router.get("/", useErrorHandler(WalletController.GetAll))
// update wallet
router.patch("/:id", useErrorHandler(WalletController.Update))
// get wallet by id
router.get("/:id", useErrorHandler(WalletController.Get))
// delete wallet
router.delete("/:id", useErrorHandler(WalletController.Delete))

export default router
