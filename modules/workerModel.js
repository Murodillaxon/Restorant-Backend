const { Schema, model } = require("mongoose");

const workerSchema = new Schema({
  type: { type: String, required: true, enum: ['admin', 'manager', 'waiter', 'cook'] },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  birthday: { type: Date, required: true },
});

const Worker = model("Worker", workerSchema);
module.exports = Worker;
