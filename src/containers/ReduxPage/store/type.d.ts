export as namespace IReduxPageStore

// 新闻列表测试数据
export interface newsStore extends creatorStore {
    didInvalidate?: boolean,
    isFetching?: boolean
}

export interface creatorStore {
    items?: PlainObject,
    lastUpdated?: number,
    subreddit?: string,
    error?: PlainObject | string
}

export interface newsRequest {
    code: number,
    msg: string,
    data?: PlainObject | null
}

export type subreddit = string
