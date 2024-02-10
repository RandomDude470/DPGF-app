const controllers = require("../controllers");

module.exports = (router) => {
  router
    .route("/api/getprojects")
    .get(controllers.auth.validate1, controllers.projects.getData);
  router
    .route("/api/saveprojects")
    .post(controllers.auth.validate1, controllers.projects.Save);
  router
    .route("/api/getprojectbyid")
    .post(
      controllers.auth.validate1,
      controllers.projects.getDataByIdAndCheckDpgf
    );
  router
    .route("/api/deleteProject")
    .post(controllers.auth.validate1, controllers.projects.Delete);
  // router.route('/api/replaceprojects').patch(controllers.auth.validate,controllers.projects.Replace);
};
