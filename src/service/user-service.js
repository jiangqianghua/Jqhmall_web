var _mm = require('util/mm.js');

var _user = {
	login : function(userInfo , resolve , reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/login.do'),
			data    : userInfo,
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	checkUsername : function(username, resolve , reject){
		_mm.request({
			url  	: _mm.getServerUrl('/user/register.do'),
			data	:{
				type	: 'username',
				str		: username 
			},
			method 	: 'POST',
			success :resolve,
			error	:reject
		});
	},
	register : function(userInfo , resolve , reject){
		_mm.request({
			url 	: _mm.getServerUrl('user/register.do'),
			data	: userInfo,
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	checkLogin : function(resolve , reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/get_user_info.do'),
			method	: 'POST',
			success	: resolve ,
			error	: reject
		});
	},
	getQuestion : function(username , resolve , reject){
		_mm.request({
			url 	: _mm.getServerUrl('user/forget_get_question.do'),
			data	:{
				username : username
			},
			method  : 'POST' ,
			success : resolve , 
			error 	: reject
		});
	},
	checkAnswer : function(userInfo , resolve , reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/forget_check_ansser.do'),
			data	: userInfo , 
			method	: 'POST',
			success	: resolve , 
			error	: reject 
		});
	},

	resetPassword : function(userInfo , resolve , reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/forget_reset_password.do'),
			data	: userInfo , 
			method	: 'POST' ,
			success	: resolve ,
			error	: reject
		});
	},

	getUserUnfo : function(resolve , reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/get_information.do'),
			method	: 'POST',
			success	: resolve,
			error	: reject
		});
	},
	updateUserInfo : function(userInfo , resolve , reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/update_information.do'),
			data	: userInfo , 
			success :resolve , 
			error	: reject 
		});
	},
	// 登录状态下
	updatePasword : function(userInfo , resolve , reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/reset_password'),
			data	: userInfo,
			method	: 'POST',
			success	: resolve ,
			error	: reject 
		});
	},
	logout : function(resolve , reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/logout.do'),
			method	: 'POST',
			success : resolve , 
			error 	: reject
		});
	}
}

module.exports = _user 