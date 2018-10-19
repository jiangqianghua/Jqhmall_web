
// var config ={
// 	entry:'./src/page/index/index.js',
// 	output:{
// 		path:'/Volumes/disk03/workspace/web/jqhmall/dist',
// 		filename:'app.js'
// 	}
// }

var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 配置环境变量，是dev还是online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV)

var getHtmlConfig = function(name,title){
	return {
		template:'./src/view/'+name+'.html',
			filename:'view/'+name+'.html',
			title:title,
			jnject:true,
			hash:true,
			chunks:['common',name]
	}
}

var config ={
	entry:{
		'index':['./src/page/index/index.js'],
		'user-login':['./src/page/user-login/index.js'],
		'user-register':['./src/page/user-register/index.js'],
		'user-pass-reset':['./src/page/user-pass-reset/index.js'],
		'user-center':['./src/page/user-center/index.js'],
		'common':['./src/page/common/index.js'],  // 该模块回放在base.js中
		'result':['./src/page/result/index.js'],
	},
	output:{
		path:'/Volumes/disk03/workspace/web/jqhmall/dist',
		publicPath:'/dist',   //作用是可以让webpack-dev-server修改实时生效
		filename:'js/[name].js'
	},
	externals:{
		'jquery':'window.jQuery' // 引入html引入的js库
	},
	// webpack 1.x
	// module: {
 //  		loaders: [{
 //    	test: /\.css$/,
 //    	loader: Ex.extract('style-loader', 'css-loader')  // 单独打包出CSS，这里配置注意下
 //  		}]
	// },

	//webpack3.x
	module:{
    	rules:[
    		{
	        	test: /\.css$/,
	        	use: Ex.extract({
	            	fallback: "style-loader",
	            	use: "css-loader"
	        	})
        	},
        	{
	        	test: /\.(gif|png|jpg|eot|svg|ttf|woff|woff2)$/,
	        	use: [
			        {
			            loader: 'url-loader',
			            options: {
			                limit: 1024,//,
			                name:'[name].[ext]',
			                outputPath: 'resource/',
			            }
			        }
			    ]
        	},
        	{
	        	test: /\.string$/,
	        	use: [{
	        		loader:'html-loader'
	        	}]
        	},
    	]
	},

	resolve:{
		alias:{
			util    : __dirname +'/src/util',
			node_modules : __dirname + '/node_modules',
			page    : __dirname + '/src/page',
			service : __dirname + '/src/service',
			image   : __dirname + '/src/image'
		}
	},

	plugins:[
		// 抽取公共模块，只有一个js多个js引用的时候回生效
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'js/base.js'  // 会放在dist目录下
		}),
		// css单独大包
		new Ex("css/[name].css"),
		//html模版处理
		// new HtmlWebpackPlugin({
		// 	template:'./src/view/index.html',
		// 	filename:'view/index.html',
		// 	jnject:true,
		// 	hash:true,
		// 	chunks:['common','index']
		// }),

		new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
		new HtmlWebpackPlugin(getHtmlConfig('result','结果页面'))
	]
}

//  如果是dev环境
if('dev' === WEBPACK_ENV){
	console.log("is dev");
	config.entry.common.push("webpack-dev-server/client?http://localhost:8088/");
}

module.exports = config;