const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Worker } = require("../modules/workerModel");

const createWorker = async (req, res) => {
  try {
    const { username, password, ...otherData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newWorker = new Worker({ username, password: hashedPassword, ...otherData });
    await newWorker.save();
    
    res.status(201).json({
      success: true,
      message: "Worker created successfully",
      data: newWorker,
    });
  } catch (error) {
    console.error("Error creating worker:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json({
      success: true,
      message: "Workers retrieved successfully",
      data: workers,
    });
  } catch (error) {
    console.error("Error getting workers:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const updateWorker = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedWorker = await Worker.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedWorker) {
      return res
        .status(404)
        .json({ success: false, message: "Worker not found" });
    }
    res.status(200).json({
      success: true,
      message: "Worker updated successfully",
      data: updatedWorker,
    });
  } catch (error) {
    console.error("Error updating worker:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWorker = await Worker.findByIdAndDelete(id);
    if (!deletedWorker) {
      return res
        .status(404)
        .json({ success: false, message: "Worker not found" });
    }
    res.status(200).json({
      success: true,
      message: "Worker deleted successfully",
      data: deletedWorker,
    });
  } catch (error) {
    console.error("Error deleting worker:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const worker = await Worker.findOne({ username });
    if (!worker) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, worker.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign({ username: worker.username }, "secret");
    res.json({
      success: true,
      message: "Sign in successful",
      token: token,
    });
  } catch (error) {
    console.error("Error signing in worker:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = { createWorker, getWorkers, updateWorker, deleteWorker, signIn };
