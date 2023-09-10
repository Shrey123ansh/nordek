import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "~~/lib/mongoDb";
import Stakes from "~~/models/stakes";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { db } = await connectToDatabase();

  switch (req.method) {
    case "POST":
      const reqBody = req.body;
      console.log(reqBody);

      Stakes.create(reqBody).then(data => {
        console.log(data);
        res.json({
          message: `Amount Staked`,
          success: true,
          reqBody,
        });
      });

    // const newStake = new Stakes(reqBody);
    // const savedStake = await newStake.save();
    // console.log("savedStake", savedStake);

    default:
      const stakes = await db.collection("stakes").find().toArray();
      res.status(200).json({ stakes });
  }
}
