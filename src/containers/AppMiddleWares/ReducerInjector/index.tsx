/**
 * 高阶组件， 注入reducer
 */
import * as React from 'react'
import hoisNonReactStatics from 'hoist-non-react-statics'
import { Reducer } from 'redux'
import { ReactReduxContext } from 'react-redux'
import { getInjectors, getHocComponentname } from '@utils/index'
import { ActionCreators } from '@creators/stateActionCreators'

interface IInjectReducerParams {
    key: string
    reducer: Reducer<any>
    keepStateAlive?: boolean
}

export default ({key, reducer, keepStateAlive}: IInjectReducerParams) => (
    WrapperComponent: React.ComponentType<any>
) => {
    class ReducerInjector extends React.PureComponent<PlainObject> {

        static readonly contextType = ReactReduxContext

        static readonly WrapperComponent = WrapperComponent

        static readonly displayName = getHocComponentname(WrapperComponent, 'withReducer')

        get injectorsed() {
            return getInjectors(this.context.store)
        }

        componentDidMount() {
            const { injectReducer } = this.injectorsed
            injectReducer(key, reducer)
        }

        componentWillUnmount() {
            if (!keepStateAlive) {
                const { dispatch, getState } = this.context.store
                const resetState = getState()[key]
                if (resetState && Object.keys(resetState).length) {
                    dispatch(ActionCreators.resetSubState(key))
                }
            }
        }

        render(): JSX.Element {
            return <WrapperComponent {...this.props} />
        }

    }
    return hoisNonReactStatics(ReducerInjector, WrapperComponent)
}
