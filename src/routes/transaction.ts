import express from "express"
import {useErrorHandler} from "utils/useErrorHandler"
import TransactionController from "app/controllers/TransactionController"

const router = express.Router()

// Create transaction
router.post("/", useErrorHandler(TransactionController.Create))
// get all transactions
router.get("/", useErrorHandler(TransactionController.GetAll))
// update transaction
router.patch("/:id", useErrorHandler(TransactionController.Update))
// get transaction by id
router.get("/:id", useErrorHandler(TransactionController.Get))
// delete transaction
router.delete("/:id", useErrorHandler(TransactionController.Delete))

export default router
