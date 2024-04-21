const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Worker = require("../modules/workerModel");

const createWorker = async (req, res) => {
  try {
    const { type, fullname, password, phone, birthday } = req.body;
    const existingWorker = await Worker.findOne({ fullname });

    if (existingWorker) {
      return res
        .status(400)
        .json({ success: false, message: "Worker already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Хеширование пароля

    const newWorker = new Worker({
      type,
      fullname,
      password: hashedPassword,
      phone,
      birthday,
    });

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
    const updatedData = req.body;

    const updatedWorker = await Worker.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

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
    const { fullname, password } = req.body;
    const worker = await Worker.findOne({ fullname });

    if (!worker) {
      return res.status(400).json({
        success: false,
        message: "Invalid fullname or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, worker.password);

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid fullname or password",
      });
    }

    // Проверка типа учетной записи и перенаправление на соответствующий маршрут
    let redirectPath = "/";
    switch (worker.type) {
      case "admin":
        redirectPath = "/admin";
        break;
      case "waiter":
        redirectPath = "/waiter";
        break;
      // Добавьте другие варианты, если необходимо
    }
    console.log("Redirect path:", redirectPath);

    const token = jwt.sign(
      { fullname: worker.fullname, type: worker.type },
      "secret"
    );
    res.json({
      success: true,
      message: "Sign in successful",
      token: token,
      user: worker, // Добавляем данные пользователя в ответ
      redirect: redirectPath,
    });
  } catch (error) {
    console.error("Error signing in worker:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createWorker,
  getWorkers,
  updateWorker,
  deleteWorker,
  signIn,
};
