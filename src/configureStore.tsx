import { createHashHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import rootReducer, {rootSaga } from '@stores/index'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import localStorageMiddleware from '@middlewares/callAPIMiddleware'

const history = createHashHistory()
const sagaMiddleware = createSagaMiddleware()

function configureStore(preloadedState?: any) {

    const composeEnhancer : typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const middlewares = [
        localStorageMiddleware,
        sagaMiddleware,
        routerMiddleware(history)
    ]

    if (CONF.__CONF__ === 'dev') {
        middlewares.unshift(logger)
    }

    const enhancers = [applyMiddleware(...middlewares)]

    const store: IStore<any> = createStore(
        rootReducer(history),
        preloadedState,
        composeEnhancer(...enhancers)
    )

    // Extensions
    store.injectedReducers = {}
    store.injectedSagas = {}
    store.runSaga = sagaMiddleware.run

    return store
}

export default configureStore

export {rootSaga, history, sagaMiddleware}
