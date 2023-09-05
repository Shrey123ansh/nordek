import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "~~/lib/mongoDb";
import Stakes from "~~/models/stakes";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { db } = await connectToDatabase();

  switch (req.method) {
    case "POST":
      try {
        const { reqBody } = JSON.parse(req.body);
        console.log(reqBody);
        // const trade = await Trades.findOne({ hash });

        // if (trade) {
        //   return NextResponse.json({ error: "Trade already exists" }, { status: 400 });
        // }

        // await newTrade.save();

        Stakes.create({ reqBody })
          .then(data => {
            console.log(data);

            return res.json({
              message: `Amount Staked`,
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
      const tokenList = await db.collection("stakes").find().toArray();
      res.status(200).json({ tokenList });
  }
}
