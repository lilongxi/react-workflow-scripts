/**
 * 所有公共store集合
 */
import { combineReducers } from 'redux'
import { globalStore } from './globalStore'
import { authStore, watchLoginAsync } from './authStore'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { all } from 'redux-saga/effects'
import rootReducers from './stateStore'

export default function rootReducer(historyed: History, injectedReducers: PlainObject = {}) {

    const appReducers = combineReducers({
          authStore: authStore as any,
          globalStore: globalStore as any,
          router: connectRouter(historyed) as any,
          ...injectedReducers
    })

    return rootReducers(appReducers)
}

export function * rootSaga() {
    yield all([
        watchLoginAsync()
    ])
}
