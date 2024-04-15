const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/workerRouter");
require("colors");

const app = express();

app.use(express.json());
app.use(cors());

async function connectToDb() {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB is conncted!".bgGreen.white))
    .catch((err) => console.log("MongoDB in not connected!".bgRed.white, err));
}
connectToDb();

app.use("/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
