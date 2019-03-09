import { SagaIterator } from 'redux-saga'
import { ActionTypes } from './constants'
import { Actions } from './actionCreators'
import { takeEvery, call, put, select } from 'redux-saga/effects'
import { getJSON } from '@utils/index'
import { AtionsCreators } from './actionCreators'

const Api = {
    fetchNewsList(subreddit: string): Promise<any> {
        return getJSON({
            url: `https://www.apiopen.top/weatherApi?city=${subreddit}`
        })
    }
}

function shouldFetchPosts(storesState: IStore.IStoreState, subreddit : string) : boolean {
    const posts: PlainObject = storesState.newsStore[subreddit]
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return true
    } else {
        return posts.didInvalidate
    }
}

// const CALL_API = 'CALL_API'
// function loadPosts(subreddit) {
//   return {
//      type: CALL_API,
//      types: [AtionsCreators.requestNewsList, AtionsCreators.requestNewsSuccess, AtionsCreators.requestNewsError],
//      callApi: () => Api.fetchNewsList(subreddit),
//      payload: {subreddit}
//   }
// }

function * newsAsyncFork( data: Actions ): SagaIterator {
    try {
         const { subreddit } = data.payload
         const oldStores = yield select()
         if (!shouldFetchPosts(oldStores, subreddit)) {
              return Promise.resolve()
         } else {
            yield put(AtionsCreators.requestNewsList({
                subreddit
            }))
         }
         const newStores: IReduxPageStore.newsRequest = yield call(Api.fetchNewsList, data.payload.subreddit)
         if (newStores.code === 200) {
             yield put(AtionsCreators.requestNewsSuccess({
                items: newStores.data,
                receivedAt: Date.now(),
                subreddit
            }))
        } else {
            yield put(AtionsCreators.requestNewsError({
                subreddit: data.payload.subreddit,
                error: '请求失败'
            }))
        }
    } catch (error) {
        yield put(AtionsCreators.requestNewsError({
            subreddit: data.payload.subreddit,
            error: '请求失败'
        }))
    }
}

export function * watchNewsAsync(): SagaIterator {
    yield takeEvery(ActionTypes.POSTS_IF_NEEDED, newsAsyncFork)
}
