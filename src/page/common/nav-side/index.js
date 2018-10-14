require("./index.css")

var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
// 侧边导航
var navSide = {
	option:{
		name:'about',
		navList:[
			{
				name:'user-center',desc:'个人中心', href:'./user-center.html'
			},
			{
				name:'order-list',desc:'我的订单', href:'./order-list.html'
			},
			{
				name:'pass-update',desc:'修改密码', href:'./pass-update.html'
			},
			{
				name:'about',desc:'关于mmall', href:'./about.html'
			}

		]
	},
	init:function(option){
		// 合并，把传入的option合并到磨人的option中
		$.extend(this.option, option)
		this.bindEvent();
		this.renderNav();
	},
	// 渲染导航
	renderNav:function(){
		// 计算activit数据
		var iLength = 0 ;
		for(var i = 0 , iLength = this.option.navList.length ; i < iLength; i++){
			if(this.option.navList[i].name === this.option.name){
				this.option.navList[i].isActive = true ;
			}
		}
		//console.log(templateIndex);
		// 渲染html
		var navHtml = _mm.renderHtml(templateIndex,{
			navList : this.option.navList
		});
		// 把html放入容器
		$('.nav-side').html(navHtml);
	},
	bindEvent:function(){
		var _this = this ;
	},

};
module.exports = navSide;