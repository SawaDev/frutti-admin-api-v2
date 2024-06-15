import express from "express"
import {useErrorHandler} from "utils/useErrorHandler"
import UserController from "controllers/UserController"
import { validateData } from "app/middleware/validation.middeleware"
import { createUserSchema } from "app/schemas/userSchema"

const router = express.Router()

// Create user
router.post("/", validateData(createUserSchema), useErrorHandler(UserController.Create))
// get all users
router.get("/", useErrorHandler(UserController.GetAll))
// update user
router.patch("/:id", useErrorHandler(UserController.Update))
// get user by id
router.get("/:id", useErrorHandler(UserController.Get))
// delete user
router.delete("/:id", useErrorHandler(UserController.Delete))

export default router
