import { createHashHistory } from 'history'
import { applyMiddleware, compose, createStore, Store } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer, {rootSaga } from '@stores/index'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

const history = createHashHistory()
const sagaMiddleware = createSagaMiddleware()

function configureStore(preloadedState?: any) {
    const composeEnhancer : typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeEnhancer(
            applyMiddleware(
                logger,
                sagaMiddleware,
                routerMiddleware(history)
            )
        )
    ) as Store<IStore.IStoreState>
    return store
}

export default configureStore

export {rootSaga, history, sagaMiddleware}
