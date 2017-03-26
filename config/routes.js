
module.exports=function(app,passport){
	var routeFolder="./../app/routes/";

	// Routes for user model

	app.get("/",function(req,res){
		res.json({
			"success":true,
			"message":"You are welcome to ToDo App API."
		});
	});
	console.log(passport);
	var userRoutes=require(routeFolder+"userRoutes")(passport);
	app.use("/user",userRoutes);

	// Routes for todo model
	var todoRoutes=require(routeFolder+"todolistRoutes")(passport);
	app.use("/todo",todoRoutes);
}
