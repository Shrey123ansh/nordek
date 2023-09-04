import mongoose from "mongoose";

const tradesSchema = new mongoose.Schema({
  fields: [
    {
      name: "_id",
      path: ["_id"],

      type: "ObjectId",
      probability: 1,
      hasDuplicates: false,
    },
    {
      name: "address",
      path: ["address"],

      type: "String",
      probability: 1,
      hasDuplicates: true,
    },
    {
      name: "boughtToken",
      path: ["boughtToken"],

      type: "String",
      probability: 1,
      hasDuplicates: true,
    },
    {
      name: "boughtTokenAmount",
      path: ["boughtTokenAmount"],

      type: "Double",
      probability: 1,
      hasDuplicates: true,
    },
    {
      name: "hash",
      path: ["hash"],

      type: "String",
      probability: 1,
      hasDuplicates: false,
    },
    {
      name: "holdings",
      path: ["holdings"],

      type: ["Double", "Int32"],
      probability: 1,
      hasDuplicates: true,
    },
    {
      name: "isBuy",
      path: ["isBuy"],

      type: "Boolean",
      probability: 1,
      hasDuplicates: true,
    },
    {
      name: "soldToken",
      path: ["soldToken"],

      type: "String",
      probability: 1,
      hasDuplicates: true,
    },
    {
      name: "soldTokenAmount",
      path: ["soldTokenAmount"],

      type: "Double",
      probability: 1,
      hasDuplicates: true,
    },
    {
      name: "time",
      path: ["time"],

      type: "Date",
      probability: 1,
      hasDuplicates: true,
    },
    {
      name: "usd",
      path: ["usd"],

      type: "Double",
      probability: 1,
      hasDuplicates: true,
    },
  ],
});

const Trades = mongoose.models.trades || mongoose.model("trades", tradesSchema);
export default Trades;
