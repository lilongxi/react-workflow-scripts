export as namespace IReduxPageStore

// 新闻列表测试数据
export interface newsStore {
    subreddit? : string,
    receivedAt?: number,
    items?: PlainObject,
    error? : string
}

export interface newsRequest {
    code: number,
    msg: string,
    data?: any
}
