/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use("Norswap");

// Insert a few documents into the sales collection.
db.getCollection("trades").insertMany([
  {
    usd: 100.1,
    boughtToken: "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",
    boughtTokenAmount: 100.1,
    soldToken: "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",
    soldTokenAmount: 200.2,
    address: "0x36b95B5dAF5EFC083f16AcA6a6b980348B6C15d1",
    holdings: 21.1,
    time: new Date(),
    hash: "0xae4e6dd81a180ee1ef6e95e787a181335fb859058233872132f9146b2cba38a0",
    isBuy: true,
  },
  {
    usd: 1.1,
    boughtToken: "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",
    boughtTokenAmount: 0.1,
    soldToken: "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",
    soldTokenAmount: 20.2,
    address: "0x36b95B5dAF5EFC083f16AcA6a6b980348B6C15d1",
    holdings: 211,
    time: new Date(),
    hash: "0xbe4e6dd81a180ee1ef6e95e787a181335f0859058233872132f9146b2cba38a0",
    isBuy: false,
  },
]);

// Run a find command to view items sold on April 4th, 2014.
const Nordek = db.getCollection("trades").find({
  hash: "0xbe4e6dd81a180ee1ef6e95e787a181335f0859058233872132f9146b2cba38a0",
});

// Print a message to the output window.
console.log(`${Nordek} data.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection("trades").aggregate([
  // Find all of the sales that occurred in 2014.
  // { $match: { logo: "https://picsum.photos/200" } },
  // Group the total sales for each product.
  //{ $group: { _id: "$item", totalSaleAmount: { $sum: { $multiply: ["$price", "$quantity"] } } } },
]);
