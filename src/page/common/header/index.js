require("./index.css")

var _mm = require('util/mm.js');
// 通用页面头部
var header = {
	init:function(){
		this.bindEvent();
	},
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent:function(){
		var _this = this ;
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		// 搜索框输入回车提交
		$('#search-input').keyup(function(e){
			// 13 回车键
			if(e.keyCode == 13){
				_this.searchSubmit();
			}
		});
	},
	// 搜索提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href = './list.html?keyword='+keyword;
		}else{
			_mm.goHome();
		}
	
	}
};
header.init();