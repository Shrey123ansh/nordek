import axios from "axios";

export const saveStakeToDb = async (newStake: {
  stakedAt: number;
  stakedAmount: number;
  address: string;
  hash: string;
  slotId: number;
}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege...",
  };
  try {
    const response = await axios.post("/api/stakes", newStake, {
      headers: headers,
    });
    console.log(response);
    console.log("Staked");
  } catch (error) {
    console.log(error);
  }

  console.log("Saved to DB");
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

export async function createUser(user: { address: string; totalRewards: number; totalRestakes: number }) {
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

export async function getUserData(address: string) {
  const apiUrl = `api/userData?address=${address}`;
  try {
    const response = await axios.get(apiUrl);

    if (response.data.userData.length === 0) {
      const user = {
        address: address,
        totalRewards: 0,
        totalRestakes: 0,
      };
      createUser(user);
    } else {
      return response.data.userData[0];
    }
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
    console.log("Restaked");
  } catch (error) {
    console.log(error);
  }

  console.log("Saved to DB");
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
  } catch (e) {
    console.log("Couldn't send update/del request", e);
  }

  console.log("Removed from DB");
};
