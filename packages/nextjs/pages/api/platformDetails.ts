import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "~~/lib/mongoDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("Norswap");

  //let { db } = await connectToDatabase();

  switch (req.method) {
    case "POST":
      const { apy, timestamp, hash } = req.body;

      await db.collection("platformDetails").insertOne({ apy, timestamp, hash });
      console.log("SAVED TO DB", req.body);
      res.status(200).json({ message: "Added New Platform Details Field", data: req.body });
      break;

    case "GET":
      // Use the address to filter the data in the MongoDB query
      const platformDetails = await db.collection("platformDetails").find({}).toArray();
      res.status(200).json({ platformDetails });
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
