var express = require('express');
var User = require('../models/user.js');
var Map = require('../models/map.js');
var Good = require('../models/good.js');
var router = express.Router();

//注册的功能
router.post('/reg',(req,res)=>{

	//如果是get请求过来的数据 : req.query
	//如果是post请求过来的数据 : req.body (需要第三方中间件 body-parser)

	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	if(username === ''){
		res.send('<script>alert("用户名不能为空");history.back();</script>');
	}
	else if(password === '' || password2 === ''){
		res.send('<script>alert("密码不能为空");history.back();</script>');
	}
	else if(password !== password2){
		res.send('<script>alert("两次密码不一致");history.back();</script>');
	}

	User.findOne({
		username : username
	}).then((userInfo)=>{

		if(userInfo){  //用户注册过了
			res.send('<script>alert("用户名已注册过");history.back();</script>');
		}
		else{     //用户没有注册过
			new User({
				username : username,
				password : password
			}).save().then((userInfo)=>{
				res.send('<script>alert("注册成功");window.location.href="/login";</script>');	
			});
		}

	});

});

//登录的功能
router.post('/login',(req,res)=>{

	var username = req.body.username;
	var password = req.body.password;

	if(username === ''){
		res.send('<script>alert("用户名不能为空");history.back();</script>');
	}
	else if(password === ''){
		res.send('<script>alert("密码不能为空");history.back();</script>');
	}

	User.findOne({
		username : username,
		password : password
	}).then((userInfo)=>{

		if(userInfo){

			var date = new Date();
			date.setDate(date.getDate() + 5);

			res.cookie('userInfo',JSON.stringify({
				_id : userInfo._id
			}),{ expires : date });

			res.send('<script>alert("登录成功");window.location.href="/index";</script>');
		}
		else{
			res.send('<script>alert("用户名或密码不正确");history.back();</script>');
		}

	});

});


//抽奖的功能

router.get('/winning',(req,res)=>{

	var _id = req.query._id;

	Map.update({
		_id : _id
	},{ $set : { isCheck : true } }).then((mapInfo)=>{
		if(mapInfo){

			Good.findOne({}).then((goodsInfo)=>{

				if(goodsInfo){
					var goods = goodsInfo.goods;

					var randomGood = goods[ Math.floor(Math.random() * goods.length) ];

					res.send(JSON.stringify({
						code : 0,
						good : randomGood
					}));
				}
				else{
					res.send(JSON.stringify({
						code : 1
					}));
				}

			});

			
		}
	});

});

module.exports = router;