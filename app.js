//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// call api function
function call_api(finisheAPI) {
  request("https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_d00312fbf5be40adb830b9295827e9bf", { json: true }, function(err, res, body) {
    if (err) {
      return console.log(err);
    } if (res.statusCode === 200) {
      finisheAPI(body);
    }
  });
}

var day = new Date();

//set ejs routes
app.get("/", function(req, res) {
  call_api(function(readyAPI) {
    res.render("index", {stock: readyAPI});
  });
});

//set ejs routes
app.get("/about", function(req, res) {
  res.render("about");
});



app.listen(3000, function(){
  console.log("Server started on port 3000");
});
