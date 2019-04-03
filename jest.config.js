module.exports = {
    //遇上 test feature, 则Stop running test, 默认值是false
    "bail": true,
    //测试缓存数据的存储位置
    "cacheDirectory": "./node_modules/.cache",
    // 注入测试环境
    "testEnvironment": "jsdom",
    //忽略该路径的文件测试
    "testPathIgnorePatterns": [
        "<rootDir>/node_modules/",
        "<rootDir>/build/",
        "<rootDir>/.cache-loader/",
        "<rootDir>/.vscode/",
        "<rootDir>/dist/",
        "<rootDir>/dll/",
        "<rootDir>/typings/",
        "<rootDir>/coverage_archive/",
        "<rootDir>/scripts/",
        "<rootDir>/tool/"
      ],
    //测试模块中用到的文件的后缀名配置
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js"
    ],
    // 用 `ts-jest` 处理 tsx、ts
    "transform": {
        "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest"
    },
    //给每个测试文件添加额外的配置
    "setupFiles": [
        "raf/polyfill"
    ],
    // 识别测试文件
    "testMatch": [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
    ],
    // 启动文件
    "setupFilesAfterEnv": [
        "<rootDir>src/enzyme.setup.ts"
    ],
    // 序列化快照包
    "snapshotSerializers": [
        "enzyme-to-json"
    ],
    // 与测试无关的资源文件通过identity-obj-proxy，mock 掉，这样在import 的时候就不会真的引入这些文件
    "moduleNameMapper": {
        "\\.(css|less|scss|svg|jpg|jpeg|png|gif)$": "identity-obj-proxy",
        "^@components/(.*)$": "<rootDir>/src/components//$1",
    },
    "collectCoverage": true,
    // 指定测试覆盖率形式，见https://istanbul.js.org/docs/advanced/alternative-reporters/
    "coverageReporters": [ "json", "lcov", "text" ],
    // 存放目录
    "coverageDirectory": "coverage",
    // 指定搜集目录
    "collectCoverageFrom": [ "src/components/*/*.{js,jsx,ts,tsx}" ],
    //测试覆盖率, 阈值不满足，就返回测试失败
    // "coverageThreshold": {
    //     "global": {
    //         "branches": 80,
    //         "functions": 60,
    //         "lines": 80,
    //         "statements": 80
    //     }
    // },
    // 以下文件不统计进入测试覆盖率范围
    "coveragePathIgnorePatterns": [
        "<rootDir>/src/assest",
        "<rootDir>/src/constants",
        "<rootDir>/src/creators",
        "<rootDir>/src/styles",
        "<rootDir>/src/mock",
        "<rootDir>/src/middlewares",
    ]
}
