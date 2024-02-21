import express from "express";
//import formidable from "express-formidable";
import {
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
  getOneCategory,
  getOneCategoryById,
} from "../controllers/categoryController.js";

const router = express.Router();

// router.use((req, res, next) => {
//   formidable()(req, res, next);
// });

router.post("/create-category", createCategory);
router.put("/update-category/:id", updateCategory);
router.get("/get-category", getCategory);
router.delete("/delete-category/:id", deleteCategory);
router.get("/get-one-category/:name", getOneCategory);
router.get("/get-id-category/:id", getOneCategoryById);

export default router;
