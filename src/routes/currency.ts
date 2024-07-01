import express from "express"
import {useErrorHandler} from "utils/useErrorHandler"
import CurrencyController from "app/controllers/CurrencyController"

const router = express.Router()

// Create currency
router.post("/", useErrorHandler(CurrencyController.Create))
// get all currencies
router.get("/", useErrorHandler(CurrencyController.GetAll))
// update currency
router.patch("/:id", useErrorHandler(CurrencyController.Update))
// get currency by id
router.get("/:id", useErrorHandler(CurrencyController.Get))
// delete currency
router.delete("/:id", useErrorHandler(CurrencyController.Delete))

export default router
