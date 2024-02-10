const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");
const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

require("./models");
routes(app);

app.listen(process.env.PORT, () => {
  console.log(`running on port : ${process.env.PORT}`);
});
