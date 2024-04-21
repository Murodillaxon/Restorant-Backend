const express = require("express");
const router = express.Router();
const workerController = require("../controllers/workerController");

router.post("/signin", workerController.signIn)
router.post("/createworkers", workerController.createWorker);
router.get("/getWorkers", workerController.getWorkers);
router.put("/workerEdit/:id", workerController.updateWorker);
router.delete("/workerDelete/:id", workerController.deleteWorker);

module.exports = router;
