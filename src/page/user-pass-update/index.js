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
			name:'user-pass-update'
		});
	},
	bindEvent:function(){
		var _this = this ;
		//btn-submit 因为是在模版里面，只能用on的形式绑定事件
		$(document).on('click','.btn-submit' , function(){
			var userInfo = {
				password:$.trim($('#password').val()),
				passwordNew:$.trim($('#password-new').val()),
				passwordConfirm:$.trim($('#password-confirm').val())
			}
			var validateResult = _this.formValidate(userInfo);
			if(validateResult.status){
				_user.updatePasword({
					passwordOld:userInfo.password,
					passwordNew:userInfo.passwordNew
				}, function(res,msg){
					_mm.successTips();
					window.location.href = './user-center.html';
				}, function(errMsg){
					_mm.errorTips(errMsg);
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
        // 验证密码是否为空
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }

        if(!_mm.validate(formData.passwordNew, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        // 验证密码长度
        if(formData.passwordNew.length < 6){
            result.msg = '密码长度不能少于6位';
            return result;
        }
        // 验证两次输入的密码是否一致
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
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