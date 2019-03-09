import * as React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { History } from 'history'
import { hot } from 'react-hot-loader/root'
import PageLoading from '@components/PageLoading'
import Loadable from 'react-loadable'
import { ConnectedRouter } from 'connected-react-router'
import loadComponent from '@utils/loadComponent'

const ThemePage = loadComponent(() => import(/* webpackChunkName: "ThemePage" */ '@containers/ReduxTheme'))

const ReduxApp = loadComponent(() => import(/* webpackChunkName: "ReduxApp" */ '@containers/ReduxPage'))

const RouterPage = loadComponent(() => import(/* webpackChunkName: "RouterPage" */ '@containers/RouterPage'))

interface IProps {
    history: History
}

@hot
class App extends React.Component <IProps, {} > {
    public render(): JSX.Element {
        return(
            <ConnectedRouter history={this.props.history}>
                <>
                    <div>
                        <Link to="/">测试tab1</Link>
                        {' '}
                        <Link to="/redux">测试tab2</Link>
                        {' '}
                        <Link to="/router">测试tab3</Link>
                    </div>
                    <Switch>
                        <Route exact={true} path="/" component={ThemePage} />
                        <Route path="/redux"  component={ReduxApp} />
                        <Route path="/router"  component={RouterPage} />
                    </Switch>
                </>
            </ConnectedRouter>
        )
    }
}

export default App
