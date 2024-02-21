import express from "express";
const app = express();
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import formidable from "express-formidable";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import filterRoutes from "./routes/filterRoutes.js";
import dotenv from "dotenv";
//env config
dotenv.config();

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to mongodb ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in connecting Mongodb Url ${error}`);
  }
};
connect();
//rest api
app.get("/", (req, res) => {
  res.send({ message: "Welcome to ecommerce!" });
});
app.post("/api/upload", (req, res) => {
  // Create a new formidable form instance
  const form = formidable({ multiples: true });

  // Parse the incoming request
  form.parse(req, (err, fields, files) => {
    if (err) {
      // Handle error
      return res.status(500).json({ error: "Error parsing form data" });
    }

    // Process the parsed form data
    // For example, save files to storage, etc.

    res.status(200).json({ fields, files });
  });
});

//port
const PORT = process.env.PORT || 8080;

//run on port
app.listen(PORT, () => {
  console.log(
    `Server listening to ${process.env.DEV_MODE} mode on port ${process.env.PORT}`
  );
});

//middleware
app.use(express.json());
app.use(morgan("dev"));
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080"], // Specify the origin(s) you want to allow
  })
);
// app.use(formidable());

app.use("/api/product", productRoutes);
// console.log(productRoutes);

app.use("/api/category", categoryRoutes);

app.use("/api/user", authRoutes);

app.use("/api/filters", filterRoutes);

//mongodb password : t2yhCwwOY7jaelzV
//mongodb+srv://arya:<password>@e-commerce.5p7mtzs.mongodb.net/
//db config
