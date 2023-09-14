import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "~~/lib/mongoDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("Norswap");

  const swapSupportedTokenList = await db.collection("swapSupportedTokenList").find({}).sort({ symbol: -1 }).toArray();

  res.status(200).json({ swapSupportedTokenList });
}
