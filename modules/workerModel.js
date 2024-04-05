const { Schema, model } = require("mongoose");

const workerTypeSchema = new Schema({
  typeName: { type: String, required: true, unique: true },
});
const workerSchema = new Schema({
  type: { type: Schema.Types.ObjectId, ref: "WorkerType"  }, 
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  birthday: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
});

const WorkerType = model("WorkerType", workerTypeSchema);

const Worker = model("Worker", workerSchema);

module.exports = { Worker, WorkerType };
