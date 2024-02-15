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
    rate: {
      type: [
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
    },
    photo: {
      type: String,
    },
    dealerInfo: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      // required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("products", productSchema);
