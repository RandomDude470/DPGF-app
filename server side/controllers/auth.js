const jwt = require("jsonwebtoken");
const crypt = require("bcrypt");
const User = require("mongoose").model("user");

exports.Login = function (req, res) {
  let body = req.body;
  const checkCredentials = () => {
    console.log({ email: body.email, password: body.password });
    return User.findOne({ email: body.email });
  };
  const comparePassword = (user) => {
    console.log(user);
    if (user == null) {
      throw new Error("Wrong credentials");
    } else if (crypt.compareSync(body.password, user.password)) {
      return user;
    } else {
      throw new Error("Wrong credentials");
    }
  };

  const signJwt = (user) => {
    return jwt.sign(
      { _id: user._id, email: user.email, password: user.password },
      process.env.SECRET,
      { expiresIn: 3600 }
    );
  };
  const response = (jwtToken) => {
    res.json({
      token: jwtToken,
    });
  };
  const OnError = (err) => {
    if (err.message == "Wrong credentials") {
      res.status(401).send();
    } else {
      res.status(500).send();
    }
  };
  checkCredentials()
    .then(comparePassword)
    .then(signJwt)
    .then(response)
    .catch(OnError);
};
exports.Register = function (req, res) {
  let body = req.body;

  const checkUser = () => {
    // if (User.exists({email  : body.email}) == null) {
    //     return
    // }
    // else {
    //     console.log(User.exists({email : body.email }));
    //     throw new Error("409")
    // }

    return User.exists({ email: body.email });
  };
  const saveToDB = (Exists) => {
    if (Exists == null) {
      let salt = crypt.genSaltSync();
      let HashedPassword = crypt.hashSync(body.password, salt);

      let newUser = new User({
        username: body.username,
        email: body.email,
        password: HashedPassword,
      });
      return newUser.save();
    } else {
      throw new Error("409");
    }
  };
  const generateJWT = (data) => {
    console.log(data);
    let payload = {
      _id: data._id,
      username: data.username,
      email: data.email,
      password: data.password,
    };
    return jwt.sign(payload, process.env.SECRET);
  };
  const response = (jwtString) => {
    res.json({
      status: "success",
      token: jwtString,
    });
  };

  const OnError = (error) => {
    if (error.message == "409") {
      console.log("here 409");
      res.status(409).json({
        error: error.message,
      });
    } else if (error.message == "database") {
      console.log("here db");
      console.log("database");
      res.status(500).send();
    } else {
      console.log("here other");
      console.log(error);
      res.status(500).send();
    }
  };

  checkUser().then(saveToDB).then(generateJWT).then(response).catch(OnError);
};
exports.validate = function (req, res, next) {
  let body = req.body;
  const tokenGet = (body) => {
    if (body.token) {
      return body.token;
    } else if (req.headers.authorization) {
      return req.headers.authorization;
    }
  };
  let token = tokenGet(body);
  const jwtCheck = () => {
    return new Promise((resolve, reject) => {
      resolve(jwt.verify(token, process.env.SECRET));
    });
  };
  const response = (data) => {
    console.log(`data  :${data}`);
    res.json({
      status: "success",
      info: data,
    });
    next();
  };
  const OnError = (err) => {
    console.log(err);
    res.status(401).send();
  };
  jwtCheck().then(response).catch(OnError);
};

exports.validate1 = function (req, res, next) {
  let body = req.body;
  const tokenGet = (body) => {
    if (body.token) {
      return body.token;
    } else if (req.headers.authorization) {
      return req.headers.authorization;
    }
  };
  let token = tokenGet(body);
  const jwtCheck = () => {
    return new Promise((resolve, reject) => {
      resolve(jwt.verify(token, process.env.SECRET));
    });
  };
  const response = (data) => {
    console.log(`data  :${data}`);
    next();
  };
  const OnError = (err) => {
    console.log(err);
    res.status(401).send();
  };
  jwtCheck().then(response).catch(OnError);
};

// exports.middleware = function (req,res,next) {
//     console.log('middleware middling');
//     next()
//  }
