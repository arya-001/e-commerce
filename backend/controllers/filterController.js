import Category from "../models/categoryModel.js";
import Products from "../models/productModel.js";

// Controller function to fetch categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to fetch sizes (assuming sizes are stored in products)
export const getSizes = async (req, res) => {
  try {
    const products = await Products.find();
    const sizes = [...new Set(products.map((product) => product.sizes))];
    res.json(sizes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to fetch colors (assuming colors are stored in products)
export const getColors = async (req, res) => {
  try {
    const products = await Products.find();
    const colors = [...new Set(products.map((product) => product.colors))];
    res.json(colors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
