var express=require("express");
var router=express.Router();
var jwt=require('jwt-simple');
var passport=require("../../config/passport");



var userController=require("./../controllers/userController");

module.exports=function(passport){
	
	router.post("/signup",userController.signup);
	router.post("/authenticate",userController.authenticate);
	router.get("/memberinfo",passport.authenticate('jwt',{session: false}),userController.memberinfo);

	return router
};