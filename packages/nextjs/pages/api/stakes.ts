import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "~~/lib/mongoDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("Norswap");

  //let { db } = await connectToDatabase();

  switch (req.method) {
    case "POST":
      const reqBody = req.body;
      await db.collection("stakes").insertMany([reqBody]);
      console.log("SAVED TO DB");
      break;

    case "PUT": // Change to PUT for updating
      const { addr, slotId, newStakedAmount, newStakedAt, rewardsLeft, hash } = req.body;

      if (
        !addr ||
        newStakedAmount === undefined ||
        newStakedAt === undefined ||
        hash === undefined ||
        rewardsLeft === undefined
      ) {
        res.status(400).json({ error: "Invalid request body" });
        return;
      }

      console.log(req.body);

      // Use the addr and slotId to identify the document to update
      const filter = { address: addr, slotId: slotId };

      // Use the $set operator to update the specified fields
      const updateDoc = {
        $set: {
          apy: rewardsLeft,
          stakedAmount: newStakedAmount,
          stakedAt: newStakedAt,
          hash: hash,
          // apy: apy,
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
