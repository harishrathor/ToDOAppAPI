
var express=require("express");
var router=express.Router();
var jwt=require('jwt-simple');
var passport=require("./../../config/passport");

var todoController=require("./../controllers/todolistController");


// for uri /todo/list
module.exports=function(passport){
	var auth=passport.authenticate('jwt',{session: false});
router.get("/list",auth,todoController.todoList);
router.post("/list",auth,todoController.todoInsert);
router.delete("/list/:id",auth,todoController.todoDelete);
router.put("/list/:id",auth,todoController.todoUpdate);

return router;
};
