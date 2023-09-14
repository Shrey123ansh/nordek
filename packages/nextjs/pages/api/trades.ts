import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "~~/lib/mongoDb";
import Trades from "~~/models/trades";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("Norswap");
  switch (req.method) {
    case "POST":
      try {
        const reqBody = req.body;
        console.log(reqBody);

        res.setHeader("Content-Type", "application/json");
        // const trade = await Trades.findOne({ hash });

        // if (trade) {
        //   return NextResponse.json({ error: "Trade already exists" }, { status: 400 });
        // }

        // await newTrade.save();

        Trades.create({ reqBody })
          .then(data => {
            console.log(data);

            return res.json({
              message: `Trade Executed`,
              success: true,
              reqBody,
            });
          })
          .catch(e => {
            return res.json({
              message: `Failed: ${e}`,
              success: false,
              reqBody,
            });
          });
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

    default:
      const tokenList = await db.collection("trades").find().toArray();
      res.status(200).json({ tokenList });
  }
}
