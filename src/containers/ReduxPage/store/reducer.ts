import { Actions } from './actionCreators'
import { ActionTypes } from './constants'

interface IStores extends IReduxPageStore.newsStore {}

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
                lastUpdated: actions.payload.lastUpdated
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
        case ActionTypes.REQUSET_NEWS_SUCCESS:
        case ActionTypes.REQUSET_NEWS_ERROR:
            return Object.assign({}, state, {
                [ actions.payload.subreddit ]: ReduxPagePosts(state[actions.payload.subreddit], actions)
            })
        case ActionTypes.REQUSET_NEWS_LIST:
        case ActionTypes.INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                [ actions.payload ]: ReduxPagePosts(state[actions.payload], actions)
            })
        default:
            return state
    }
}

export {
    ReduxPageStore
}
