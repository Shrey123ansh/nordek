import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "~~/lib/mongoDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("Norswap");

  //let { db } = await connectToDatabase();

  switch (req.method) {
    case "POST":
      try {
        const { stakedAt, stakedAmount, address, hash, slotId } = req.body;
        const collection = db.collection("stakes");
        collection.createIndex({ stakedAt, stakedAmount, address, hash, slotId }, { unique: true });

        await collection.insertOne({ stakedAt, stakedAmount, address, hash, slotId });
        return res.status(200).json({ message: `New Stake Saved`, ok: true });
      } catch (e) {
        console.error("Error:", e);
        return res.status(500).json({ error: `Internal Server Error ${e}` });
      }
    case "DELETE":
      try {
        const { delAddress } = req.query;

        if (!delAddress) {
          return res.status(400).json({ error: "Address parameter is missing" });
        }

        const result = await db.collection("stakes").deleteMany({ address: delAddress as string });

        if (result.deletedCount > 0) {
          return res.status(200).json({ message: `${result.deletedCount} stake(s) deleted` });
        } else {
          return res.status(404).json({ message: "No matching stakes found for deletion" });
        }
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

    case "PUT": // Change to PUT for updating
      const { addr, slotId, newStakedAmount, newStakedAt, rewardsLeft, hash } = req.body;

      if (!addr || newStakedAmount === undefined || newStakedAt === undefined || hash === undefined) {
        res.status(400).json({ error: "Invalid request body" });
        return;
      }

      console.log(req.body);

      // Use the addr and slotId to identify the document to update
      const filter = { address: addr, slotId: slotId };

      // Use the $set operator to update the specified fields
      const updateDoc = {
        $set: {
          stakedAmount: newStakedAmount,
          stakedAt: newStakedAt,
          hash: hash,
        },
      };

      const result = await db.collection("stakes").updateOne(filter, updateDoc);
      console.log("RESULT", result);
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Document updated successfully" });
      } else {
        res.status(404).json({ error: "Document not found or not updated" });
      }
      break;

    case "GET":
      const { address } = req.query;

      // Use the address to filter the data in the MongoDB query
      const userStakes = await db.collection("stakes").find({ address }).toArray();
      res.status(200).json({ userStakes });
      break;
  }
}

/*

    case "GET":
      const { address } = req.query;

      // Use the address to filter the data in the MongoDB query
      const userStakes = await db.collection("stakes").find({ address }).toArray();
      res.status(200).json({ userStakes });

*/

/*

*/
