import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "~~/lib/mongoDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("Norswap");

  //let { db } = await connectToDatabase();

  switch (req.method) {
    case "POST":
      const reqBody = req.body;
      await db.collection("userData").insertMany([reqBody]);
      console.log("SAVED TO DB");
      break;

    case "PUT": // Change to PUT for updating
      const { addr, updates } = req.body;
      console.log("updates", updates);
      //console.log("updates Length", Object.keys(updates).length);
      if (!addr || !updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "Invalid request body" });
      }

      console.log(req.body);

      try {
        const result = await db.collection("userData").updateOne({ address: addr }, { $inc: updates });
        console.log(result);
        if (result.modifiedCount === 1) {
          return res.status(200).json({ message: "Fields updated successfully" });
        } else {
          return res.status(404).json({ error: "Document not found or not updated" });
        }
      } catch (error) {
        console.error("Error updating fields:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "GET":
      const { address } = req.query;

      // Use the address to filter the data in the MongoDB query
      const userData = await db.collection("userData").find({ address }).toArray();

      res.status(200).json({ userData });

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
