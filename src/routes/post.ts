import express from "express"

import PostController from "controllers/PostController"
import { useErrorHandler } from "utils/useErrorHandler"
import { validateData } from "app/middleware/validation.middeleware"
import { createPostSchema, detailSchema, updatePostSchema } from "app/schemas/postSchema"

const router = express.Router()

router.post("/", validateData(createPostSchema), useErrorHandler(PostController.Create))
router.get("/", useErrorHandler(PostController.GetAll))
router.post("/many", useErrorHandler(PostController.CreateMany))
router.patch("/many", useErrorHandler(PostController.CreateManyDetail))
router.get("/:id", useErrorHandler(PostController.Get))
router.patch("/:id", validateData(updatePostSchema), useErrorHandler(PostController.Update))
router.delete("/:id", useErrorHandler(PostController.Delete))
router.post("/:id/details", validateData(detailSchema), useErrorHandler(PostController.AddDetail))
router.patch("/:id/details/:detailId", validateData(detailSchema), useErrorHandler(PostController.UpdateDetail))
router.post("/:id/details/:detailId/copy", useErrorHandler(PostController.CopyDetail))
router.delete("/:id/details/:detailId", useErrorHandler(PostController.DeleteDetail))

export default router
