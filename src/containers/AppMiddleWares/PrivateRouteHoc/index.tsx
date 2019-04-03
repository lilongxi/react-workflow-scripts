/**
 * 路由权限控制 使用高阶函数 完成
 */
import * as React from 'react'
import hoistReactStatics from 'hoist-non-react-statics'
import { ReactExt, getCookie, connect, getHocComponentname } from '@utils/index'
import { COOKIE_KEYS, LOCALSTORAGE_KEYS } from '@constants/keys'
import { ActionCreators } from '@creators/authActionCreators'
import { replace } from 'connected-react-router'
import { RouteProps } from 'react-router-dom'

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
        authStore: authStore.data
    }
}

const mapStateToDispatch = {
    loginResponse: ActionCreators.loginResponse,
    pushRouter: (path : string) => replace(path)
}

/**
 *
 * @param WrapperComponent 渲染组件
 * @param options 预留选项
 */

const PrivateRouteHoc = (WrapperComponent: React.ComponentType<any>, options?: PlainObject) => {
    class PrivateRoute extends ReactExt<RouteProps & IProps, {}> {

        static readonly displayName = getHocComponentname(WrapperComponent, 'PrivateRouteHoc')

        static readonly WrappedComponent = WrapperComponent

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

        render(): JSX.Element {
            return <WrapperComponent {...this.props} />
        }
    }
    return  hoistReactStatics<typeof PrivateRoute, typeof WrapperComponent>(connect(mapStateToProps, mapStateToDispatch)(PrivateRoute), WrapperComponent)
}

export default PrivateRouteHoc
