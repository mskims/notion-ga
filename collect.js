const axios = require("axios");
const querystring = require("querystring");
const { img } = require("./const");

const collect = (req, res) => {
	const payload = getPayload(req);

	axios({
		method: "post",
		url: "https://www.google-analytics.com/collect",
		data: querystring.stringify(payload),
		headers: {
			"User-Agent": req.headers["user-agent"]
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
			res
				.set({
					"Cache-Control": "no-cache, no-store, must-revalidate",
					"Content-Type": "image/gif",
					"Content-Length": img.length
				})
				.end(img);
		});
};

const getPayload = req => ({
	v: 1,
	tid: req.query.tid,
	cid: req.session.id,
	t: "pageview",
	dh: req.query.host,
	dp: req.query.page
});
module.exports = collect;
