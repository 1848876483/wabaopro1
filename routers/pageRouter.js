var express = require('express');
var Map = require('../models/map.js');
var router = express.Router();

router.get('/index',(req,res)=>{

	res.render('index',{
		title : '挖宝首页',
		userInfo : req.cookies.userInfo && JSON.parse(req.cookies.userInfo)
	});

});

router.get('/login',(req,res)=>{

	res.render('login',{
		title : '挖宝登录页'
	});

});

router.get('/reg',(req,res)=>{

	res.render('reg',{
		title : '挖宝注册页'
	});

});

router.get('/play',(req,res)=>{

	isSkipLogin(req,res);

	Map.find().then((mapInfo)=>{

		res.render('play',{
			title : '挖宝游戏页',
			mapList : mapInfo
		});

	});

	

});

router.get('/info',(req,res)=>{

	isSkipLogin(req,res);

	res.render('info',{
		title : '挖宝信息页'
	});

});


function isSkipLogin(req,res){
	if(!req.cookies.userInfo){
		res.redirect('/index');
		return;
	}
}

module.exports = router;