require('./index.css')
require('page/common/footer/index.js');
require('page/common/nav-simple/index.js');

var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default',
	//console.log(type);
	$element = $('.' + type + '-success').show();
	console.log('.' + type + '-success');
})