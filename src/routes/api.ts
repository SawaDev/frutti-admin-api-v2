import express from "express"
import AuthController from "app/controllers/AuthController"
import {useErrorHandler} from "utils/useErrorHandler"

const router = express.Router()
// Login
router.post("/login", useErrorHandler(AuthController.Login))

export default router
