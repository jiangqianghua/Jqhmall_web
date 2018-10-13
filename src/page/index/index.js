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