require("dotenv").config();
const express = require('express');
const app = express();
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const products_routes = require("./routes/products");
const user_routes = require("./routes/users");


app.get("/", (req, res) => {
  res.send("Hi, I am Live");
});

//middleware
app.use("/api/products", products_routes);
app.use("/api/user", user_routes);

const start = async() => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes I am connected`);
    });
  } catch(error) {
    console.log(error);
  }
}

start();