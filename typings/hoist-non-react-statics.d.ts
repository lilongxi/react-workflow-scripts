import * as React from 'react'

interface REACT_STATICS {
    childContextTypes: true
    contextTypes: true
    defaultProps: true
    displayName: true
    getDefaultProps: true
    getDerivedStateFromProps: true
    mixins: true
    propTypes: true
    type: true
}

interface KNOWN_STATICS {
    name: true
    length: true
    prototype: true
    caller: true
    callee: true
    arguments: true
    arity: true
}

/**
 * S -> WrapperComponent 传入的组件 并且过滤掉原有的静态方法
 */
type ExcludeProps<S, C> = {
    [key in Exclude< keyof S, keyof REACT_STATICS | keyof KNOWN_STATICS | keyof C >] : S[key]
}

declare function hoistNonReactStatics<
    T extends React.ComponentType<any>,
    S extends React.ComponentType<any>,
    C extends BooleanObject = {}
>(
    TargetComponent: T,
    SourceComponent: S,
    customStatic?: C
): T & ExcludeProps<S, C>

export = hoistNonReactStatics
