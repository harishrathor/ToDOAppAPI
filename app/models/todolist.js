var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var todolistSchema=new Schema({
username:{type: String,required:true},
todoitem:{type:String,required: true},
description:{type:String},
status:{type:String,required: true},
catagory:{type:String,required: true},
target_date:{type: String,  required: true}
},{collection: 'todolist'});

var Todo=module.exports=mongoose.model('Todo',todolistSchema);

module.exports.getTodoList=function(user,callback,limit)
{
	console.log('in todolist '+user.username);
	 Todo.find({username: user.username},callback).sort({category:1}).limit(limit);
	 
}
 
module.exports.removeTodoItem = function(id,callback)
{ 
	var query={_id:id};
	Todo.remove(query,callback);
}

module.exports.getTodoListById=function(id,callback){
Todo.findById(id,callback);
}




