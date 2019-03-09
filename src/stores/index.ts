/**
 * 所有公共store集合
 */
import { combineReducers } from 'redux'
import { globalStore } from './globalStore'
import { ReduxPageStore } from '@containers/ReduxPage/store/reducer'
import { watchNewsAsync } from '@containers/ReduxPage/store/saga'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { all } from 'redux-saga/effects'

export default function createRootReducer(historyed: History) {
    return combineReducers({
          globalStore: globalStore as any,
          newsStore: ReduxPageStore as any,
          router: connectRouter(historyed) as any
    })
}

export function * rootSaga() {
    yield all([
        watchNewsAsync()
    ])
}
