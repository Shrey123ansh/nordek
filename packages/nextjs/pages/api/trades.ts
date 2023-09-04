import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "~~/lib/mongoDb";
import Trades from "~~/models/trades";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { db, client } = await connectToDatabase();
  switch (req.method) {
    case "POST":
      try {
        const reqBody = JSON.parse(req.body);
        console.log(reqBody);
        // const trade = await Trades.findOne({ hash });

        // if (trade) {
        //   return NextResponse.json({ error: "Trade already exists" }, { status: 400 });
        // }

        // await newTrade.save();

        const response = await client.db().collection("trades").insertOne(reqBody);

        return NextResponse.json({
          message: `Trade Executed ${response.insertedId}`,
          success: true,
          reqBody,
        });
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

    default:
      const tokenList = await db.collection("trades").find().toArray();
      res.status(200).json({ tokenList });
  }
}
