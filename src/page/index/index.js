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
var navSide = require('page/common/nav-side/index.js');
navSide.init({
	name:'user-center'
});

