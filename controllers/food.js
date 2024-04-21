const Food = require("../modules/foodModel");

const createFood = async (req, res) => {
  try {
    const { name, ...otherData } = req.body;
    const existingName = await Food.findOne({ name });
    if (existingName) {
      res.json("Food exists");
    } else {
      const newFood = new Food({
        name,
        ...otherData,
      });
      await newFood.save();
      res.status(201).json({
        success: true,
        message: "Food created successfully",
        data: newFood,
      });
    }
  } catch (error) {
    console.error("Error creating food:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getFood = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json({
      success: true,
      message: "Foods retrieved successfully",
      innerData: foods,
    });
  } catch (error) {
    console.error("Error getting foods:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFood = await Food.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedFood) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }
    res.status(200).json({
      success: true,
      message: "Food updated successfully",
      data: updatedFood,
    });
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFood = await Food.findByIdAndDelete(id);
    if (!deletedFood) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }
    res.status(200).json({
      success: true,
      message: "Food deleted successfully",
      data: deletedFood,
    });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createFood,
  getFood,
  updateFood,
  deleteFood,
};
