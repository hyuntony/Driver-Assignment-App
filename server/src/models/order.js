import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    revenue: {
      type: Number,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver' 
    }
  },
  { timestamps: true },
);

const Order = mongoose.model('Orderlist', orderSchema);

export default Order;