import express from "express";
import {
  getCategories,
  getSizes,
  getColors,
} from "../controllers/filterController.js";

const router = express.Router();

// Routes for fetching filter options
router.get("/categories", getCategories);
router.get("/sizes", getSizes);
router.get("/colors", getColors);

export default router;
