const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const webpack = require('webpack')
const config = require('./webpack.core')
const constants = require('../utils/constants')
const { resolve } = require('../utils')

function _webpack_dev(conf){

    const _dev_config = config(conf)

    _dev_config
        .entry('index')
            .add('react-hot-loader/patch')
            .end()
        .output
            .filename('[name].bundle.js')
            .chunkFilename('[name].bundle.js')

    _dev_config.mode("development")


    // 与生产环境做出区分
   _dev_config.module
        .rule('scss')
            .use('style-loader')
                .loader('style-loader')
                .before('cache-sass')
                .end()

    _dev_config
        .plugin('html-template')
            .use(HtmlWebpackPlugin, [{
                filename: 'index.html',
                template: 'build/tpl/index.html',
                inject: true
            }])
            .end()
         .plugin('case-sensitive')
            .use(CaseSensitivePathsPlugin)
            .end()
         .plugin('HotModuleReplacementPlugin: 热更新')
            .use(webpack.HotModuleReplacementPlugin)
            .end()
         .plugin('NamedModulesPlugin: 热加载直接返回文件名，而不是数子')
            .use(webpack.NamedModulesPlugin)
            .end()
         .plugin('NoEmitOnErrorsPlugin: 不显示错误插件')
            .use(webpack.NoEmitOnErrorsPlugin)
            .end()

    // waring: React-Hot-Loader: react-🔥-dom patch is not detected. React 16.6+ features may not work.
    _dev_config.resolve
        .alias
            .set('react-dom', '@hot-loader/react-dom')

    _dev_config.devServer
        .host(constants.APP_CONF.host)
        .port(constants.APP_CONF.port)
        .contentBase(resolve('dist'))
        .hot(true)
        .open(true)
        .historyApiFallback(true) //BrowserRouter
        // .headers({
        //     "Access-Control-Allow-Origin": "*",
        // })
        // .proxy({
        //     '/api': {
        //         target: 'http://v.juhe.cn',
        //         secure: false,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // })
        .overlay({
            errors: true
        })

    return _dev_config.toConfig()
}

module.exports = _webpack_dev
