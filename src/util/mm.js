
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
	doLogin : function(){
		window.location.href = './login.html?redirect='+encodeURIComponent(window.location.href);
	}
}


module.exports = _mm;