
// react-hot-loader
declare var moudle: {
    hot: any
}

// webpack env
declare var CONF: {
    PUBLICPATH: string,
    ROOTPATH: string,
    __CONF__: string,
    __DEV__: boolean | null,
    __PROD__: boolean | null
}

// 将能在全局使用 window.store
declare interface Window {
    store: any
}

declare interface PlainObject {
    [propName: string]: any
}

declare interface BooleanObject {
    [propName: string]: boolean
}

declare interface StringObject {
    [propName: string]: string
}

declare interface NumberObject {
    [propName: string]: number
}
