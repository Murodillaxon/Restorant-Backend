const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const userRouter = require("./routes/workerRouter");

const app = express();

app.use(express.json());
app.use(cors());
 
async function connectToDb() {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Failed to connect to MongoDB:", err);
  }
}
connectToDb();

app.use("/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
