import { NextApiRequest, NextApiResponse } from "next";
import { tokenType } from "~~/data/data";
import clientPromise from "~~/lib/mongoDb";

export type Liquidity = {
    token0: tokenType,
    token1: tokenType,
    token0Amount: Number,
    token1Amount: Number,
    lpTokens: Number,
    pairContract: string,
    user: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("Norswap");
    const collectionName = "userLiquidity"
    console.log(req.method)
    switch (req.method) {

        case "POST":
            try {
                const liquidity: Liquidity = req.body;

                const existingLiquidity: Liquidity = await db.collection(collectionName).findOne({ pairContract: liquidity.pairContract, user: liquidity.user });
                console.log("existing liquidity", existingLiquidity);
                if (existingLiquidity) {
                    console.log("existing value if block")

                    const filter = {
                        user: liquidity.user,
                        pairContract: liquidity.pairContract,
                        token0: liquidity.token0,
                        token1: liquidity.token1
                    };

                    const updateLiquidity = {
                        $set: {
                            lpTokens: liquidity.lpTokens + existingLiquidity.lpTokens,
                            token0Amount: liquidity.token0Amount + existingLiquidity.token0Amount,
                            token1Amount: liquidity.token1Amount + existingLiquidity.token1Amount,
                        },
                    };

                    await db.collection(collectionName).updateOne(filter, updateLiquidity);
                } else {
                    console.log("else block ")
                    await db.collection(collectionName).insertOne(liquidity);
                    console.log("liqudity value from post " + liquidity)
                }
                return res.status(200).json({ message: `LIQUIDITY DATA ADDED`, ok: true });


            } catch (e) {
                console.error("Error:", e);
                return res.status(500).json({ error: `Internal Server Error ${e}` });
            }


        case "GET":
            const { address } = req.query
            const userLiquidityValues = await db.collection(collectionName).find({ user: address as string }).toArray();
            res.status(200).json({ userLiquidityValues });
            break;
        // when user removes the portion of liquidity 
        case "PUT":
            try {
                const liquidity: Liquidity = req.body;
                console.log("liquidty from put " + JSON.stringify(liquidity))
                const filter = {
                    user: liquidity.user,
                    pairContract: liquidity.pairContract,
                    token0: liquidity.token0,
                    token1: liquidity.token1
                };


                const updateDoc = {
                    $set: {
                        lpTokens: liquidity.lpTokens,
                        token0Amount: liquidity.token0Amount,
                        token1Amount: liquidity.token1Amount
                    },
                };

                const result = await db.collection(collectionName).updateOne(filter, updateDoc);
                console.log("RESULT", result);
                if (result.modifiedCount === 1) {
                    res.status(200).json({ message: "liquidity updated success fully" });
                } else {
                    res.status(404).json({ error: "liquidity not found or not updated" });
                }
            } catch (e) {
                console.error("Error:", e);
                return res.status(500).json({ error: `Internal Server Error ${e}` });
            }
            break;
        // when user totally removes the liquidity 
        case "DELETE":
            try {
                const { pairContract, userAddress } = req.query;
                console.log("delete request pair contract " + pairContract)
                console.log("delete request user address " + userAddress)
                // console.log(" token address " + JSON.stringify(address))
                if (!userAddress && !pairContract) {
                    return res.status(400).json({ error: "pair contract or user address parameter is missing" });
                }

                const result = await db.collection(collectionName).deleteOne({ user: userAddress as string, pairContract: pairContract as string });

                if (result.deletedCount > 0) {
                    return res.status(200).json({ message: `${pairContract} liquidity removed` });
                } else {
                    return res.status(404).json({ message: "no matching pair contract is found for user" });
                }
            } catch (error) {
                console.error("Error:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }

    }

}
