/**
 * 高阶组件 注入saga
 *
 */
import * as React from 'react'
import hoisNonReactStatics from 'hoist-non-react-statics'
import { SagaIterator } from 'redux-saga'
import { ReactReduxContext } from 'react-redux'
import { sagaInjectors, getHocComponentname } from '@utils/index'

// export type AnyComponent < P = any > = |(new(props : P) => React.Component) | ((props : P & {
//     children?: React.ReactNode,
// }) => React.ReactElement < any > | null)

interface IInjectSagaParams {
    key : string
    saga : () => SagaIterator
    mode?: string
}

export default ({ key, saga, mode }: IInjectSagaParams) => (
    WrappedComponent: typeof React.Component
) => {
    class InjectSaga extends WrappedComponent<PlainObject> {

        static readonly WrappedComponent = WrappedComponent

        static readonly contextType = ReactReduxContext

        static readonly displayName = getHocComponentname(WrappedComponent, 'withSaga')

        get injectors() {
            return sagaInjectors(this.context.store)
        }

        componentDidMount() {
            const { injectSaga } = this.injectors
            injectSaga(key, { saga , mode }, this.props)
            if (super.componentDidMount) {
                super.componentDidMount()
            }
        }

        componentWillUnmount() {
            const { ejectSaga } = this.injectors
            ejectSaga(key)
            if (super.componentWillUnmount) {
                super.componentWillUnmount()
            }
        }

        render(): React.ReactNode {
            return super.render()
        }
    }

    return hoisNonReactStatics< typeof InjectSaga , typeof WrappedComponent>(InjectSaga, WrappedComponent)
}
