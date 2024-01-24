import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "~~/lib/mongoDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("Norswap");

  //let { db } = await connectToDatabase();

  switch (req.method) {
    case "PUT":
      try {
        const { address, newStakes } = req.body;
        console.log("Req body", address, newStakes);
        if (!address || !newStakes) {
          return res.status(400).json({ error: "Invalid request body" });
        }

        await db.collection("stakes").deleteMany({ address });

        const result = await db.collection("stakes").insertMany(newStakes);
        console.log(result);
        res.status(200).json({ message: "Document updated successfully" });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  }
}
