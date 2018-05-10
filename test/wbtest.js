var chai = require('chai');
var pageRouter = require('../routers/pageRouter.js');
var randomNumber = require('../src/randomNumber.js');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect; 



describe('挖宝项目的测试',function(){

	
	context('路由相关的测试' , function(){

		it('路由对象的类型', function(){

			expect(pageRouter).to.be.a('function','pageRouter返回的是函数');

		});	

		it('路由对象的方法', function(){

			expect(pageRouter.get).to.be.not.equal(undefined,'该方法不存在pageRouter对象下');

		});	

	});

	context('src相关的测试' , function(){

		it('随机数', function(){

			for(var i=0;i<100;i++){
				var number = randomNumber(3,10);
				expect(number).to.be.most(10);
				expect(number).to.be.least(3);
			}
		});	

	});
		

});