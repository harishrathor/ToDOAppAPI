var Todo=require("./../models/todolist");
var jwt=require("jwt-simple");
var config=require('./../../config/database');
var Token=require("./../shared/getToken");
var User=require("./../models/user");
var mongoose=require("mongoose");
var db=mongoose.connection;

module.exports={
	todoList:todoList,
	todoInsert:todoInsert,
	todoDelete:todoDelete,
	todoUpdate:todoUpdate
};

function todoList(req,res){
	var token=Token.getToken(req.headers);
	if(token)
	{
		var decoded=jwt.decode(token,config.secret);
		User.findOne(
		{
			username: decoded.username
		},function(err,user)
		{
			if(err)
			{
				throw err;
			}
			if(!user)
			{
				return res.status(403).send({success: false,msg: 'Authentication failed.You are not authorized to visit this link'});
			}
			else
			{
				Todo.getTodoList(user,function(err,todolists)
				{
					if(err)
					{
						throw err;
					}
					return res.json(todolists);  
				}); 
				
				
			}
		});
	}
	else
	{
		return res.status(403).send({success: false,msg: 'No token provided.Not authorized to access'});
	}
}
function todoInsert(req,res){
	var token=Token.getToken(req.headers);
	if(token)
	{
		var decoded=jwt.decode(token,config.secret);
		User.findOne(
		{
			username: decoded.username
		},function(err,user)
		{
			if(err)
			{
				console.log('throwing error');
				throw err;
			}
			if(!user)
			{
				return res.status(403).send({success: false,msg: 'Authentication failed.'});
			}
			else
			{
				var entry=
				{
					username: user.username,
					todoitem: req.body.todoitem,
					description: req.body.description,
					status: req.body.status,
					catagory: req.body.catagory,
					target_date: req.body.target_date
					
				}
				db.collection('todolist').save(entry,function(err,doc)
				{
					return res.json(doc);
				})
				
			}
		});
	}
	else
	{
		return res.status(403).send({success: false,msg: 'No token provided.'});
	}
}
function todoDelete(req,res){
	var id=req.params.id;
	var token=Token.getToken(req.headers);
	if(token)
	{
		var decoded=jwt.decode(token,config.secret);
		User.findOne(
		{
			username: decoded.username
		},function(err,user)
		{
			if(err)
			{
				throw err;
			}
			if(!user)
			{
				return res.status(403).send({success: false,msg: 'Authentication failed.'});
			}
			else
			{
				Todo.removeTodoItem(id,function(err,doc)
				{
					if(err)
					{
						throw err;
					}
					return res.json(doc);
				});
			}
		});
	}
	else
	{
		return res.status(403).send({success: false,msg: 'No token provided.'});
	}
}
function todoUpdate(req,res){
	var token=Token.getToken(req.headers);
	if(token)
	{
		var decoded=jwt.decode(token,config.secret);
		User.findOne(
		{
			username: decoded.username
		},function(err,user)
		{
			if(err)
			{
				console.log('throwing error');
				throw err;
			}
			if(!user)
			{
				return res.status(403).send({success: false,msg: 'Authentication failed.'});
			}
			else
			{
				var id=req.params.id;
				Todo.getTodoListById(id,function(err,list)
				{
					if(err)
					{
						console.log(err);
						res.status(500).send({success: false,msg: 'error'});
					}
					else
					{
						if(!list)
						{
							res.status(404).send({success: false,msg: 'no list found'});
						}	
						else
						{
							if(req.body.todoitem)
							{
								list.todoitem=req.body.todoitem;
							}
							if(req.body.description)
							{
								list.description=req.body.description;
							}
							if(req.body.status)
							{
								list.status=req.body.status;
							}
							if(req.body.catagory)
							{
								list.catagory=req.body.catagory;
							}
							if(req.body.target_date)
							{
								list.target_date=req.body.target_date;
							}
							list.save(function(err,updatedList)
							{
								if(err)
								{
									console.log(err);
									res.status(500).send({success: false,msg: 'error  while saving',error:err});
								}
								else
								{
									res.send(updatedList);
								}
								
							});
						}	
					}
				});
				
				
			}
		});
	}
	else
	{
		return res.status(403).send({success: false,msg: 'No token provided.'});
	}	
}