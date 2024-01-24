import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "~~/lib/mongoDb";

type Token = {
  name: string,
  symbol: string,
  address: string,
  logo: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("Norswap");
  const collectionName = "swapSupportedTokenList"
  switch (req.method) {
    case "PUT":
      try {
        const token: Token = req.body;

        const existingStake = await db.collection(collectionName).findOne(token);
        console.log("EXISTING STAKE", existingStake);
        if (!existingStake) {
          await db.collection(collectionName).insertOne(token);
          console.log("API NEW TOKEN SAVING");
          return res.status(200).json({ message: `New token saved`, ok: true });
        } else {
          return res.status(200).json({ message: `Already exists`, ok: true });
        }
      } catch (e) {
        console.error("Error:", e);
        return res.status(500).json({ error: `Internal Server Error ${e}` });
      }

    case "GET":
      const swapSupportedTokenList = await db.collection(collectionName).find({}).toArray();
      return res.status(200).json({ swapSupportedTokenList });

    case "DELETE":
      try {
        const address = req.query.address;
        if (!address) {
          return res.status(400).json({ error: "Address parameter is missing" });
        }

        const result = await db.collection(collectionName).deleteOne({ address: address as string });

        if (result.deletedCount > 0) {
          return res.status(200).json({ message: `${result.deletedCount} token(s) deleted` });
        } else {
          return res.status(404).json({ message: "No matching token found for deletion" });
        }
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  }

}
