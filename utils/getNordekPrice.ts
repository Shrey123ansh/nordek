import axios from "axios";

export const getNRKPrice = async () => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/html; charset=UTF-8",
  };

  try {
    const response = await axios.get("http://143.198.216.255/db.php", {
      headers: headers,
    });
    console.log("price response", response);
    const priceData = response.data;
    const price = Number(priceData);

    return Promise.resolve(price);
  } catch (error) {
    return Promise.reject(error);
  }
};
