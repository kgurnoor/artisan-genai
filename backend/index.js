const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Load products data
const productsPath = path.join(__dirname, "products.json");
let products = JSON.parse(fs.readFileSync(productsPath));

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Filter products
// Example query: /api/products/filter?location=Bangalore&craft=Weaving&priceMin=1000&priceMax=3000&productType=Saree
app.get("/api/products/filter", (req, res) => {
  let filtered = [...products];
  const { location, craft, priceMin, priceMax, productType } = req.query;

  if (location) filtered = filtered.filter(p => p.location.toLowerCase() === location.toLowerCase());
  if (craft) filtered = filtered.filter(p => p.craft.toLowerCase() === craft.toLowerCase());
  if (productType) filtered = filtered.filter(p => p.productType.toLowerCase() === productType.toLowerCase());
  if (priceMin) filtered = filtered.filter(p => p.price >= parseFloat(priceMin));
  if (priceMax) filtered = filtered.filter(p => p.price <= parseFloat(priceMax));

  res.json(filtered);
});

app.listen(5000, () => console.log("Server running at http://localhost:5000"));
