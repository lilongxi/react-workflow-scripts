const WebpackChain = require('webpack-chain')
const webpack = require('webpack')
const bourbon = require('bourbon')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const progressBarPlugins = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const constants = require('../utils/constants')
const AssestConf = require('../utils/conf')
const { resolve } = require('../utils')
const loaderConf = require('../options/loader.conf')

const config = new WebpackChain()

function _webpack_core(conf){

    // 配置文件出口和入口
    config
        .entry('polyfill')
            .add('@babel/polyfill')
            .end()
        .entry('index')
            .add(resolve('src'))
            .end()
        .output
            .path(resolve('dist'))
            .publicPath(AssestConf.assetsPublicPath)

    config.devtool(AssestConf.sourceMap)

    // 配置module解析规则
    config.module
        .rule('compiler')
            .test(/\.(j|t)s[x]?$/)
            .include
                .add(resolve('src'))
                .end()
            .exclude
                .add(/node_modules/)
                .end()
            .use('cache-javascript')
                 .loader('cache-loader')
                 .options(loaderConf._cacheLoader)
                 .end()
            .use('thread-javascript')
                .loader('thread-loader')
                .options(loaderConf._threadLoader(conf.__DEV__))
                .end()
            .use('babel')
                .loader('babel-loader')
                .options({
                    babelrc: false,
                    presets: [ '@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                    plugins: [
                        // antd
                         ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
                         ['@babel/plugin-proposal-decorators', { legacy: true }],
                         ['@babel/plugin-proposal-class-properties', { loose: true }],
                         '@babel/plugin-syntax-dynamic-import',
                         'react-hot-loader/babel'
                    ]
                })

    //imageAssest 正式 使用 image-webpack-loader 处理 图片
    config.module
        .rule('imageAssest')
            .test(/\.(jpe?g|png|gif)($|\?)/i)
            .include
                .add(resolve('src'))
                .end()
            .use('thread-imageAssest')
                .loader('thread-loader')
                .options(loaderConf._threadLoader(conf.__DEV__))
                .end()
            .use('url-loader')
                .loader('url-loader')
                .options({
                    name:'imageAssest/[name]_[hash:5].[ext]'
                })
                .end()

    // sass 解析规则
    config.module
        .rule('scss')
            .test(/\.s?[ac]ss$/)
            .include
                .add(resolve('src'))
                .end()
            .use('cache-sass')
                .loader('cache-loader')
                .options(loaderConf._cacheLoader)
                .end()
            .use('thread-scss')
                .loader('thread-loader')
                .options(loaderConf._threadLoader(conf.__DEV__, 2))
                .end()
            .use('ts-css-loader')
                .loader('typings-for-css-modules-loader')
                .options({
                    modules: true,
                    namedExport: true,
                    camelCase: true,
                    sass: true,
                    localIdentName: "[local]_[hash:base64:5]"
                })
                .end()
            .use('postcss-loader')
                .loader('postcss-loader')
                .end()
            .use('sass-loader')
                .loader('sass-loader')
                .options({
                    includePaths: [ bourbon.includePaths, resolve('src/styles') ]
                })
                .end()

    // 对antd添加支持 less-loader
    config.module
        .rule('less')
            .test(/\.less$/)
            .include
                .add(resolve('node_modules'))
                .end()
            .use('css-loader')
                .loader('css-loader')
                .end()
            .use('postcss-loader')
                .loader('postcss-loader')
                .end()
            .use('less-loader')
                .loader('less-loader')
                .options({
                    // 禁止内链js代码 禁用样式表里写js代码
                    javascriptEnabled: true,
                })
                .end()

    // svg
    config.module
        .rule('svg')
            .test(/\.svg$/)
            .include
                .add(resolve('src'))
                .end()
            .use('cache-svg')
                .loader('cache-loader')
                .options(loaderConf._cacheLoader)
                .end()
            .use('thread-svg')
                .loader('thread-loader')
                .options(loaderConf._threadLoader(conf.__DEV__))
                .end()
            .use('svg-loader')
                .loader('@svgr/webpack')
                .end()

    //  iconFonts
    config.module
        .rule('iconFonts')
            .test(/\.(woff[2]?|ttf|eot|)($|\?)/i)
            .include
                .add(resolve('src'))
                .end()
            .use('cache-iconFonts')
                .loader('cache-loader')
                .options(loaderConf._cacheLoader)
                .end()
            .use('font-loader')
                .loader('url-loader')
                .options({
                    limit: 10000,
                    name:'iconFonts/[name]_[hash:5].[ext]'
                })
                .end()


    config.resolve
        .extensions
            .merge(constants.FILE_EXTENSIONS)

    // config.resolve
    //     .modules
    //         .merge([resolve('src'), resolve('node_modules') ])

    config.resolve
         .plugin('ts-path')
             .use(TsconfigPathsPlugin, [{
                 configFile: resolve('tsconfig.webpack.json'),
                 extensions: constants.FILE_EXTENSIONS
             }])

    // 添加统一的plugins设置
    config
        .plugin('define-plugin')
            .use(webpack.DefinePlugin, [{
                'CONF': JSON.stringify(conf)
            }])
            .end()
        .plugin('progress-bar')
             .use(progressBarPlugins, [{
                format: chalk.blue.bold('build  ') + chalk.cyan('[:bar]') + chalk.green.bold(':percent') + ' (' + chalk.magenta(":elapsed") + ' seconds) ',
                clear: false
             }])
             .end()


    return config
}

module.exports = _webpack_core
