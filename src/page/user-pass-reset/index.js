require('./index.css');

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
	data:{
		username:'',
		question:'',
		answer:'',
		token:''
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		this.loadStepUsername();
	},
	bindEvent:function(){
		var _this = this ;
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			if(username){
				_user.getQuestion(username , function(res){
					_this.data.username = username ; 
					_this.data.question = res ;
					_this.loadStepQuestion();
				},function(errMsg){
					formError.show(errMsg);
				});
			}else{
				formError.show('请输入用户名');
			}
		});

		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			if(answer){
				_user.checkAnswer({
					username:_this.data.username ,
					question:_this.data.question , 
					answer:_this.data.answer
				}
				 , function(res){
					_this.data.answer = answer ;
					_this.data.token = res;
					_this.loadStepPassword();
				},function(errMsg){
					formError.show(errMsg);
				});
			}else{
				formError.show('请输入密码提示问题的答案');
			}
		});
	},
	loadStepUsername: function(){
		$('.step-username').show();
		$('.step-question').hide();
		$('.step-password').hide();
	},
	loadStepQuestion:function(){
		// 加载显示问题提示
		// $('.step-username').hide();
		// $('.step-question').show();
		// $('.step-password').hide();
		formError.hide();
		$('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question)
	},
	loadStepPassword:function(){
		// 加载用户密码
		$('.step-question').hide().siblings('.step-password').show();
	}
}


$(function(){
	page.init();
})