import categoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name, value } = req.body;
    console.log("Request body:", req.body); // Log the entire request body
    console.log("Name:", name); // Log the value of name
    console.log("Value:", value);
    if (!name || !value) {
      console.log("Missing name or value"); // Log if name or value is missing

      return res
        .status(401)
        .json({ message: "Both name and value are required" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    console.log("Existing category:", existingCategory); // Log the existing category

    if (existingCategory) {
      console.log("Category already exists"); // Log if the category already exists
      return res.status(200).json({
        success: false,
        message: "Category Already Exisits",
      });
    }
    const category = await new categoryModel({
      name,
      value,
    }).save();
    console.log("New category created:", category); // Log the newly created category

    res.status(201).json({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log("Error occurred:", error);
    res.status(500).json({ success: false, error, message: "Category Error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, value } = req.body;
    const { id } = req.params;
    console.log("Request body:", req.body); // Log the entire request body
    console.log("Name:", name); // Log the value of name
    console.log("Value:", value);

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, value },
      { new: true }
    );

    console.log("category updated:", category); // Log the newly created category

    res.status(200).json({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (error) {
    console.log("Error occurred:", error);
    res.status(500).json({ success: false, error, message: "Category Error" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});

    console.log("Category List:", category); // Log the newly created category

    res.status(200).json({
      success: true,
      message: "Category List Success",
      category,
    });
  } catch (error) {
    console.log("Error occurred:", error);
    res.status(500).json({ success: false, error, message: "Category Error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id);

    console.log("Category List:", category); // Log the newly created category

    res.status(200).json({
      success: true,
      message: "Delete category Success",
      category,
    });
  } catch (error) {
    console.log("Error occurred:", error);
    res.status(500).json({ success: false, error, message: "Category Error" });
  }
};

export const getOneCategory = async (req, res) => {
  try {
    console.log("Request params:", req.params); // Log the request parameters
    const { name } = req.params;
    console.log("Name:", name); // Log the name extracted from request parameters

    const category = await categoryModel.findOne({ name });

    console.log("Found category:", category); // Log the category found in the database

    if (!category) {
      console.log("Category not found"); // Log if category is not found
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    console.log("Sending category in response:", category); // Log the category being sent in the response
    res.status(200).json({
      success: true,
      message: "Category Found Success",
      category,
    });
  } catch (error) {
    console.log("Error occurred:", error);
    res.status(500).json({ success: false, error, message: "Category Error" });
  }
};

export const getOneCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await categoryModel.findById(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Category found", category });
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ success: false, error, message: "Category retrieval failed" });
  }
};
