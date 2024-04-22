const fs = require("fs");
const csv = require("csv-parser");
const pool = require("../routes/db"); // Assuming your pool module is in a separate file

// Function to insert offer data from CSV to PostgreSQL
async function insertOfferData(csvFilename, offerName, startDate, endDate) {
  try {
    const products = [];

    fs.createReadStream(csvFilename)
      .pipe(csv())
      .on("data", (row) => {
        const sku = row.sku;
        const price = parseFloat(row.price); // Convert price to float
        const product = { sku, price }; // Constructing the product object
        products.push(product);
      })
      .on("end", async () => {
        // Insert data into "offers" table
        const insertQuery = `
          INSERT INTO offers (name, start_date, end_date, products)
          VALUES ($1, $2, $3, $4)
        `;
        await pool.query(insertQuery, [
          offerName,
          startDate,
          endDate,
          JSON.stringify(products),
        ]);
        console.log("Offer data inserted successfully");
        // Close the pool after all operations are done
        pool.end();
      });
  } catch (error) {
    console.error("Error inserting offer data:", error);
  }
}

// Usage
async function main() {
  try {
    const csvFilename = "csvFiles/rebajas-invierno.csv";
    const offerName = "Rebajas Invierno 2024"; // Manually provide the offer name
    const startDate = "2023-01-18"; // Manually provide the start date
    const endDate = "2023-03-31"; // Manually provide the end date
    await insertOfferData(csvFilename, offerName, startDate, endDate); // Insert data from CSV with specified parameters
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
