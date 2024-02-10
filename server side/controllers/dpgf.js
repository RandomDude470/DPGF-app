const mongoose = require("mongoose");
const DPGF = mongoose.model("dpgf");
const Project = mongoose.model("project");
const jwt = require("jsonwebtoken");

exports.checkUser = (req, res, next) => {
  let tokn = req.headers.authorization;
  let projectId = req.body._id;
  let userid;
  try {
    userid = jwt.decode(tokn)._id;
  } catch (error) {
    console.log(error);
    res.status(500).send();
    return;
  }
  Project.find({ _id: projectId, user: userid }).then((resp) => {
    console.log(resp);
    if (resp == false) {
      res.status(401).send();
    } else {
      next();
    }
  });
};
exports.checkUserWithpgf = (req, res, next) => {
  let tokn = req.headers.authorization;
  let projectId = req.body.project;
  let userid;
  try {
    userid = jwt.decode(tokn)._id;
  } catch (error) {
    console.log(error);
    res.status(500).send();
    return;
  }
  Project.find({ _id: projectId, user: userid }).then((resp) => {
    console.log('check user w dpgf : ');
    console.log(resp);
    if (resp == false) {
      res.status(401).send();
    } else {
      next();
    }
  });
};

exports.getListOfLots = (req, res) => {
  const FindDPGF = () => {
    let dpgfId;
    try {
      dpgfId = new mongoose.Types.ObjectId(req.body._id);
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(new Error(400));
      });
    }
    return DPGF.findOne({ project: dpgfId });
  };
  const extractLots = (dpgf) => {
    console.log("liste de lots");
    console.log(dpgf.lots);
    res.json({
      lots: dpgf.lots,
    });
  };
  const OnError = (err) => {
    if (err.message == 400) {
      res.status(400).send();
    } else {
      res.status(500).send();
    }
  };
  FindDPGF().then(extractLots).catch(OnError);
};

exports.getDpgf = (req, res) => {
  let id;
  const fetchDpfg = () => {
    try {
      id = new mongoose.Types.ObjectId(req.body._id);
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(new Error(400));
      });
    }
    return DPGF.findOne({ project: id });
  };
  const respond = (dpgf) => {
    res.json(dpgf);
  };
  const OnError = (err) => {
    if (err.message == 400) {
      res.status(400).send();
    } else {
      res.status(500).send();
    }
  };
  fetchDpfg().then(respond).catch(OnError);
};

exports.UpdateDpgf = (req, res) => {
  let body = req.body;
  let dpgfId;
  try {
    dpgfId = new mongoose.Types.ObjectId(body._id);
    console.log("body id " + body._id);
    console.log("dogf id : " + dpgfId);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
  const findAndUpdate = () => {
    return DPGF.findOneAndUpdate({ _id: dpgfId }, body);
  };

  const response = async (resp) => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    if (resp != null) {
      console.log("Update Status");
      console.log(resp);
      res.send();
    } else {
      return new Promise((r, reject) => {
        reject(new Error(400));
      });
    }
  };
  const OnError = (err) => {
    console.log(err);
    if (err.message == 400) {
      res.status(400).send();
    } else {
      res.status(500).send();
    }
  };
  findAndUpdate().then(response).catch(OnError);
};
exports.CreateDpgf = (req, res) => {
  let body = req.body;
  let projectID = body._id;
  let newDpgfId = new mongoose.Types.ObjectId();
  try {
    projectID = new mongoose.Types.ObjectId(projectID);
  } catch (error) {
    res.status(400).send();
  }
  const createDpgf = () => {
    let newDpgf = new DPGF({
      _id: newDpgfId,
      project: projectID,
      lots: [],
      total: "0",
    });
    return newDpgf.save();
  };
  const udateProject = () => {
    return Project.findOneAndUpdate({ _id: projectID }, { dpgf: newDpgfId });
  };
  const response = () => {
    res.send();
  };
  const OnError = (err) => {
    console.log(err);
    res.status(500).send();
  };
  createDpgf().then(udateProject).then(response).catch(OnError);
};
exports.Delete = (id) => {
  console.log("id");
  console.log(id);
  DPGF.findByIdAndDelete(id).then((res) => {
    console.log("dpgf del ");
    console.log(res);
  });
};
