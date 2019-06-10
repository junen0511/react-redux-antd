## Available Scripts

In the project directory, you can run:

### `npm run start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `npm run prod` or `yarn prod`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## 说明书

### 项目目录结构

	
		├── /config/         # 配置相关：devServer配置，env多环境的配置，项目文件夹绝对路径，antd定制主题
		├── /dist/           # 输出目录
		├── /public/         # html模板icon文件
		├── /scripts/        # 构建配置
		├── /src/            # 业务逻辑代码
		│ ├── /assets/       # 项目静态资源文件
		│ ├── /common/       # 路由表及页面组件loader&菜单管理
		│ ├── /components/   # UI组件及UI相关方法
		│ │ ├── /Authorized/ # 权限组件&权限管理 
		│ ├── /global/    	 # 独立状态管理
		│ ├── /pages/        # 项目页面组件
		│ ├── /styles/    	 # 全局样式及UI主题
		│ ├── /utils/        # 工具函数
		│ ├── App.js         # 项目入口组件
		│ ├── index.js       # 项目入口文件,挂载组件,初始化 
		│ ├── reducers.js    # 合并combine reducers
		│ └── store.js       # compose middlewares & create store
		├── .babelrc         # babel-loader配置
		├── .eslintrc        # Eslint配置
		├── .prettierrc      # Prettierrc格式化配置
		└── package.json     # 项目信息 
	

