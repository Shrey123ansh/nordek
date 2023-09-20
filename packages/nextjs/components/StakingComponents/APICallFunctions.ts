import axios from "axios";

//axios.defaults.baseURL = "https://nordek-nextjs.vercel.app/";
console.log("BASE URL", process.env.API_URL);
axios.defaults.baseURL = `${process.env.API_URL}`;

export const saveStakeToDb = async (newStake: {
  stakedAt: number;
  stakedAmount: number;
  address: string;
  hash: string;
  slotId: number;
}) => {
  try {
    const response = await axios.post("/api/stakes", newStake);
    console.log(response);
    console.log("Staked");
  } catch (error) {
    console.log("Failed to save stake", error);
  }
};

export const updateUserData = async (addr: string, updates: Record<string, any>) => {
  try {
    const apiUrl = "/api/userData"; // Replace with your API endpoint
    const response = await axios.put(apiUrl, { addr, updates });
    console.log("DATA FROM UPDATE USER DATA", response.data); // Message indicating the success of the update
  } catch (error) {
    console.error("Error updating fields:", error);
  }
};

export async function createUser(user: {
  address: string;
  totalRewards: number;
  totalRestakes: number;
  blockNumber: number;
}) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege...",
  };
  try {
    const response = await axios.post("/api/userData", user, {
      headers: headers,
    });
    console.log(response);
    console.log("User Created");
  } catch (error) {
    console.log(error);
  }
}

export async function getStakes(address: string) {
  const apiUrl = `api/stakes?address=${address}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data.userStakes;
  } catch (error) {
    console.log(error);
  }
}

export async function getPlatformDetails() {
  const apiUrl = `api/platformDetails`;
  try {
    const response = await axios.get(apiUrl);
    return response.data.platformDetails;
  } catch (error) {
    console.log(error);
  }
}

export async function setPlatformDetails(details: { apy: number; timestamp: number }) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege...",
  };
  try {
    const response = await axios.post("/api/platformDetails", details, {
      headers: headers,
    });
    console.log(response);
    console.log("Platform Details Added");
  } catch (error) {
    console.log(error);
  }
}

export async function getUserData(address: string, blockNumber: number) {
  const apiUrl = `api/userData?address=${address}`;
  try {
    const response = await axios.get(apiUrl);

    if (response.data.userData.length === 0) {
      const user = {
        address: address,
        totalRewards: 0,
        totalRestakes: 0,
        blockNumber: blockNumber,
      };
      createUser(user);
    } else {
      return response.data.userData[0];
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserData(address: string) {
  const apiUrl = `/api/userData?address=${address}`;
  try {
    const response = await axios.get(apiUrl);

    return response.data.userData[0];
  } catch (error) {
    console.log(error);
  }
}

export const updateRestakedDB = async (newStake: {
  newStakedAmount: number;
  newStakedAt: number;
  hash: string;
  addr: string;
  slotId: number;
}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege...",
  };
  try {
    const response = axios.put("/api/stakes", newStake, {
      headers: headers,
    });

    console.log(response);
    console.log("Restaked");
  } catch (error) {
    console.log(error);
  }

  console.log("Saved to DB");
};

export const updateRestakedAllDB = async (address: string, newStakes: any) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege...",
  };
  const data = {
    address: address,
    newStakes: newStakes,
  };
  try {
    const response = axios.put("/api/updateRestakeAllStakes", data, {
      headers: headers,
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }

  console.log("Saved to DB");
};
export const removeAllStakesForUser = async (user: string) => {
  try {
    const response = await axios.delete(`/api/stakes?delAddress=${user}`);
    console.log(response.data);
  } catch (error) {
    console.error("Delete request failed:", error);
  }
};
export const removeStakeInDb = async (updateInfo: {
  user: string;
  slotsToDel: number[];
  updateSlot: number[] | undefined;
}) => {
  console.log("removing/updating slots");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege...",
  };

  try {
    const response = await axios.put(`/api/updateStakes/`, updateInfo, {
      headers: headers,
    });
    console.log(response);
  } catch (e) {
    console.log("Couldn't send update/del request", e);
  }
};

export const getTransactionsFromNordekScan = async ({ userAddress, blockNumber, contractAddress }) => {
  const apiUrl = `https://nordekscan.com/api?module=account&action=txlist&address=${userAddress}&sort=desc&start_block=${blockNumber}&filter_by=to:"${contractAddress}"`;
  try {
    const response = await axios.get(apiUrl);
    return await response.data.result;
  } catch (error) {
    console.log(error);
  }
};
