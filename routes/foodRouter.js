const express = require("express")
const router = express.Router()
const {createFood, getFood, updateFood, deleteFood} = require("../controllers/food")
const { route } = require("./workerRouter")


router.post("/createfood", createFood)
router.get("/getfoods", getFood)
router.put("/updatefood/:id", updateFood)
router.delete("/deletefood/:id", deleteFood)

module.exports = router