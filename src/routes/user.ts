import express from "express"
import {useErrorHandler} from "utils/useErrorHandler"
import UserController from "controllers/UserController"

const router = express.Router()

// Create user
router.post("/", UserController.UserRegistrationValidate, useErrorHandler(UserController.Create))
// get all users
router.get("/", useErrorHandler(UserController.GetAll))
// update user
router.patch("/:id", useErrorHandler(UserController.Update))
// get user by id
router.get("/:id", useErrorHandler(UserController.Get))
// delete user
router.delete("/:id", useErrorHandler(UserController.Delete))

export default router
