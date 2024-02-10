const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId },
  name: { type: String, required: true },
  adresse: { type: String, required: false },
  total: { type: Number, required: false },
  surface: { type: Number, required: false },
  budget: { type: Number, required: false },
  date: { type: String, required: false },
  dpgf: { type: mongoose.Types.ObjectId, required: false },
  user: { type: mongoose.Types.ObjectId, required: false },
});
module.exports = mongoose.model("project", ProjectSchema);
