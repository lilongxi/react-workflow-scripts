/**
 * 路由权限控制
 */
import * as React from 'react'
import { Route, RouteProps } from 'react-router-dom'
import { ReactExt, getCookie, connect } from '@utils/index'
import { COOKIE_KEYS, LOCALSTORAGE_KEYS } from '@constants/keys'
import { ActionCreators } from '@creators/authActionCreators'
import { replace } from 'connected-react-router'

interface IProps {
    routerStore?: RouterState,
    authStore?: PlainObject,
    loginResponse?: (data: IAuthStore.UserInfo) => void,
    pushRouter? : (path: string) => void
}

const mapStateToProps = (state: IStore<any>) => {
    const { router, authStore } = state
    return {
        routerStore: router,
        authStore: authStore.userinfo
    }
}

@connect(mapStateToProps, {
    loginResponse: ActionCreators.loginResponse,
    pushRouter: (path: string) => replace(path)
})
class PrivateRoute extends ReactExt <RouteProps & IProps, {} > {

    componentDidMount(): void {
        this.checkLocalUserInfo()
    }

    get getUserInfo() {
        const localUserInfo = localStorage.getItem(LOCALSTORAGE_KEYS.USERINFO)
        return JSON.parse(localUserInfo)
    }

    gotoLogin = () => {
        this.props.pushRouter('/login')
    }

    checkLocalUserInfo = () => {
        const token = getCookie(COOKIE_KEYS.TOKEN)
        if (!token) {
            return this.gotoLogin()
        }
        const { authStore, loginResponse } = this.props
        if (!authStore) {
            try {
                 if (!this.getUserInfo) {
                    return this.gotoLogin()
                 }
                 loginResponse(this.getUserInfo)
            } catch (error) {
                console.warn(error)
                this.gotoLogin()
            }
        }
    }

    _renderComponent(props, component, rest): React.ReactNode {
        const T = { exact: false, strict: false, path: '/'}
        const C = component
        const P = {...T, ...props, ...rest}
        return <C {...P} />
    }

    render(): JSX.Element {
        const { component, ...rest } = this.props
        return <Route {...rest} render={(props) => this._renderComponent(props, component, rest)} />
    }
}

export default PrivateRoute
