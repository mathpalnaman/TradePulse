const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    pair: {
      type: String,
      required: [true, "Please add a pair (e.g., BTC/USDT)"],
      uppercase: true,
    },
    type: {
      type: String,
      enum: ["Long", "Short"],
      required: true,
    },
    entryPrice: {
        type: Number,
        required: [true, "Please add an entry price"],
    },
    exitPrice: {
        type: Number,
    },
    amount: {
        type: Number,
        required: [true, "Please add an amount"],
    },
    status: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open",
    },
    notes: {
        type: String,
    },
    },
    {
        timestamps: true, // For auto-creation of createdAt and updatedAt fields
    }
);
module.exports = mongoose.model("Trade", TradeSchema);