// seed.js
const mongoose = require("mongoose");
import Product from "../models/Product";
import { products } from "./products";

// 3) Connect to Mongo and Insert Data
const seedDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/my-local-mongo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB!");

    // Clear existing data to avoid duplicates
    await Product.deleteMany({}); 
    console.log("Old products removed.");

    // Insert sample data
    await Product.insertMany(products);
    console.log("Sample products inserted!");

  } catch (error) {
    console.error("Error connecting to Mongo or inserting data:", error);
  } finally {
    // Disconnect from DB even if there's an error
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seedDB();
