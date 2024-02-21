import productModel from "../models/productModel.js";
import fs from "fs";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  //const page = parseInt(req.query.page) || 1;
  //  const perPage = parseInt(req.query.perPage) || 10; // Set a default value for perPage

  try {
    // const totalCount = await productModel.countDocuments();
    const products = await productModel
      .find({})
      .select("-thumbnail")
      .populate("category")
      .sort({ createdAt: -1 });
    // .skip((page - 1) * perPage)
    // .limit(perPage);
    res.status(201).json({
      success: true,
      message: "Products displayed",
      //totalCount: products.length,
      //  currentPage: page,
      totalCount: products.length,
      products,
    });
  } catch (error) {
    console.log("Error occurred:", error);
    res
      .status(500)
      .json({ success: false, error, message: "Error in getting product" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      colors,
      sizes,
      discountPrice,
      deleted,
    } = req.fields;

    // Check for missing required fields
    for (const [key, value] of Object.entries(req.fields)) {
      if (!value) {
        return res.status(400).json({ error: `${key} is required` });
      }
    }

    // Ensure discountPrice is a valid number
    const numericDiscountPrice = parseFloat(discountPrice);
    if (isNaN(numericDiscountPrice)) {
      return res
        .status(400)
        .json({ error: "Discount price must be a valid number" });
    }

    const product = new productModel({
      ...req.fields,
      discountPrice: numericDiscountPrice, // Use the parsed numeric value
    });

    // Perform any necessary processing here

    if (req.files.thumbnail) {
      // Check if thumbnail exists in request
      console.log("Processing product data");
      try {
        // Read thumbnail file and set thumbnail data and contentType
        const thumbnailData = fs.readFileSync(req.files.thumbnail.path);
        product.thumbnail.data = thumbnailData;
        product.thumbnail.contentType = req.files.thumbnail.type;
      } catch (error) {
        console.error("Error reading thumbnail file:", error);
        return res.status(500).json({
          error: "Error processing thumbnail file",
          message: error.message,
        });
      }
    }

    // Save product to the database
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product creation was successful",
      product,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ success: false, error, message: "Error in creating product" });
  }
};

// export const getProducts = async (req, res) => {
//   try {
//     const products = await productModel
//       .find({})
//       .select("-thumbnail")
//       .populate("category")
//       .limit(12)
//       .sort({ createdAt: -1 });
//     res.status(201).json({
//       success: true,
//       message: "Products displayed",
//       totalCount: products.length,
//       products,
//     });
//   } catch (error) {
//     console.log("Error occurred:", error);
//     res
//       .status(500)
//       .json({ success: false, error, message: "Error in getting product" });
//   }
// };

export const getOneProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ "Request title": req.params.title })
      .select("-thumbnail")
      .populate("category");
    // console.log("Found Product:", product); // Log the product found in the database

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(201).json({
      success: true,
      message: "Single Product displayed",
      product,
    });
  } catch (error) {
    console.log("Error occurred:", error);
    res
      .status(500)
      .json({ success: false, error, message: "Error in getting product" });
  }
};

export const getProductImage = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.pid)
      .select("thumbnail");
    if (product.thumbnail.data) {
      res.set("Content-Type", product.thumbnail.contentType);
      return res.status(200).send(product.thumbnail.data);
    }
    res.status(201).json({
      success: true,
      message: "Single Product displayed",
      product,
    });
  } catch (error) {
    console.log("Error occurred:", error);
    res
      .status(500)
      .json({ success: false, error, message: "Error in getting product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-thumbnail");
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });

    // if (!product) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Product not found" });
    // }
  } catch (error) {
    console.log("Error occurred:", error);
    res
      .status(500)
      .json({ success: false, error, message: "Error in getting product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      colors,
      sizes,
      discountPrice,
      deleted,
    } = req.fields;

    // Check for missing required fields
    for (const [key, value] of Object.entries(req.fields)) {
      if (!value) {
        return res.status(400).json({ error: `${key} is required` });
      }
    }

    // Ensure discountPrice is a valid number
    const numericDiscountPrice = parseFloat(discountPrice);
    if (isNaN(numericDiscountPrice)) {
      return res
        .status(400)
        .json({ error: "Discount price must be a valid number" });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields },
      { new: true }
    );

    // Perform any necessary processing here

    if (req.files.thumbnail) {
      // Check if thumbnail exists in request
      console.log("Processing product data");
      try {
        // Read thumbnail file and set thumbnail data and contentType
        const thumbnailData = fs.readFileSync(req.files.thumbnail.path);
        product.thumbnail.data = thumbnailData;
        product.thumbnail.contentType = req.files.thumbnail.type;
      } catch (error) {
        console.error("Error reading thumbnail file:", error);
        return res.status(500).json({
          error: "Error processing thumbnail file",
          message: error.message,
        });
      }
    }

    // Save product to the database
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product update was successful",
      product,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ success: false, error, message: "Error in updating product" });
  }
};
