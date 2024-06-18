import express from "express"
import {useErrorHandler} from "utils/useErrorHandler"
import WalletController from "app/controllers/WalletController"

const router = express.Router()

// Create currency
router.post("/", useErrorHandler(WalletController.Create))
// get all currencies
router.get("/", useErrorHandler(WalletController.GetAll))
// update currency
router.patch("/:id", useErrorHandler(WalletController.Update))
// get currency by id
router.get("/:id", useErrorHandler(WalletController.Get))
// delete currency
router.delete("/:id", useErrorHandler(WalletController.Delete))

export default router
