import { ActionTypes as pageActionTypes } from './constants'
import * as typesCreator from '@utils/actionTypes'

interface RequestNewsList extends typesCreator.PayloadAction<
    pageActionTypes.REQUSET_NEWS_LIST,
    IReduxPageStore.subreddit
 > {}

interface InvalidateSubreddit extends typesCreator.PayloadAction<
    pageActionTypes.INVALIDATE_SUBREDDIT,
    IReduxPageStore.subreddit
> {}

interface FetchPostsIfNeeded extends typesCreator.PayloadAction <
    pageActionTypes.POSTS_IF_NEEDED,
    IReduxPageStore.subreddit
> {}

interface RequestNewsSuccess extends typesCreator.PayloadAction<
    pageActionTypes.REQUSET_NEWS_SUCCESS,
    IReduxPageStore.creatorStore
> {}

interface RequestNewsError extends typesCreator.PayloadAction<
     pageActionTypes.REQUSET_NEWS_ERROR,
     IReduxPageStore.creatorStore
> {}

export const AtionsCreators = {
    requestNewsList: typesCreator.createActionCreators<RequestNewsList>(pageActionTypes.REQUSET_NEWS_LIST),
    requestNewsSuccess: typesCreator.createActionCreators<RequestNewsSuccess>(pageActionTypes.REQUSET_NEWS_SUCCESS),
    requestNewsError: typesCreator.createActionCreators<RequestNewsError>(pageActionTypes.REQUSET_NEWS_ERROR),
    invalidateSubreddit: typesCreator.createActionCreators<InvalidateSubreddit>(pageActionTypes.INVALIDATE_SUBREDDIT),
    fetchPostsIfNeeded: typesCreator.createActionCreators<FetchPostsIfNeeded>(pageActionTypes.POSTS_IF_NEEDED)
}

export type Actions = RequestNewsList | RequestNewsSuccess | RequestNewsError | InvalidateSubreddit
