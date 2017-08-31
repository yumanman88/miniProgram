let path = require('path');
let webpack = require('webpack');
let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let theme = require('./theme.js');
let proxy = require('http-proxy-middleware');
let px2rem = require('px2rem-loader')
//let precss = require('precss');

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'production';

console.log("当前运行环境：", isPro ? 'production' : 'development');

let plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module) {
            // 该配置假定你引入的 vendor 存在于 node_modules 目录中
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
            //main和vendor之中提取一次common chunk名为manifest，这样每次runtime的变化都被提取到了manifest.hash.js，vendor.hash.js维持不变。
    }),
    new HtmlWebpackPlugin({
        title: 'exam',
        template: path.resolve(__dirname, 'src/index.html'),
    }), //模版
];
let app = ['babel-polyfill', './src/index.js'];
if (isPro) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(nodeEnv)
            }
        })
    )
} else {
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
}


module.exports = {
    devtool: isPro ? false : 'source-map',
    entry: app,
    output: {
        filename: isPro ? '[name].[chunkhash:8].js' : '[name].js',
        path: path.join(__dirname, 'dist'),
        publicPath: isPro ? "" : "",
        chunkFilename: '[name].js'
    },
    plugins: plugins,
    resolve: {
        extensions: ['.web.js', '.js', '.jsx', '.json'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ]
    },
    module: {
        rules: [{
            test: /\.(web.js|js|jsx)$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
            include: path.join(__dirname, 'src')
        }, {
            test: /\.styl$/i,
            use: [
                'style-loader',
                'css-loader',
                'stylus-loader'
            ]
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader' + `?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`],
            include: /node_modules/,
        }, {
            test: /\.css$/,
            use: ['style-loader', {
                loader: "css-loader",
                options: {
                    modules: true,
                    importLoaders: 1,
                }
            }],
            exclude: /node_modules/,
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'less-loader' + `?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`],
            include: /node_modules/,
        }, {
            test: /\.(png|jpg|gif|md)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 400000,
                    name: 'assets/[name].[ext]?[hash]'
                },
            },
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        port: 3000,
        compress: isPro,
        inline: !isPro,
        hot: !isPro,
        host: '0.0.0.0',
        disableHostCheck: true,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: true,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m',
            },
        },
        proxy: {
            '/api': {
                target: 'http://www.wldlight.com',
                secure: false
            }
        }
    }
};
