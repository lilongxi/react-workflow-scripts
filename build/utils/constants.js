/**
 *  基础环境变量配置
 */
const { APP_ENV: ENV, HOST, PORT } = process.env
const APP_ENV = ENV || 'prod'
const APP_PATH = './conf'
const APP_CONF = {
    host: HOST || '0.0.0.0',
    port: PORT || '9090'
}
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']
const APP_NAME = 'react-workflow-scripts'

module.exports = {
    APP_ENV,
    APP_PATH,
    APP_CONF,
    APP_NAME,
    FILE_EXTENSIONS
}
