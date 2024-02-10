const Project = require("mongoose").model("project");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { getDpgf } = require("./dpgf");
const DeleteDpgf = require("./dpgf").Delete;

exports.getData = (req, res) => {
  let userId = new mongoose.Types.ObjectId(
    jwt.decode(req.headers.authorization)._id
  );
  const fetchData = () => {
    return Project.find({ user: userId });
  };
  const response = async (resp) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    res.json(resp);
  };
  const OnError = (err) => {
    console.log(err);
    res.status(500).send();
  };
  fetchData().then(response).then(OnError);
};
exports.Save = (req, res) => {
  let body = req.body;
  let userId = jwt.decode(req.headers.authorization)._id;
  let newP;
  const CreateNew = async () => {
    console.log("body.Lots : ");
    console.log(body.Lots);
    if (body.Lots != false) {
      let dpgfid = new mongoose.Types.ObjectId();
      let projectId = new mongoose.Types.ObjectId();
      let lots = body.Lots;
      lots.forEach((o) => {
        o._id = new mongoose.Types.ObjectId();
        o.total = "0";
      });
      let dpgf = new mongoose.model("dpgf")({
        _id: dpgfid,
        lots: lots,
        total: "0",
        project: projectId,
      });
      await dpgf.save();

      newP = new Project({
        _id: projectId,
        name: body.name,
        budget: Number(body.budget),
        surface: Number(body.surface),
        date: body.date,
        adresse: body.adresse,
        dpgf: dpgfid,
        user: new mongoose.Types.ObjectId(userId),
      });
      return newP.save();
    } else {
      newP = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: body.name,
        budget: Number(body.budget),
        surface: Number(body.surface),
        date: body.date,
        adresse: body.adresse,
        user: new mongoose.Types.ObjectId(userId),
      });
      return newP.save();
    }
  };
  const response = (resp) => {
    res.json({
      status: "success",
      response: resp,
    });
  };
  const OnError = (err) => {
    console.log(err);
    res.status(400).send();
  };
  CreateNew().then(response).catch(OnError);
};
exports.getDataByIdAndCheckDpgf = function (req, res) {
  let userId = new mongoose.Types.ObjectId(
    jwt.decode(req.headers.authorization)._id
  );
  const fetchProject = () => {
    let ProjectId;
    try {
      ProjectId = new mongoose.Types.ObjectId(req.body._id);
    } catch {
      return new Promise((resolve, reject) => {
        reject(new Error(400));
      });
    }
    return Project.findOne({ _id: ProjectId, user: userId });
  };
  const checkForDPGF = (resp) => {
    console.log("resp : " + resp);
    if (resp == null) {
      res.status(404).send();
    } else {
      if (resp.dpgf) {
        res.json({
          resp,
          dpgf: true,
        });
      } else {
        res.json({
          resp,
          dpgf: false,
        });
      }
    }
  };
  const OnError = (err) => {
    console.log("erroration : " + err.message);
    if (err.message == 400) {
      res.status(400).send();
    } else {
      res.status(500).send();
    }
  };
  fetchProject().then(checkForDPGF).catch(OnError);
};
exports.Delete = (req, res) => {
  console.log("hello");
  let projectId = req.body.id;
  try {
    projectId = new mongoose.Types.ObjectId(projectId);
  } catch (error) {
    res.status(400).send();
  }
  const findProject = () => {
    return Project.findOne({ _id: projectId });
  };
  const GetDPGFidAndDelete = (project) => {
    console.log("project:");
    console.log(project);
    if (project == null) {
      return new Promise((rs, rj) => {
        rj(new Error(404));
      });
    } else {
      let dpgfId = project.dpgf;
      DeleteDpgf(dpgfId);
      return new Promise((rs, rj) => {
        rs(project);
      });
    }
  };
  const deleteProject = (project) => {
    return Project.findByIdAndDelete(project);
  };
  const response = (r) => {
    if (r == null) {
      res.status(404).send();
    } else {
      res.send();
    }
  };
  const OnError = (err) => {
    if (err.message == 404) {
      res.status(404).send();
    } else {
      res.status(500).send();
    }
  };

  findProject()
    .then(GetDPGFidAndDelete)
    .then(deleteProject)
    .then(response)
    .catch(OnError);
};
