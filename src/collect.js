const axios = require("axios");
const querystring = require("querystring");
const { beacon } = require("./constants");
const isBot = require("isbot");
const app = require("./index");

app.get("*", (req, res) => {
  const payload = getPayload(req);
  const userAgent = req.headers["user-agent"];

  if (isBot(userAgent)) {
    return exit(res);
  }

  axios({
    method: "post",
    url: "https://www.google-analytics.com/collect",
    data: querystring.stringify(payload),
    headers: {
      "User-Agent": userAgent
    },
    timeout: 1000
  })
    .then(response => {
      console.log("Successfully tracked page view", payload);
    })
    .catch(error => {
			console.log("Error tracking pageview", payload, error);
    })
    .then(() => {
      return exit(res);
    });
});

const getPayload = req => ({
  v: 1,
  tid: req.query.tid,
  cid: req.session.id,
  t: "pageview",
  dh: req.query.host,
  dp: req.query.page
});

const exit = res =>
  res
    .set({
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Content-Type": "image/gif",
      "Content-Length": beacon.length
    })
    .end(beacon);

module.exports = app;
