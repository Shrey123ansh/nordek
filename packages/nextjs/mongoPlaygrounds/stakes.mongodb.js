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
db.getCollection("stakes").insertMany([
  {
    _id: "1231231",
    hash: "0xce1e6dd81a180ee1ef6e95e787a181335f0859058233872132f9146b2cba38a0",
    stakedAt: 21235123,
    apy: 5.6,
    address: "0x36b95B5dAF5EFC083f16AcA6a6b980348B6C15d1",
    stakedAmount: 54,
    slotId: 0,
  },
]);

// Run a find command to view items sold on April 4th, 2014.
const Nordek = db.getCollection("stakes").find({
  hash: "0xce1e6dd81a180ee1ef6e95e787a181335f0859058233872132f9146b2cba38a0",
});

// Print a message to the output window.
console.log(`${Nordek} data.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection("stakes").aggregate([
  // Find all of the sales that occurred in 2014.
  // { $match: { logo: "https://picsum.photos/200" } },
  // Group the total sales for each product.
  //{ $group: { _id: "$item", totalSaleAmount: { $sum: { $multiply: ["$price", "$quantity"] } } } },
]);