[权限使用说明](https://v1.pro.ant.design/docs/authority-management-cn)
### webpack配置

这里是通过babel-loader来运行编译react组件的（这里用的babel7）

#### .babelrc文件配置:

	{
	    "presets": ["@babel/preset-env", "@babel/preset-react"],
	    "plugins": [
	        "@babel/plugin-transform-runtime",
	        "@babel/plugin-syntax-dynamic-import",
	        "@babel/plugin-proposal-class-properties",
	        ["import", { "libraryName": "antd", "style": true }]
	    ]
	}

- preset-env JavaScript语法兼容转码规则
- preset-react react转码规则
- plugin-syntax-dynamic-import 动态导入组件
- plugin-proposal-class-properties 转换静态类属性 
- ["import", { "libraryName": "antd", "style": true }] antd组件按需加载配置

#### webpack基本配置 webpack.base.conf.js：

注意这里加载antd组件的less文件和自定义组件的less是有区别的：

- 加载自定义组件less文件时，忽略node_modules文件夹`exclude: config.nodeModules`，设置来源文件夹src`include: config.src`。不然会导致antd组件less被scoped处理，组件样式无法生效。如果less文件需要导入antd的公共样式，less-loader配置项设置`javascriptEnabled: true`。
- 加载antd组件的less文件时，忽略src目录下的文件`exclude: config.src`。不然会导致自定义组件无法做scoped处理。
- 定制antd主题时less-loader配置javascriptEnabled:true, .babelrc插件配置`["import", { "libraryName": "antd", "style": true }]`。
- css兼容前缀自动补全 postcss-loader&autoprefixer（和less-loader有先后区分）
- 编译进度条 webpackbar

		'use strict';
		
		const WebpackBar = require('webpackbar');
		const MiniCssExtractPlugin = require('mini-css-extract-plugin');
		const config = require('../config');
		const utils = require('./utils');
		const prodMode = process.env.NODE_ENV === 'production';
		
		module.exports = {
		    entry: [config.main],
		    output: {
		        path: config.prod.assetsRoot,
		        filename: '[name].js',
		        publicPath: prodMode ? config.prod.assetsPublicPath : config.start.assetsPublicPath
		    },
		    resolve: {
		        extensions: ['.js', '.jsx', '.json'],
		        alias: {
		            '@src': utils.resolve('src'),
		            assets: utils.resolve('src/assets'),
		            components: utils.resolve('src/components'),
		            layouts: utils.resolve('src/layouts'),
		            styles: utils.resolve('src/styles'),
		            utils: utils.resolve('src/utils'),
		            '@ant-design/icons/lib/dist$': utils.resolve('src/utils/antdIcon.js')
		        }
		    },
		    plugins: [new WebpackBar()],
		    module: {
		        rules: [
		            {
		                test: /\.(js|jsx)$/,
		                exclude: config.nodeModules,
		                loader: 'babel-loader',
		                include: config.src
		            },
		            // Modular loader components styles
		            {
		                test: /\.(css|less)$/,
		                exclude: config.nodeModules,
		                include: config.src,
		                use: [
		                    {
		                        loader: prodMode ? MiniCssExtractPlugin.loader : 'style-loader'
		                    },
		                    {
		                        loader: 'css-loader',
		                        options: {
		                            sourceMap: true,
		                            modules: true,
		                            localIdentName: '[local]___[hash:base64:5]'
		                        }
		                    },
		                    {
		                        loader: 'postcss-loader',
		                        options: {
		                            plugins: () => [
		                                require('autoprefixer')({
		                                    browsers: ['> 1%', 'last 2 versions']
		                                })
		                            ]
		                        }
		                    },
		                    {
		                        loader: 'less-loader',
		                        options: {
		                            javascriptEnabled: true
		                        }
		                    }
		                ]
		            },
		            // Customize antd themes
		            {
		                test: /\.(css|less)$/,
		                exclude: config.src,
		                use: [
		                    {
		                        loader: prodMode ? MiniCssExtractPlugin.loader : 'style-loader'
		                    },
		                    {
		                        loader: 'css-loader'
		                    },
		                    {
		                        loader: 'less-loader',
		                        options: {
		                            modifyVars: config.theme,
		                            javascriptEnabled: true,
		                            sourceMap: true
		                        }
		                    }
		                ]
		            },
		            {
		                test: /\.(png|jpg|gif|svg)$/,
		                use: [
		                    {
		                        loader: 'file-loader',
		                        options: {}
		                    }
		                ]
		            }
		        ]
		    }
		};


#### webpack开发环境配置 webpack.start.conf.js：

- 配置devServer
- 设置开发环境的环境变量
- 启用热替换 HotModuleReplacementPlugin & NamedModulesPlugin
- 编译出错时跳过输出阶段 NoEmitOnErrorsPlugin
- 引用生成后的静态资源 HtmlWebpackPlugin
- webpack编译友好报错 friendly-errors-webpack-plugin


		'use strict';
		
		const path = require('path');
		const webpack = require('webpack');
		const merge = require('webpack-merge');
		const chalk = require('chalk');
		const HtmlWebpackPlugin = require('html-webpack-plugin');
		const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
		const portfinder = require('portfinder');
		const address = require('address');
		const baseWebpackConfig = require('./webpack.base.conf');
		const config = require('../config');
		const utils = require('./utils');
		const packageConfig = require('../package.json');
		
		const startWebpackConfig = merge(baseWebpackConfig, {
		    mode: 'development',
		    devServer: config.devServer,
		    devtool: config.start.devtool,
		    plugins: [
		        new webpack.DefinePlugin({
		            'process.env': config.env.start
		        }),
		        new webpack.HotModuleReplacementPlugin(),
		        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
		        new webpack.NoEmitOnErrorsPlugin(),
		        // https://github.com/ampedandwired/html-webpack-plugin
		        new HtmlWebpackPlugin({
		            inject: true,
		            template: config.template
		        })
		    ]
		});
		
		module.exports = new Promise((resolve, reject) => {
		    portfinder.basePort = process.env.PORT || config.devServer.port;
		    portfinder.getPort((err, port) => {
		        if (err) {
		            reject(err);
		        } else {
		            // publish the new Port, necessary for e2e tests
		            process.env.PORT = port;
		            // add port to devServer config
		            startWebpackConfig.devServer.port = port;
		
		            // Add FriendlyErrorsPlugin
		            startWebpackConfig.plugins.push(
		                new FriendlyErrorsPlugin({
		                    compilationSuccessInfo: {
		                        messages: [
		                            `You can now view ${chalk.bold(packageConfig.name)} in the browser.`,
		                            `${chalk.bold('Local:')}            http://${address.ip('lo')}:${chalk.bold(port)}`,
		                            `${chalk.bold('On Your Network:')}  http://${address.ip()}:${chalk.bold(port)}/`
		                        ]
		                    },
		                    onErrors: config.start.notifyOnErrors ? utils.createNotifierCallback() : undefined
		                })
		            );
		
		            resolve(startWebpackConfig);
		        }
		    });
		 });


#### webpack开发环境配置 webpack.prod.conf.js：

- 设置生产环境的环境变量
- 提取并优化压缩css文件 MiniCssExtractPlugin & OptimizeCSSPlugin
- 分割并压缩JavaScript代码 optimization:splitChunks & optimization:minimizer
- TerserPlugin ES6代码压缩（UglifyJsPlugin打包未做ES5兼容的模块会报错）
- 引用生成后静态资源 HtmlWebpackPlugin

		'use strict';
		const webpack = require('webpack');
		const merge = require('webpack-merge');
		const HtmlWebpackPlugin = require('html-webpack-plugin');
		const MiniCssExtractPlugin = require('mini-css-extract-plugin');
		const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
		const TerserPlugin = require('terser-webpack-plugin');
		const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
		const baseWebpackConfig = require('./webpack.base.conf');
		const utils = require('./utils');
		const config = require('../config');
		
		const webpackConfig = merge(baseWebpackConfig, {
		    mode: 'production',
		    devtool: config.prod.productionSourceMap ? config.prod.devtool : false,
		    output: {
		        path: config.prod.assetsRoot,
		        filename: utils.assetsPath('js/[name].[chunkhash].js'),
		        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
		    },
		    plugins: [
		        new webpack.DefinePlugin({
		            'process.env': config.env[process.env.ENV_CONFIG]
		        }),
		        // extract css into its own file
		        new MiniCssExtractPlugin({
		            filename: utils.assetsPath('css/[name].[contenthash].css'),
		            allChunk: false
		        }),
		        // Compress extracted CSS.
		        // duplicated CSS from different components can be deduped.
		        new OptimizeCSSPlugin({
		            cssProcessorOptions: config.prod.productionSourceMap
		                ? { safe: true, map: { inline: false } }
		                : { safe: true }
		        }),
		        // generate dist index.html with correct asset hash for caching.
		        // you can customize output by editing /index.html
		        // see https://github.com/ampedandwired/html-webpack-plugin
		        new HtmlWebpackPlugin({
		            inject: true,
		            favicon: config.favicon,
		            template: config.template,
		            minify: {
		                removeComments: true,
		                collapseWhitespace: true,
		                removeRedundantAttributes: true,
		                useShortDoctype: true,
		                removeEmptyAttributes: true,
		                removeStyleLinkTypeAttributes: true,
		                keepClosingSlash: true,
		                minifyJS: true,
		                minifyCSS: true,
		                minifyURLs: true
		            },
		            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
		            chunksSortMode: 'dependency'
		        }),
		        // keep module.id stable when vendor modules does not change
		        new webpack.HashedModuleIdsPlugin(),
		        // enable scope hoisting
		        new webpack.optimize.ModuleConcatenationPlugin(),
		        //  represents bundle content as convenient interactive zoomable treemap
		        // new BundleAnalyzerPlugin()
		    ],
		    optimization: {
		        runtimeChunk: true,
		        splitChunks: {
		            chunks: 'all',
		            minSize: 30000,
		            minChunks: 1,
		            maxAsyncRequests: 5,
		            maxInitialRequests: 5,
		            automaticNameDelimiter: '~',
		            name: true,
		            cacheGroups: {
		                'vendors-core': {
		                    test: /(react|react-dom|react-router-dom|redux|react-redux|react-router-redux|redux-thunk|history|prop-types|axios)/,
		                    chunks: 'initial',
		                    name: 'vendors-core',
		                    priority: 40
		                },
		                vendors: {
		                    test: /[\\/]node_modules[\\/]/,
		                    chunks: 'all',
		                    name: 'vendors',
		                    priority: 0
		                },
		                'async-commons': {
		                    chunks: 'async',
		                    minChunks: 2,
		                    name: 'async-commons',
		                    priority: -10
		                },
		                commons: {
		                    chunks: 'all',
		                    minChunks: 2,
		                    name: 'commons',
		                    priority: -20
		                }
		            }
		        },
		        minimizer: [
		            new TerserPlugin({
		                terserOptions: {
		                    compress: {
		                        warnings: false,
		                        drop_console: true
		                    }
		                },
		                parallel: true,
		                sourceMap: config.prod.productionSourceMap
		            })
		        ]
		    }
		});
		
		module.exports = webpackConfig;


### 业务组件的设计
在满足业务需求的同时，还要让自己的代码简洁、可读性高、易于维护，这样才能写出高质量的软件。 

- 高内聚力：把逻辑紧密相关的内容放到一个组件
- 低耦合性：跨组件之间依赖关系要弱化
 
用户界面展示公式：UI = render(state) 模板(view)&数据(state)构建用户界面  
按功能组织文件和目录：

		├── /pages/						# 项目页面组件
		│ ├── /Home/					# 首页
		│ │ ├── /view/					# 页面视图组件
		│ │ ├── /actions.js				# 页面action
		│ │ ├── /actionTypes.js			# 页面action type
		│ │ ├── /index.js				# 页面主导出口
		│ │ ├── /reducer.js				# 页面reducer
		│ │ └── /service.js				# 页面依赖的接口

我们的理想：  
“在最理想的情况下，我们应该通过增加代码就能增加系统的功能，而不是通过对现有代码的修改来增加功能。”
