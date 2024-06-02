import express from "express"
import AuthController from "app/controllers/AuthController"
import { useErrorHandler } from "utils/useErrorHandler"

const router = express.Router()
// Login
router.post("/login", useErrorHandler(AuthController.Login))
router.get("/test", (req, res) => { return res.json({ success: true, message: "You did it!" }) })
export default router
