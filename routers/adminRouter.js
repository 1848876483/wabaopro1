var express = require('express');
var Map = require('../models/map.js');
var Good = require('../models/good.js');
var router = express.Router();

router.get('/index',(req,res)=>{

	Good.findOne().then((goodsInfo)=>{

		if(goodsInfo){
			var goods = goodsInfo.goods;
		}
		else{
			var goods = [];
		}
		res.render('admin',{
			title : '挖宝后台页',
			goods : goods
		});

	});

	

});

//更新地图
router.get('/createMap',(req,res)=>{

	var number = req.query.number;

	Map.remove({}).then(()=>{

		for(var i=0;i<number;i++){
			new Map({
				isCheck : false
			}).save().then();
		}
		
		res.send(JSON.stringify({
			code : 0
		}));

	});

});

router.get('/addGoods',(req,res)=>{

	var content = req.query.content;

	Good.findOne({}).then((goodsInfo)=>{
		if(goodsInfo){
			goodsInfo.goods.push( content );
			Good.update({},{$set : { goods : goodsInfo.goods }}).then((goodsInfo)=>{
				if(goodsInfo){
					res.send(JSON.stringify({
						code : 0
					}));
				}
			});
		}
		else{
			new Good({
				goods : [ content ]
			}).save().then((goodsInfo)=>{
				if(goodsInfo){
					res.send(JSON.stringify({
						code : 0
					}));
				}
			});	
		}
	})

});

router.get('/removeGoods',(req,res)=>{

	var content = req.query.content;

	Good.findOne({}).then((goodsInfo)=>{
		var goods = goodsInfo.goods;
		for(var i=0;i<goods.length;i++){
			if( goods[i] == content ){
				goods.splice(i,1);
			}
		}
		Good.update({},{$set : { goods : goods } }).then((goodsInfo)=>{
			if(goodsInfo){
				res.send(JSON.stringify({
					code : 0
				}));
			}
		});

	});

});

module.exports = router;