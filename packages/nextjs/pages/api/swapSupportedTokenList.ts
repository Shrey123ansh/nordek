import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "~~/lib/mongoDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { db } = await connectToDatabase();

  const swapSupportedTokenList = await db.collection("swapSupportedTokenList").find({}).sort({ symbol: -1 }).toArray();

  res.status(200).json({ swapSupportedTokenList });
}
