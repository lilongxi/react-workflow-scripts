import { Actions } from './actionCreators'
import { ActionTypes } from './constants'

interface IStores extends IReduxPageStore.newsStore {
    didInvalidate: boolean,
    isFetching: boolean,
    lastUpdated?: number
}

const initalState = {
    isFetching: false,
    didInvalidate: false,
    items: {}
}

function ReduxPagePosts(state: IStores = initalState, actions: Actions): IStores {
    switch (actions.type) {
        case ActionTypes.INVALIDATE_SUBREDDIT:
            return {
                ...state,
                didInvalidate: true
            }
        case ActionTypes.REQUSET_NEWS_LIST:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case ActionTypes.REQUSET_NEWS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: actions.payload.items,
                lastUpdated: actions.payload.receivedAt
            }
        case ActionTypes.REQUSET_NEWS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: actions.payload.error
            }
        default:
            return state
    }
}

function ReduxPageStore(state: PlainObject = {}, actions: Actions): PlainObject {
    switch (actions.type) {
        case ActionTypes.INVALIDATE_SUBREDDIT:
        case ActionTypes.REQUSET_NEWS_LIST:
        case ActionTypes.REQUSET_NEWS_SUCCESS:
        case ActionTypes.REQUSET_NEWS_ERROR:
            return Object.assign({}, state, {
                [ actions.payload.subreddit ]: ReduxPagePosts(state[actions.payload.subreddit], actions)
            })
        default:
            return state
    }
}

export {
    ReduxPageStore
}
