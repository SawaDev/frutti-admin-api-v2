import express from "express"
import { useErrorHandler } from "utils/useErrorHandler"
import UploadController from "controllers/UploadController"
import multer from 'multer'

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const router = express.Router()

// Upload image
router.post("/", upload.single('picture'), useErrorHandler(UploadController.Upload))

export default router
