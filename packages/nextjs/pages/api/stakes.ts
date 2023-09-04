import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "~~/lib/mongoDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { db } = await connectToDatabase();

  const tokenList = await db.collection("stakes").find().toArray();

  res.status(200).json({ tokenList });
}
