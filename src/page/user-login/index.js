require('../module')
console.log("login");
require("./index.css");
require('page/common/nav-simple/index.js');
require('page/common/footer/index.js');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
};

var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this ;
		$('#submit').click(function(){
			_this.submit();
		});
		$('.user-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		});
	},
	submit:function(){
		// 提交表单
		var formData = {
		 	username : $.trim($('#username').val()),
		 	password : $.trim($('#password').val())
		};
		validateResult = this.formValidate(formData);
		if(validateResult.status){
			//提交
			_user.login(formData, 
						function(res){
							//登录成功，跳回原来的地址
							window.location.href = _mm.getUrlParam('redirect') || './index.html';
						},
						function(errMsg){
							formError.show(errMsg);
						});
		}else{
			//错误提示
			formError.show(validateResult.msg);
		}
	},
	//表单验证
	formValidate:function(fromData){
		var result = {
			status  : false ,
			msg 	: ''
		};
		if(!_mm.validate(fromData.username,'require')){
			result.msg = '用户名不能为空';
			return result ;
		}

		if(!_mm.validate(fromData.password,'require')){
			result.msg = '密码不能为空';
			return result ;
		}

		// 验证通过
		result.status = true ; 
		result.msg = '验证通过';
		return result ;

	}
};

$(function(){
	page.init();
})

