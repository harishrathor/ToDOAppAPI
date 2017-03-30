var mongoose=require("mongoose");

var dbURI="mongodb://localhost:27017/todoapp";

mongoose.connect(dbURI);

mongoose.connection.on("connected",function(){
	console.log("Mongoose connection open to "+dbURI);
});
mongoose.connection.on("error",function(err){
	console.log("Mongoose connection error "+err);
});
mongoose.connection.on("disconencted",function(){
	console.log("Mongoose connection disconencted");
});

// if the node proecess ends, close the mongoose connection
process.on("SIGINT",function(){
	mongoose.connection.close(function(){
		console.log("Mongoose connection disconencted through app");
		process.exit(0);
	});
});
module.exports=
	{
		'secret': 'harishrathor',
		'database': 'mongodb://127.0.0.1:7070/todoapp'
	};
// files in this connection should appear
require("./../app/models/user");
require("./../app/models/todolist");
