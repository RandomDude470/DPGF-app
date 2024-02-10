const controllers = require("../controllers");

module.exports = function (router) {
  router
    .route("/dpgf/getListOfLots")
    .post(
      controllers.auth.validate1,
      controllers.dpgf.checkUser,
      controllers.dpgf.getListOfLots
    );
  router
    .route("/dpgf/getDpgf")
    .post(
      controllers.auth.validate1,
      controllers.dpgf.checkUser,
      controllers.dpgf.getDpgf
    );
  router
    .route("/dpgf/updateDpgf")
    .post(
      controllers.auth.validate1,
      controllers.dpgf.checkUserWithpgf,
      controllers.dpgf.UpdateDpgf
    );
  router
    .route("/dpgf/createDpgf")
    .post(controllers.auth.validate1, controllers.dpgf.CreateDpgf);
};
