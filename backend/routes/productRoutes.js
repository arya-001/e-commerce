import express from "express";
import formidable from "express-formidable";
// import { createProduct } from "../controllers/productController";
// import productController from "../controllers/productController.js";
import {
  createProduct,
  getProducts,
  getOneProduct,
  getProductImage,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
const router = express.Router();
router.use((req, res, next) => {
  formidable()(req, res, next);
});
//Apply formidable middleware separately
// router.use((req, res, next) => {
//   formidable()(req, res, next);
// });

// Now, define the route handler
router.post("/create-product", formidable(), createProduct);

router.put("/update-product/:pid", formidable(), updateProduct);

router.get("/get-products", getProducts);

router.get("/get-one-product/:id", getOneProduct);

router.get("/product-image/:pid", getProductImage);

router.delete("/product-delete/:pid", deleteProduct);

// router.use((req, res, next) => {
//   console.log(`Function called: ${req.method} ${req.originalUrl}`);
//   next(); // Call next middleware or route handler
// });

export default router;
