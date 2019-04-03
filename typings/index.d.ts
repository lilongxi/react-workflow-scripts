import Redux from 'redux'
import { Task, SagaIterator } from 'redux-saga'

interface InjectedReducers<T> {
    [key: string]: Redux.Reducer<T>
}

interface InjectedSagas {
    [key: string]: {
        mode?: string,
        saga:() => SagaIterator,
        task: Task
    }
}

// 扩展Store接口
declare global {
    interface IStore<T> extends Redux.Store<T>, PlainObject {
        runSaga?: any
        asyncReducers?: Redux.ReducersMapObject
        injectedReducers?: InjectedReducers<T>
        injectedSagas?: InjectedSagas
        globalStore
        authStore
        router : RouterState
    }
}
