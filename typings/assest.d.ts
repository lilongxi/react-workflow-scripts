// svg图片本身并不具备模块化的功能，也不提供模块导出

declare interface AssestComponent extends React.StatelessComponent<React.SVGAttributes<SVGAElement>>{}

const content: any

declare module '*.svg' {
    const content: AssestComponent
    export default content
}

declare module '*.png' {
    export default content
}

declare module '*.jpg' {
    export default content
}

declare module '*.jpeg' {
    export default content
}

declare module '*.gif' {
    export default content
}

declare module '*.json' {
    export default content
}
