import * as React from 'react'

declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

const withDefaultProps = <
    P extends object,
    S extends Partial<P> = Partial<P>
> (
    defaultProps: S,
    Cmp: React.ComponentType<P>
) => {
    type RequiredProps = Omit<P, keyof S>
    type Props = Partial<S> & Required<RequiredProps>
    Cmp.defaultProps = defaultProps
    return (Cmp as React.ComponentType<any>) as React.ComponentType<Props>
}

export default withDefaultProps
