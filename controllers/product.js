const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const myData = await Product.find({});
  res.status(200).json({ myData });
};

const getAllProductsTesting = async (req, res) => {
  const { company, name } = req.query;
  const queryObject = {};

  if(company) {
    queryObject.company = company;
  }
  if(name) {
    queryObject.name = { $regex: name, $options: "i" };     //i: case-insensitive
  }

  const myData = await Product.find(queryObject);
  console.log(queryObject);
  res.status(200).json({ myData });
};

module.exports = {getAllProducts, getAllProductsTesting};