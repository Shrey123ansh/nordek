import mongoose from "mongoose";
import { tokenType as TokenType } from "~~/data/data";

const liquiditySchema = new mongoose.Schema({
  token0: {
    type: {},
    required: true,
  },
  token1: {
    type: {},
    required: true,
  },
  token0Amount: {
    type: Number,
    required: true,
  },
  token1Amount: {
    type: String,
    required: true,
  },
  lpTokens: {
    type: Number,
    required: true,
  },
  pairContract: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const Liquidity = mongoose.models.userLiquidities || mongoose.model("userLiquidities", liquiditySchema);

export default Liquidity;
