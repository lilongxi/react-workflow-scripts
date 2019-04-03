// 动态载入reducer
import { Reducer } from 'redux'
import { history } from '../configureStore'
import rootReducer from '@stores/index'

export function injectReducerFactory<T>(store: IStore<any>) {
    return (key: string, reducer: Reducer<any>): void => {
        if (
            Reflect.has(store.injectedReducers, key) &&
            store.injectedReducers[key] === reducer
        ) {
            return
        }
        store.injectedReducers[key] = reducer
        store.replaceReducer(rootReducer(history, store.injectedReducers))
    }
}

export default function getInjectors <T>(store: IStore<any>) {
    return {
        injectReducer: injectReducerFactory(store)
    }
}
