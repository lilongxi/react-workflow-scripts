import * as React from 'react'
import { connect } from '@utils/connect'
import { AtionsCreators } from './store/actionCreators'
import { AtionsCreators as Creators } from '@creators/globalActionCreators'
import Pickers from '@components/Pickers'
import Posts from '@components/Posts'
import mock from '@mock/data.json'
import { ReactExt } from '@utils/index'
import injectReducer from '@containers/AppMiddleWares/ReducerInjector'
import SagaInjector from '@containers/AppMiddleWares/SagaInjector'
import { ReduxPageStore } from './store/reducer'
import { watchNewsAsync } from './store/saga'

interface IState {
    subreddit? : string
}

interface IProps extends PlainObject {
    selectSubreddit?: (value: string) => void,
    invalidateSubreddit? : (value: string) => void,
    fetchPostsIfNeeded? : (value: string) => void
}

interface IMapStore {
    subreddit: string,
    isFetching: boolean,
    lastUpdated: number,
    posts: PlainObject[]
}

const mapStateToProps = (state: IStore<any>): IMapStore  => {
    const { subreddit }: IState = state.globalStore
    const newsStore: IReduxPageStore.newsStore = state.newsStore ? state.newsStore : {}
    const { isFetching, lastUpdated, items: posts } = newsStore[subreddit] || { isFetching: true, items: [], lastUpdated: Date.now() }
    return {
        subreddit,
        isFetching,
        lastUpdated,
        posts
    }
}

@connect(mapStateToProps, {
    selectSubreddit: Creators.selectSubreddit,
    invalidateSubreddit: AtionsCreators.invalidateSubreddit,
    fetchPostsIfNeeded: AtionsCreators.fetchPostsIfNeeded
})
@injectReducer({ key: 'newsStore', reducer: ReduxPageStore, keepStateAlive: true })
@SagaInjector({ key: 'watchNewsAsync', saga:  watchNewsAsync })
export default class ReduxPage extends ReactExt <IProps, IState> {

    readonly state

    constructor(props: IProps) {
        super(props)
        this.state = {}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState): IState | null {
        if (nextProps.subreddit !== prevState.subreddit) {
            return {
                subreddit: nextProps.subreddit
            }
        }
        return null
    }

    componentDidMount(): void {
        const { subreddit } = this.props
        this.props.fetchPostsIfNeeded(subreddit)
    }

    componentDidUpdate(prevProps: IProps): void {
        if (prevProps.subreddit !== this.props.subreddit) {
            this.props.fetchPostsIfNeeded(this.props.subreddit)
        }
    }

    handleChange(value: string): void {
        this.props.selectSubreddit(value)
    }

    handleSubmit(): void {
        this.props.fetchPostsIfNeeded(this.props.subreddit)
    }

    handleRefreshClick(event: React.MouseEvent<HTMLAnchorElement>): void {
        event.preventDefault()
        const { subreddit, invalidateSubreddit, fetchPostsIfNeeded } = this.props
        invalidateSubreddit(subreddit)
        fetchPostsIfNeeded(subreddit)
    }

    render(): JSX.Element {
        const { subreddit, lastUpdated, isFetching, posts } = this.props
        const pickerProps = {
            value: {
                city: subreddit,
                wendu: posts.wendu,
                ganmao: posts.ganmao
            },
            onChange: this.handleChange,
            options: mock.options
        }
        return(
            <div>
                <Pickers {...pickerProps} />
                <p>
                    {
                        lastUpdated && <span> Last updated at {new Date(lastUpdated).toLocaleTimeString()}  </span>
                    }
                    {
                        !isFetching && <a href="#" onClick={this.handleRefreshClick}> Refresh </a>
                    }
                </p>
                <p>
                    {
                        isFetching && posts.forecast && posts.forecast.length === 0 && <h2>Loading...</h2>
                    }
                    {
                        !isFetching && posts.forecast && posts.forecast.length === 0 && <h2>Empty.</h2>
                    }
                </p>
                {posts.forecast && posts.forecast.length > 0 &&
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <Posts posts={posts.forecast} />
                </div>
                }
            </div>
        )
    }
}
