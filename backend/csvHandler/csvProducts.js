const fs = require("fs");
const csv = require("csv-parser");
const pool = require("../routes/db"); // Assuming your pool module is in a separate file

// Function to insert product data from CSV to PostgreSQL
async function insertProductData(csvFilename) {
  try {
    const products = [];

    fs.createReadStream(csvFilename)
      .pipe(csv())
      .on("data", (row) => {
        const idNext = row["ID Next"];
        // const name = row["Nombre"];
        const ean = row["EAN"];
        const sku = row["SKU"];
        const marca = row["Marca"];
        const urlFoto24 = row["URL Foto24"];
        const urlPhoto24 = row["URL Photo24"];
        const precioF24 = parseFloat(row["Precio F24"]); // Convert price to float
        const product = {
          idNext,
          ean,
          sku,
          marca,
          urlFoto24,
          urlPhoto24,
          precioF24,
        }; // Constructing the product object
        products.push(product);
      })
      .on("end", async () => {
        // Insert data into "products" table
        const insertQuery = `
            INSERT INTO products (idNext, ean, sku, brand,urlFoto24, urlPhoto24, price)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
          `;
        for (const product of products) {
          await pool.query(insertQuery, [
            product.idNext,
            product.ean,
            product.sku,
            product.marca,
            product.urlFoto24,
            product.urlPhoto24,
            product.precioF24,
          ]);
        }
        console.log("Product data inserted successfully");
        // Close the pool after all operations are done
        pool.end();
      });
  } catch (error) {
    console.error("Error inserting product data:", error);
  }
}

// Usage
async function main() {
  try {
    const csvFilename = "csvFiles/genesis.csv";
    await insertProductData(csvFilename); // Insert data from CSV
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
