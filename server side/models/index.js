const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTIONSTRING);

module.exports.User = require("./user");
module.exports.Project = require("./project");
module.exports.dpgf = require("./dpgf");
