const path = require('path')

exports.resolve = function(dir){
    return path.join(__dirname, '../../' , dir)
}

exports.assetsPath = function (_path) {
    return path.posix.join(config.assetsSubDirectory, _path)
}
