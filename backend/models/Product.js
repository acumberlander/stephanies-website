const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  id: { type: String, required: true }, // Or you can let Mongo generate _id
  images: [{ type: String }],
  option_groups: {
    sizes: [{ type: String }],
  },
  selected_size: { type: String, default: "" },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("Product", productSchema);
