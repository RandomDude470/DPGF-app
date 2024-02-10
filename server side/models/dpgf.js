const mongoose = require("mongoose");

const dpgfSchema = mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  lots: { type: Array, default: [] },
  total: { type: String },
  project: { type: mongoose.Types.ObjectId, ref: "project", required: true },
});
module.exports.dpgf = mongoose.model("dpgf", dpgfSchema);
