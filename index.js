const express = require("express");
const session = require("express-session");
const collect = require("./collect");
const port = process.env.PORT || 3000;
const app = express();
const sessionConfig = {
	secret: "y0uwi1In3v3rkn0w",
	cookie: {}
};
if (app.get("env") === "production") {
	app.set("trust proxy", 1);
	sess.cookie.secure = true;
}

app.use(session(sessionConfig));
app.use(express.json());
app.get("/collect", collect);

app.listen(port, err => {
	if (err) throw err;
	console.log(`> Ready On Server http://localhost:${port}`);
});
