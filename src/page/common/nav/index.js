require("./index.css")

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var page = {
	init:function(){
		this.bindEvent();
		this.loadUserInfo();
	},
	bindEvent : function(){
		$('.js-login').click(function(){
			_mm.doLogin();
		});

		$('.js-register').click(function(){
			window.location.href = './user-register.html';
		});
		// 点击退出
		$('.js-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		})
	},
	loadUserInfo : function(){
		_user.checkLogin(function(res){
			$('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
		} , function(errMsg){

		});
	}
};

$(function(){
	page.init();
});