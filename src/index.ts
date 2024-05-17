import "dotenv/config"
import "module-alias/register"
import express from "express"
import path from "path"
import logger from "morgan"
import bodyParser from 'body-parser'

import apiRouter from "routes/api"
import userRouter from "routes/user"
import postRouter from "routes/post"
import uploadRouter from "routes/upload"
import errorConfig from "config/error.config"
import i18n from "config/i18n.config"
import { corsConfig } from "config/cors.config"
import { verifyToken } from "app/middleware/verify-user"

export const app = express()

app.disable("x-powered-by")
app.use(i18n.init)
app.use(corsConfig)
app.use(logger("dev"))
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false, limit: "2mb" }))
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.static(path.join(__dirname, "resources")))

app.use("/api", apiRouter)
app.use("/api/users", verifyToken, userRouter)
app.use("/api/posts", verifyToken, postRouter)
app.use("/api/upload", verifyToken, uploadRouter)

app.use(errorConfig.logErrors)
app.use(errorConfig.clientErrorHandler)
app.use(errorConfig.errorHandler)

const port = process.env.PORT || "8000"

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

export default app
