import * as React from 'react'
import { connect, ReactExt } from '@utils/index'
import { AtionsCreators } from '@creators/globalActionCreators'
import { ActionCreators as creators } from '@creators/authActionCreators'
import { Layout, Icon } from 'antd'
import { clearCookie } from '@utils/index'
import { COOKIE_KEYS, LOCALSTORAGE_KEYS } from '@constants/keys'
import { push } from 'connected-react-router'

import * as styles from './index.scss'

interface IProps {
    userInfo?: PlainObject,
    sideBarCollapsed?: boolean
    toggleSideBarCollapsed?: (collapsed: boolean) => void
    logoutRequest?: () => void,
    routerPush?: (path: string) => void
}

@connect(
    (state: IStore<any>): { sideBarCollapsed: boolean, userInfo: PlainObject } => {
        return {
            sideBarCollapsed: state.globalStore.sideBarCollapsed,
            userInfo: state.authStore.userinfo
        }
    },
    {
        toggleSideBarCollapsed: AtionsCreators.selectSideBarCollapsed,
        logoutRequest: creators.logoutActions,
        routerPush: push
    }
)
export class Header extends ReactExt<IProps, {}> {

    logout = () => {
        const { logoutRequest, routerPush, userInfo } = this.props
        this.$confirm({
            title: `${userInfo.name}您好，是否退出登录`,
            onOk: (): void => {
                logoutRequest()
                clearCookie(COOKIE_KEYS.TOKEN)
                localStorage.removeItem(LOCALSTORAGE_KEYS.USERINFO)
                routerPush('/login')
            },
            onCancel: (): void => {
                this.$message.warning('取消退出登录操！')
            }
        })
    }

    render(): JSX.Element {
        const { sideBarCollapsed, toggleSideBarCollapsed} = this.props
        return (
            <Layout.Header className={styles.header}>
                <Icon
                    className={styles.trigger}
                    type={sideBarCollapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={() => toggleSideBarCollapsed(!sideBarCollapsed)}
                />
                <div className={styles.right}>
                    <Icon
                        className={styles.rightIcon}
                        type="github"
                        theme="outlined"
                    />
                    <Icon className={styles.rightIcon} onClick={this.logout} type="logout" theme="outlined" />
                </div>
            </Layout.Header>
        )
    }
}

export default Header
