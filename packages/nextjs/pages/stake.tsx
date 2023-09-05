import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import ActionButton from "~~/components/ui/actionButton";
import clientPromise from "~~/lib/mongoDb";

const StakeBox = () => {
  const [stakeAmount, setStakeAmount] = useState(0);
  const { address } = useAccount();

  const handleStaking = async () => {
    if (stakeAmount <= 0) {
      console.log("can't be lt 0");
      return;
    }

    if (!address) {
      console.log("notConnected");
      return;
    }

    const stakeData = {
      hash: "0xac1e6dd81a180ee1ef6e95e787a181335f0859058233872132f9146b2cba38a0",
      stakedAt: new Date(),
      apy: 5.6,
      address: "0x36b95B5dAF5EFC083f16AcA6a6b980348B6C15d1",
      stakedAmount: stakeAmount,
    };

    await axios
      .post("/api/stakes", stakeData)
      .then(function (response) {
        console.log(response);
        console.log("Staked");
      })
      .catch(function (error) {
        console.log(error);
      });

    // const res = await fetch("http://localhost:3000/api/stakes", {
    //   method: "POST",
    //   body: JSON.stringify(stakeData),
    // });

    // save data to database
  };
  return (
    <div className="p-8 mb-8 flex flex-col space-y-4 items-center rounded-lg bg-base-300">
      <label htmlFor=""> Enter Stake Amount</label>
      <input
        type="number"
        placeholder="0"
        className="px-2 py-2 bg-purple-800 rounded-lg text-right appearance-none"
        value={stakeAmount}
        onChange={e => setStakeAmount(Number(e.target.value))}
      />
      <ActionButton text={"Stake"} onClick={handleStaking}></ActionButton>
    </div>
  );
};

const Stake: NextPage = (props: any) => {
  //const [stakeAmount, setStakeAmount] = useState(0);
  const [stakes, setStakes] = useState(props.stakes);
  //const handleStaking = () => {};

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 justify-center ">
        <StakeBox></StakeBox>

        <section className="mt-8">
          <div className="p-8  flex flex-col space-y-2 bg-base-300 rounded-lg">
            <h1 className="text-xl text-center mb-4"> Your Staked Positions </h1>
            {stakes.map((stake: any) => {
              return (
                <div
                  className="flex bg-base-100 rounded-lg w-full justify-between space-x-20 p-4 items-center"
                  key={stake.hash}
                >
                  <h1>{stake.stakedAmount}</h1>
                  <h1>{stake.stakedAt}</h1>
                  <h1>{stake.apy}</h1>

                  <button className="btn btn-sm btn-outline btn-accent">Unstake</button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Stake;

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("Norswap");

    const stakes = await db.collection("stakes").find({}).sort({ time: -1 }).toArray();

    return {
      props: {
        stakes: JSON.parse(JSON.stringify(stakes)),
      },
    };
  } catch (e) {
    console.log("ERROR");
    console.error(e);
  }
}
