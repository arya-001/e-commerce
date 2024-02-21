import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [1, "wrong min price"],
    max: [10000, "wrong max price"],
  },
  discountPercentage: {
    type: Number,
    min: [1, "wrong min discount"],
    max: [99, "wrong max discount"],
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max price"],
    default: 0,
  },
  stock: { type: Number, min: [0, "wrong min stock"], default: 0 },
  brand: { type: String, required: true },
  category: { type: mongoose.ObjectId, ref: "Category", required: true },
  thumbnail: { data: Buffer, contentType: String },
  // images: { type: [String], required: true },
  colors: { type: mongoose.Schema.Types.Mixed },
  sizes: { type: mongoose.Schema.Types.Mixed },
  // highlights: { type: [String] },
  discountPrice: { type: Number },
  deleted: { type: Boolean, default: false },
});

// console.log("Product Schema defined:", productSchema);

export default mongoose.model("Products", productSchema);

// {
//   "title": "iPh",
//   "description": "An apple mobile which is nothing like apple",
//   "price": 549,
//   "discountPercentage": 12.96,
//   "rating": 4.69,
//   "stock": 94,
//   "brand": "Apple",
//   "category": "smartphones",
//   "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
//   "sizes": "SM",
//   "colors": "grey",
//   "highlights":"LightGrey",
//   "discountPrice": 459,
//   "deleted": "false"

// }
