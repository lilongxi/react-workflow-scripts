const { resolve } = require('../utils')


const _threadLoader = (options, workerParallelJobs) => {
    if(options && workerParallelJobs){
        return Object.assign( { workerParallelJobs } , { poolTimeout: Infinity })
    }
    return options ? { poolTimeout: Infinity }: {}
}


module.exports = {
    _cacheLoader: {
        cacheDirectory: resolve('.cache-loader')
    },
    _threadLoader
}
