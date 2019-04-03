import * as React from 'react'
import { isFunction } from 'lodash-es'

const initialState = {
    show: false
}

const defaultProps: DefaultProps = { ...initialState, props: {} }

type RenderCallback = (args : ToggleableComponentProps) => JSX.Element

// 类型查找lookup types 减少 类型重定义
export type ToggleableComponentProps<P extends object = object> = {
    show: State['show'],
    toggle: Toggleable['toggle']
} & P

type State = Readonly<typeof initialState>
type DefaultProps<P extends object = object> = { props: P } & Pick<State, 'show'>

// 映射类型标识所有属性为可选
export type Props<P extends object = object> = Partial<{
    children: RenderCallback | React.ReactNode
    render: RenderCallback
    component: React.ComponentType<ToggleableComponentProps<P>>
} & DefaultProps<P>
>

class Toggleable<T extends object = object> extends React.Component<Props<T>, State> {

    static readonly defaultProps: Props = defaultProps

    readonly state: State = { show: this.props.show }

    static ofType<T extends object>() {
        return Toggleable as Constructor<Toggleable<T>>
    }

    static getDerivedStateFromProps(nextProps: Props, nextState: any) {
        console.log(nextProps, nextState)
        if (nextProps.show !== nextState.show) {
          return {
              show: Boolean(nextProps.show)
          }
      } else {
          return null
      }
    }

    render(): JSX.Element {
        const { render,
                children,
                component: InjectedComponent,
                props
            } = this.props
        const renderProps = {
            show: this.state.show,
            toggle: this.toggle
        }
        if (InjectedComponent) {
            return (
                <InjectedComponent {...props} {...renderProps}>
                    {children}
                </InjectedComponent>
            )
        }
        if (render) {
            return render(renderProps)
        }
        // @ts-ignore
        return isFunction(children) ? children(renderProps) : null
    }

    private toggle = (event: React.MouseEvent<HTMLElement>) => this.setState(updateShowState)

}

const updateShowState = (prevState: State) => ({ show: !prevState.show })

export default Toggleable
