require("dotenv").config();
const mongoose = require("mongoose");

const connectionString = process.env.MONGO_DB_URI;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((e) => {
    console.error("Ha ocurrido un error =>", e);
  });
