const express = require("express");
const axios = require("axios");
const app = express();
const ExpressError = require("./expressError");
const base_url = "https://api.github.com/users/";


app.use(express.json());

function logger(req, res, next) {
  console.log(`Sending ${req.method} request to ${req.path}.`);
  return next();
}

app.use(logger);



//NOTE make a post request to the github api
//1. it should take in a username or an array of usernam
//2. for each user it should return an object with the name and bio
//3. if the user is not found it should return a 404 error
//4. if no username is provided it should return a 400 error
//NOTE The purpose of this route it to make a post request to the github api and find the name and bio of the user
//NOTE The username is in req.params.d to the github api
  //the username is in req.params.d to the github api
 //the json being sent is in the request body of 
 //{"developers": ["username1", "username2", "username3"]}

app.post("/developers", async function (req, res, next) {
  try {
    const { developers } = req.body;
    if (!developers) {
      throw new ExpressError("No developers provided", 400);
    }
    const results = await Promise.all(
      developers.map(async (developer) => {
        if (!developer) {
          throw new ExpressError("No developer provided", 400);
        }
        if (developer === "bad") {
          throw new ExpressError("Bad developer", 404);
        }
        const response = await axios.get(`${base_url}${developer}`);
        return {
          name: response.data.name,
          bio: response.data.bio,
        };
      })
    );
    return res.json({ developers: results });
  } catch (err) {
    return next(err);
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
