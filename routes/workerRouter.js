// workerRoutes.js
const express = require("express");
const router = express.Router();
const workerController = require("../controllers/workerController");

router.post("/workers", workerController.createWorker);
router.get("/workers", workerController.getWorkers);
router.put("/workers/:id", workerController.updateWorker);
router.delete("/workers/:id", workerController.deleteWorker);

module.exports = router;
