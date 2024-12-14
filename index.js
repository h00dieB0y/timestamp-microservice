// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Return Unix timestamp
app.get('/api/:date?', function (req, res) {
  let { date } = req.params;
  let unix;
  let utc;

  // If date is not provided, return current date
  if (!date) {
    let now = new Date();
    unix = now.getTime();
    utc = now.toUTCString();

    return res.json({ unix: unix, utc: utc });
  }
  
    // If date is a number, parse it as an integer
    if (!isNaN(date)) {
      date = parseInt(date);
    }

    let parsedDate = new Date(date);

    // If date is invalid, return error
    if (parsedDate.toString() === 'Invalid Date') {
      return res.json({ error: 'Invalid Date' });
    }

    unix = parsedDate.getTime();
    utc = parsedDate.toUTCString();

    return res.json({ unix: unix, utc: utc });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
