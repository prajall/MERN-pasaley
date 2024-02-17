import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    rate: [
      {
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
    photo: {
      type: String,
    },
    dealerInfo: {
      type: String,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("products", productSchema);
