import { SagaIterator } from 'redux-saga'
import { ActionTypes } from './constants'
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

function shouldFetchPosts(storesState: PlainObject, subreddit? : string) : boolean {
    if (!storesState) {
        return true
    } else if (storesState.isFetching) {
        return true
    } else {
        return storesState.didInvalidate
    }
}

function * newsAsyncFork( { payload: subreddit  }: { payload: string } ): SagaIterator {
    try {
         const oldStores = yield select(state => state.newsStore ? state.newsStore[subreddit] : null)
         if (!shouldFetchPosts(oldStores)) {
              return Promise.resolve()
         } else {
            yield put(AtionsCreators.requestNewsList(subreddit))
         }
         const newStores: IReduxPageStore.newsRequest = yield call(Api.fetchNewsList, subreddit)
         if (newStores.code === 200) {
             yield put(AtionsCreators.requestNewsSuccess({
                items: newStores.data,
                lastUpdated: Date.now(),
                subreddit
            }))
        } else {
            yield put(AtionsCreators.requestNewsError({
                subreddit,
                error: '请求失败'
            }))
        }
    } catch (error) {
        yield put(AtionsCreators.requestNewsError({ subreddit, error: '请求失败' }))
    }
}

export function * watchNewsAsync() : SagaIterator {
    // @ts-ignore
    yield takeEvery(ActionTypes.POSTS_IF_NEEDED, newsAsyncFork)
}
