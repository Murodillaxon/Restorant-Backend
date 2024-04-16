const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/workerRouter");
const foodController = require("./controllers/foodController");
require("colors");

const app = express();

app.use(express.json());
app.use(cors());

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB is connected!".bgGreen.black);
  } catch (error) {
    console.error("MongoDB is not connected!".bgRed.black, error);
  }
}
connectToDb();

app.use("/users", userRouter);
app.use("/foods", foodController);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
