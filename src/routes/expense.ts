import ExpenseController from "app/controllers/ExpenseController"
import express from "express"
import {useErrorHandler} from "utils/useErrorHandler"

const router = express.Router()

// Create expense
router.post("/", useErrorHandler(ExpenseController.Create))
// get all expenses
router.get("/", useErrorHandler(ExpenseController.GetAll))
// get all expense categories
router.get("/categories", useErrorHandler(ExpenseController.GetAllExpenseCategories))
// Create expense category
router.post("/categories", useErrorHandler(ExpenseController.CreateCategory))
// Update expense category
router.put("/categories", useErrorHandler(ExpenseController.UpdateCategory))
// get expense by id
router.get("/:id", useErrorHandler(ExpenseController.Get))
// delete expense
router.delete("/:id", useErrorHandler(ExpenseController.Delete))

export default router
