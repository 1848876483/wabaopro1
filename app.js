var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var pageRouter = require('./routers/pageRouter.js');
var apiRouter = require('./routers/apiRouter.js');
var adminRouter = require('./routers/adminRouter.js');
var xssRouter = require('./routers/xssRouter.js');

var port = 3000;
var hostname = 'localhost';
var hostDB = 'mongodb://localhost:27017/wabao';

var app = express();

//设置ejs模版引擎
app.set('views','./views');
app.set('view engine','ejs'); 
//设置静态资源
app.use(express.static('public'));
//设置post数据的操作
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//设置cookie的操作
app.use(cookieParser());

//路由的调用
app.use('/',pageRouter);
app.use('/api',apiRouter);
app.use('/admin',adminRouter);
app.use('/aq',xssRouter);

app.use((req,res)=>{
	res.redirect('/index');
});


mongoose.connect(hostDB,(err)=>{
	if(err){
		console.log('数据库链接失败！');
	}
	else{
		console.log('数据库链接成功！');

		app.listen(port,(err)=>{
			if(err){
				console.log('服务器开启失败!');
			}
			else{
				console.log('服务器开启成功!');
			}
		});

	}
});



