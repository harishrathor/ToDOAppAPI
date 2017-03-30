var mongoose=require("mongoose");
var bcrypt=require("bcryptjs");
var AutoIncrement=require("mongoose-sequence");
var Schema=mongoose.Schema;

var UserSchema=new Schema({
	username:{type:String,unique:true,required:[true,"Username required."]},
	name:{type:String,require:true},
	password:{type:String,required:true}
});

UserSchema.pre("save",function(next){
	var user=this;
	if(user.isModified("password") || user.isNew){
		bcrypt.genSalt(10,function(err,salt){
			if(err)
				return next(err);
			bcrypt.hash(user.password,salt,function(err,hash){
				if(err){
					return next(err);
				}
				user.password=hash;
				next();
			});
		});
	}else
		return next();
});
//UserSchema.plugin(AutoIncrement);
UserSchema.methods.comparePassword=function(password,callback){
	bcrypt.compare(password,this.password,function(err,isMatch){
		if(err)
			return callback(err);
		callback(null,isMatch);
	});
};

module.exports=mongoose.model("User",UserSchema);
