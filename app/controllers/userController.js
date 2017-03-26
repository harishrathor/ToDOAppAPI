var User=require("./../models/user");
var Token=require("./../shared/getToken");
var jwt=require("jwt-simple");
var config=require('./../../config/database');

module.exports={
	signup:signup,
	authenticate:authenticate,
	memberinfo:memberinfo
};


function signup(req,res){
	console.log("in signup");
	if(!req.body.username || !req.body.password || !req.body.name)
	{
		res.json({success: false,msg: 'Blank username name or password'});
	}
	else
	{
		var newUser=new User(
		{
			username:req.body.username,
			name: req.body.name,
			password: req.body.password
		});
		newUser.save(function(err)
		{
			if(err)
			{
				res.json({success: false,msg: 'username already exists'});
			}
			else
			{
				res.json({success: true,msg: 'Successfully registered'});
			}
		});
	}
}
function authenticate(req,res){
	console.log("in authenticate");
	if(!req.body.username || !req.body.password)
	{
		console.log('1');
		res.json({success: false,msg: 'Blank username or password'});
	}
	else
	{
		User.findOne({username: req.body.username},function(err,user)
		{
			if(err)
			{
				console.log('2');
				throw err;
			}
			if(!user)
			{
				console.log('3');
				return res.status(403).send({success: false,msg: 'Authentication failed.User not found'});
			}
			else
			{
				console.log('4');
				user.comparePassword(req.body.password,function(err,isMatch)
				{
					if(isMatch && !err)
					{
						var token=jwt.encode(user,config.secret);
						res.json({success: true,token: 'JWT '+token});
					}
					else
					{
						return res.status(403).send({success: false,msg: 'Authentication failed.Wrong Password'});
					}
					
				});
			}	
		});
	}
}
function memberinfo(req,res){
	console.log("in memberinfo headers ",req.headers);
	var token=Token.getToken(req.headers);
	console.log('request to memberinfo reached'+req.headers);
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
				return res.status(403).send({success: false,msg: 'Authentication failed.User not found'});
			}
			else
			{
				
				return res.json({success: true,msg: 'welcome in the member area'+user.name+'!'});
			}
		});
	}
	else
	{
		return res.status(403).send({success: false,msg: 'No token provided.'});
	}
}