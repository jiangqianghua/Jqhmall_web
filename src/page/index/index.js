/**
import bar from './bar';

require('../module')
require('./index.css')
 var $$ = require('jquery')  //引入html引入的js库

$$("div").html("ccc");
$("div").html("ccc");

console.log("index");
bar();
**/

var mm = require('util/mm.js');

console.log(mm.getUrlParam('name'));
/**
//http://happymmall.com/product/list.do?keyword=1
mm.request({
	url : '/product/list.do?keyword=1',
	success : function(res){
		console.log(res);
	},
	error : function(errMsg){
		console.log(errMsg);
	}
});
**/

//测室hogan模版
/**
var html = '<div>{{data}}</div>';

var data = {
	data : 123
};

console.log(mm.renderHtml(html,data));
**/
//require('page/common/nav-simple/index.js');
require('./index.css');
require('page/common/nav/index.js');
require('page/common/footer/index.js');
require('page/common/header/index.js');
require('util/slider/index.js')
var templateBanner = require('./banner.string');
var _mm = require('util/mm.js');


$(function() {
	//var bannerHtml = _mm.renderHtml(templateBanner);
	//$('.banner-con').html(bannerHtml);
    $('.banner').unslider({
	    speed: 500,               // 动画的速度,没有过度效果时为 false  (整型或布尔型)
	    delay: 3000,              // 幻灯片之间的延迟，没有自动播放时为false（整数或布尔）
	    complete: function() {},  // 播放每张幻灯片后调用的函数
	    keys: true,               // 允许键盘左右键控制
	    dots: true,               // 显示点导航
	    fluid: false              // 支持响应式设计
	});

    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $('.banner').data('unslider')[forward]();
    });
});


