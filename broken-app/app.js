const express = require('express');
const axios = require('axios');
const app = express();


app.post('/', function(req, res, next) {
  try {
    //handle error
    let results = req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));
    console.log(out)
    debugger;
    return res.send(JSON.stringify(out));
  } catch {
    next(err);
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
