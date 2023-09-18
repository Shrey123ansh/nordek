import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "~~/lib/mongoDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("Norswap");

  //let { db } = await connectToDatabase();

  switch (req.method) {
    case "POST":
      const reqBody = req.body;

      await db.collection("platformDetails").insertOne(reqBody);
      console.log("SAVED TO DB", reqBody);
      res.status(200).json({ message: "Added New Platform Details Field", data: reqBody });
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
