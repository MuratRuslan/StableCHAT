var express = require('express');
var db=require("../database/db.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("login/index.html");
});
router.post("/",function(req,res,next){

   db.hasUser(req.body.email,function(result){
    	if(result===true)
    	{
    		db.checkPass(req.body.email,req.body.pass,function(result){
             if(result===true)
             {
              req.session.user_id=req.body.email;
              db.updateStatus(req.session.user_id, true);
             	res.redirect("/chat");
             }
             	else
             	{
             		res.send("incorrect password");
             	}
    		})
    	}
    	else
    	res.send("incorrect email");
    })

 
});
router.get("/register",function(req,res,next){
   
  res.render("register/index.html");
});

router.post("/register",function(req,res,next){
	var obj=req.body;
	console.log(typeof obj.mail);
db.addUser(obj.mail,obj.pass);
res.redirect("/");
});

router.post("/chat", function(req, res, next) {
  db.updateStatus(req.session.user_id, false);
   delete req.session.user_id;
    delete req.user;
    delete req.cookies;
    res.redirect('/');
})
router.get("/chat",function(req,res,next){
  if(!req.session.user_id)
    res.redirect("/");
else if(req.session.user_id)
{
	db.getAll(function(result)
	{
    var currentUser = req.session.user_id;
    names = result;
    db.getAllMessages(function(resMess) {
      res.render("Chatlist/index.html",{names:result, currentUser:currentUser, messages: resMess});
    })
	})
}	
})

module.exports = router;
