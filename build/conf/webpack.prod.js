// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')
const config = require('./webpack.core')
const constants = require('../utils/constants')
const AssestConf = require('../utils/conf')
const { resolve } = require('../utils')

function _webpack_prod(conf){

    const _prod_config = config(conf)

    _prod_config
        .output
            .filename('js/[name].[chunkhash:8].js')
            .chunkFilename('js/[name].[chunkhash:8].js')

    _prod_config.mode("production")

    _prod_config.module
        .rule('imageAssest')
            .use('image-webpack-loader')
                .loader('image-webpack-loader')
                .options({
                     mozjpeg: {
                        progressive: true, // 创建基准jpeg文件
                        quality: 65
                    },
                    optipng: {
                        optimizationLevel: 4 // 优化级别，0-7，值越大，压缩越多
                    },
                    pngquant: {
                        quality: '75-90', // 压缩质量，0-100，值越高，质量越高
                        floyd: 0.5, // 图片抖动值，0-1，越高抖动越厉害
                        speed: 2 // 执行速度，0-10，速度过高质量受损，不建议过高
                    },
                    gifsicle: {
                        interlaced: false // 替换使用渐进式渲染
                    },
                    webp: {
                        quality: 75
                    }
                })
                .before('url-loader')
                .end()

    _prod_config.module
        .rule('scss')
            .use('mini-css-extract-loader: 在开发环境中使用MiniCssExtractPlugin')
                .loader(MiniCssExtractPlugin.loader)
                .before('cache-sass')
                .end()

     _prod_config.module
        .rule('less')
            .use('mini-css-extract-loader: 在开发环境中使用MiniCssExtractPlugin')
                .loader(MiniCssExtractPlugin.loader)
                .before('css-loader')
                .end()

    _prod_config
        .plugin('watch-ignore')
            .use(webpack.WatchIgnorePlugin, [[
                /css\.d\.ts$/
            ]])
            .end()
        .plugin('DllReferencePlugin')
             .use(webpack.DllReferencePlugin, [{
                 context: AssestConf.context,
                 manifest: resolve('dll/_react.manifest.json')
             }])
             .end()
        .plugin('copy-webpack-plugin') // 要在html-webpack-plugin前调用
            .use(CopyWebpackPlugin, [[
                 { from: resolve('dll/*.js'), to: resolve('dist')}
            ]])
            .end()
        .plugin('html-template')
            .use(HtmlWebpackPlugin, [{
                filename: 'index.html',
                template: 'build/tpl/index.html',
                inject: true,
                alwaysWriteToDisk: true,
                hash: false,
                cache: true,
                inject: true,
                title: constants.APP_NAME,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                }
            }])
            .after('copy-webpack-plugin') // 在copy-webpack-plugin之后编译html模板
            .end()
        .plugin('html-webpack-include-assets-plugin') // 要在html-webpack-plugin后调用
            .use(HtmlWebpackIncludeAssetsPlugin, [{
                assets: [{
                    path: 'dll', // html js文件引用路径
                    glob: '*.js', // 通配符匹配所有dll.js文件
                    globPath: resolve('dll') // 从dll文件夹内匹配
                }],
                append: false // dll文件前置
            }])
            .after('html-template')
            .end()
        // .plugin('script-ext-html: 要在html-webpack-plugin后调用')
        //     .use(ScriptExtHtmlWebpackPlugin, [{
        //         inline: /manifest\..*\.js$/
        //     }])
        //     .after('html-webpack-include-assets-plugin')
        //     .end()
        .plugin('extract-css')
            .use( MiniCssExtractPlugin, [{
                filename: 'css/app.[name].css',
                chunkFilename: 'css/app.[contenthash:8].css'
            }])
            .end()
        .plugin('hashed-module-ids')
            .use(webpack.HashedModuleIdsPlugin)
            .end()
        .plugin('named-chunks')
            .use(webpack.NamedChunksPlugin,[
                chunk => chunk.name ? chunk.name : Array.from(chunk.modulesIterable, m => m.id).join("_")
            ])
            .end()
        .plugin('banners')
            .use(webpack.BannerPlugin, ['Copyright by lilongxi@github.com.'])
            .end()
        .plugin('limit-chunk-count')
            .use(webpack.optimize.LimitChunkCountPlugin, [{
                    maxChunks: 5, // 必须大于或等于5
                    minChunkSize: 1000
                }])
            .end()
        .plugin('workboxPlugin: 构建PWA')
            .use(WorkboxPlugin.GenerateSW, [{
                    cacheId: constants.APP_NAME,
                    clientsClaim: true,
                    skipWaiting: true,
                    offlineGoogleAnalytics: false,
                    swDest: 'build.sw.js',
                    // workbox-sw.js 部署本地服务器
                    importWorkboxFrom: 'local',
                    // （预加载）忽略某些文件
                    exclude: [
                        /index\.html$/,
                        /manifest\..*\.js$/
                    ],
                    // 动态更新缓存
                    runtimeCaching: [{
                        urlPattern: /index\.html/,
                        handler: 'networkFirst',
                    }, {
                        urlPattern: /\.(js|css|png|jpg|gif|svg|jpeg)/,
                        handler: 'staleWhileRevalidate',
                    }]
            }])
            .end()
        // .plugin('BundleAnalyzerPlugin')
        //     .use(BundleAnalyzerPlugin)
        //     .end()

    _prod_config.optimization
            .runtimeChunk({
                name: 'manifest'
            })

    _prod_config.optimization
            .minimizer('terser-uglifyjs: 压缩配置项 默认 minimize: true, // [new UglifyJsPlugin({...})]')
                .use(TerserPlugin, [{
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                    terserOptions: {
                        compress: {
                            warnings: false,
                            drop_debugger: true,
                            drop_console: true
                        }
                    }
                }])
                .end()
            .minimizer('optimize-css-assets: 压缩css配置项')
                .use(OptimizeCSSAssetsPlugin, [{
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: {
                        reduceIdents: false,
                        autoprefixer: false
                    }
                }])

    _prod_config.optimization
                .splitChunks({
                    chunks: 'initial', // 只对入口文件处理
                    cacheGroups: {
                        vendor: { // 抽离第三方插件
                            test: /node_modules/, // 指定是node_modules下的第三方包
                            chunks: 'initial',
                            name: 'vendor', // 打包后的文件名，任意命名
                            filename: 'js/[name].[chunkhash:8].js',
                            priority: 10// 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                        },
                        utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
                            chunks: 'initial',
                            name: 'utils', // 任意命名
                            minSize: 0 // 只要超出0字节就生成一个新包
                        }
                    }
                })

    // _prod_config.resolve
    //         .alias
    //         .set('@ant-design/icons/lib/dist$', resolve('src/icon.js'))

    return _prod_config.toConfig()

}

module.exports = _webpack_prod
