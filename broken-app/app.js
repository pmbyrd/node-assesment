const express = require("express");
const axios = require("axios");
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());

app.post("/", function (req, res, next) {
  try {
    //handle error
    let results = req.body.developers.map(async (d) => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });
    let out = results.map((r) => ({ name: r.data.name, bio: r.data.bio }));
    console.log(out);
    debugger;
    return res.send(JSON.stringify(out));
  } catch {
    next(err);
  }
});

// 404 handler
app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError);
});

// generic error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
