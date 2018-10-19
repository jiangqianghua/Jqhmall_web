require('./index.css');

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('page/common/footer/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');
var page = {
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		navSide.init({
			name:'user-center'
		});
		this.loadUserInfo();
	},
	loadUserInfo:function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	bindEvent:function(){
		var _this = this ;
		//btn-submit 因为是在模版里面，只能用on的形式绑定事件
		$(document).on('click','.btn-submit' , function(){
			var userInfo = {
				phone:$.trim($('#phone').val()),
				email:$.trim($('#email').val()),
				question:$.trim($('#question').val()),
				answer:$.trim($('#answer').val())
			}
			var validateResult = _this.formValidate(userInfo);
			if(validateResult.status){
				_user.updateUserInfo(userInfo, function(res,msg){
					_mm.successTips();
					window.location.href = './user-center.html';
				}, function(errMsg){
					_mm.errorTips(validateResult.msg);
				});
			}else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	// 表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证手机号
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱格式
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
}

$(function(){
	page.init();
});