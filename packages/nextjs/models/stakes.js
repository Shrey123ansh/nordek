import mongoose from "mongoose";

const stakesSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
  },
  stakedAt: {
    type: Number,
    required: true,
  },
  apy: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  stakedAmount: {
    type: Number,
    required: true,
  },
  slotId: {
    type: Number,
    required: true,
  },
});

const Stakes = mongoose.models.stakes || mongoose.model("stakes", stakesSchema);

export default Stakes;
