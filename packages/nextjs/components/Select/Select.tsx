export const Select = () => {
  const options = [
    { address: "0x0", symbol: "USDC 1", icon: "/tokenImages/usdc.png" },
    { address: "0x01", symbol: "USDC 2", icon: "/tokenImages/usdc.png" },
    { address: "0x02", symbol: "USDC 3", icon: "/tokenImages/usdc.png" },
  ];
  return (
    <select className=" rounded-full bg-white inline-block text-gray-800 text-xs py-1 px-2 ">
      {options.map(token => (
        <option key={token.address} value={token.address} className="text-xs ">
          {token.symbol}
        </option>
      ))}
    </select>
  );
};
