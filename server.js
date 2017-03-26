var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var expressJWT=require("express-jwt");
var jwt=require("jsonwebtoken");
var morgan=require("morgan");
var methodOverride=require("method-override");
var passport=require("passport");
var passport=require("passport");

require("./config/database");
require("./config/passport");

app.use(passport.initialize());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:"application/vnd.api+json"}));
app.use(methodOverride());


app.use(function(err,req,res,next){
	      //Website murls to which you want to gice access 
      res.setHeader("Access-Control-Allow-Origin","http://localhost:8080");
      //Request methods you wish to allow
      res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE");
      // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

var routes=require("./config/routes");
routes(app,passport);
require("./config/passport")(passport);
app.listen(8080,function(err,connection){
	console.log("App listening on port 8080");
});