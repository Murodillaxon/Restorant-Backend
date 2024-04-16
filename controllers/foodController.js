const express = require('express');
const router = express.Router();
const multer = require('multer');
const Food = require('../modules/foodModel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const image = req.file.path; 
    const food = new Food({ name, description, category, price, image });
    await food.save();
    res.status(201).json({
      success: true,
      message: 'Food created successfully',
      data: food,
    });
  } catch (error) {
    console.error('Error creating food:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

router.get('/getFoods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json({
      success: true,
      message: 'Foods retrieved successfully',
      data: foods,
    });
  } catch (error) {
    console.error('Error getting foods:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: 'Food not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Food retrieved successfully',
      data: food,
    });
  } catch (error) {
    console.error('Error getting food by ID:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const image = req.file.path;
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      { name, description, category, price, image },
      { new: true }
    );
    if (!updatedFood) {
      return res
        .status(404)
        .json({ success: false, message: 'Food not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Food updated successfully',
      data: updatedFood,
    });
  } catch (error) {
    console.error('Error updating food:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res
        .status(404)
        .json({ success: false, message: 'Food not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Food deleted successfully',
      data: deletedFood,
    });
  } catch (error) {
    console.error('Error deleting food:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

module.exports = router;
