var express = require('express');
var tc = require('trek-captcha');
var User = require('../models/user.js');
var Message = require('../models/message.js');
var router = express.Router();


//对HTML结构进行XSS的防御
function escapeHTML(str){
	if(!str){
		return '';
	}
	return str.replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
//对HTML属性进行XSS的防御
function escapePro(str){
	if(!str){
		return '';
	}
	return str.replace(/"/g,'&quot;');
}

//对HTML属性进行XSS的防御
function escapeScript(str){
	if(!str){
		return '';
	}
	return str.replace(/"/g,'\\"');
}

//对输入型CSS的防御
function escapeInput(str){
	if(!str){
		return '';
	}
	return str.replace(/<\/?script>/g,'');
}


router.get('/xss',(req,res)=>{

	res.set('X-XSS-Protection',0);

	Message.find().then((messageData)=>{

		res.render('xss',{
			title : 'hello xss',
			username : escapeHTML(req.query.username),
			imgurl : escapePro(req.query.imgurl),
			detailid : escapeScript(req.query.detailid),
			messageData : messageData
		});


	});

	

});


router.post('/message',(req,res)=>{

	var messagecontent = req.body.messagecontent;
	var _id = JSON.parse(req.cookies.userInfo)._id;
	var yzmcontent = req.body.yzmcontent;

	//referer : 检测是哪个域名发送过来的请求

	/*var referer = req.headers.referer;
	if( !/^http:\/\/localhost:3000/.test(referer) ){
		return;
	}*/

	if(yzmcontent !== JSON.parse(req.cookies.yzm).token){
		res.send('<script>alert("验证码错误");history.back();</script>');
		return;
	}


	User.findOne({_id : _id}).then((userInfo)=>{

		if(userInfo){
			var username = userInfo.username;

			new Message({
				messageuser : username,
				messagecontent : escapeInput(messagecontent)
			}).save().then((messageInfo)=>{

				if(messageInfo){
					res.send('<script>alert("留言成功！"); window.location.href="/aq/xss"; </script>');
				}

			});

		}

	});

});

router.get('/yzm',(req,res)=>{

	tc().then((yzmInfo)=>{

		//console.log(yzmInfo);
		res.cookie('yzm',JSON.stringify({
			token : yzmInfo.token
		}));
		res.send( yzmInfo.buffer );
	});	

});


module.exports = router;
