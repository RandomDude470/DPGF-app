const router = require("express").Router();

module.exports = function (app) {
  app.use("", router);
  require("./auth")(router);
  require("./projects")(router);
  require("./dpgf")(router);
};
