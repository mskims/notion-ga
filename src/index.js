const express = require("express");
const session = require("express-session");
const app = express();
const sessionConfig = {
  secret: "y0uwi1In3v3rkn0w",
  cookie: {}
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sessionConfig.cookie.secure = true;
}

app.use(session(sessionConfig));
app.use(express.json());

module.exports = app;
