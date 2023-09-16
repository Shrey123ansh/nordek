import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "~~/lib/mongoDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("Norswap");

  //let { db } = await connectToDatabase();

  switch (req.method) {
    case "PUT":
      try {
        const { user, slotsToDel, updateSlot } = req.body;
        console.log(user, slotsToDel, updateSlot);

        if (!user || slotsToDel === undefined) {
          return res.status(400).json({ error: "Parameters are missing" });
        }

        if (slotsToDel.length > 0) {
          const result = await db
            .collection("stakes")
            .deleteMany({ address: user as string, slotId: { $in: slotsToDel } });
          console.log("RESULT", result);
        }
        if (updateSlot != undefined) {
          const filter = { address: user, slotId: updateSlot[0] };

          // Use the $set operator to update the specified fields
          const updateDoc = {
            $set: {
              stakedAmount: updateSlot[1],
            },
          };

          const result = await db.collection("stakes").updateOne(filter, updateDoc);
          console.log("RESULT", result);
        }
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  }
}
