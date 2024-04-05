const Worker = require('../modules/workerModel');

// Создание нового работника
const createWorker = async (req, res) => {
  try {
    const workerData = req.body;
    const newWorker = new Worker(workerData);
    await newWorker.save();
    res.status(201).json({ success: true, message: 'Worker created successfully', data: newWorker });
  } catch (error) {
    console.error('Error creating worker:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Получение списка всех работников
const getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json({ success: true, message: 'Workers retrieved successfully', data: workers });
  } catch (error) {
    console.error('Error getting workers:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Обновление информации о работнике
const updateWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const workerData = req.body;
    const updatedWorker = await Worker.findByIdAndUpdate(id, workerData, { new: true });
    if (!updatedWorker) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }
    res.status(200).json({ success: true, message: 'Worker updated successfully', data: updatedWorker });
  } catch (error) {
    console.error('Error updating worker:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Удаление работника
const deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWorker = await Worker.findByIdAndDelete(id);
    if (!deletedWorker) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }
    res.status(200).json({ success: true, message: 'Worker deleted successfully', data: deletedWorker });
  } catch (error) {
    console.error('Error deleting worker:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

module.exports = { createWorker, getWorkers, updateWorker, deleteWorker };
