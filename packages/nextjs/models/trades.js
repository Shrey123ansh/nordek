import mongoose from "mongoose";

const tradesSchema = new mongoose.Schema({
  usd: {
    type: Number,
    required: true,
  },
  boughtToken: {
    type: String,
    required: true,
  },
  boughtTokenAmount: {
    type: Number,
    required: true,
  },
  soldToken: {
    type: String,
    required: true,
  },
  soldTokenAmount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  holdings: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  isBuy: {
    type: Boolean,
    required: true,
  },
});

const Trades = mongoose.models.trades || mongoose.model("trades", tradesSchema);

export default Trades;
