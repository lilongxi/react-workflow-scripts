import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { History } from 'history'
import { hot } from 'react-hot-loader/root'
import { ConnectedRouter } from 'connected-react-router'
import PrivateRoute from '@containers/AppMiddleWares/PrivateRoute'
import NotFound from '@components/404'
import { loadComponent } from '@utils/index'

const HomePage = loadComponent(() => import (/* webpackChunkName: "HomePage" */'@containers/HomePage'))

const LoginPage = loadComponent(() => import(/* webpackChunkName: "LoginPage" */ '@containers/LoginPage'))

// const AppWrapper: React.SFC = ({ children }: { children: React.ReactNode }): JSX.Element => <div className={styles.appWrapper}>{children}</div>

interface IProps {
    history: History
}

@hot
class App extends React.Component <IProps, {} > {
    public render(): JSX.Element {
        return(
                <ConnectedRouter history={this.props.history}>
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute path="/" component={HomePage} />
                        <Route component={NotFound} />
                    </Switch>
                </ConnectedRouter>
        )
    }
}

export default App
