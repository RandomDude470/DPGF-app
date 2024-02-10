const controllers = require("../controllers");

module.exports = function (router) {
  router.route("/auth/login").post(controllers.auth.Login);
  router.route("/auth/register").post(controllers.auth.Register);
  router.route("/auth/validate").post(controllers.auth.validate);
};