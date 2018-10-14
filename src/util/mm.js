var Hogan = require('hogan.js');
var conf = {
	serverHost:''
}
var _mm = {
	request : function(param){
		var _this = this ; 
		$.ajax({
			type     : param.method || 'get',
			url      : param.url    || '',
			dataType : param.type   || 'json',
			data     : param.data   || '',
			success  : function(res){
				if(0 == res.status){
					//请求正常
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}else if(10 === res.status){
					//需要登录，跳转到登陆
					_this.doLogin();
				} else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error    : function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},

	//  获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path ;
	},
	// 获取url参数
	getUrlParam : function(name){
		var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
	},

	renderHtml : function(htmlTemplate , data){
		var template = Hogan.compile(htmlTemplate) ,  
		result = template.render(data);
		return result ;
	},

	successTips : function(msg){
		alert(msg || '操作成功');
	},

	errorTips : function(msg){
		alert(msg || '哪里不对了～');
	},

	//字段验证，致辞是否为空，手机，邮箱
	validate : function(value , type){
		// 非空验证
        if('require' === type){
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
	},

	doLogin : function(){
		window.location.href = './user-login.html?redirect='+encodeURIComponent(window.location.href);
	},

	goHome : function(){
		 window.location.href = './index.html';
	}
}


module.exports = _mm;