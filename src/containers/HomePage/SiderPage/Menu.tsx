import * as React from 'react'
import { Menu, Icon } from 'antd'
import pathToRegexp from 'path-to-regexp'
import { menu } from '@mock/menu'
import { AtionsCreators } from '@creators/globalActionCreators'
import { IMenuInTree, IMenu } from '../menu'
import { arrayToTree, connect, queryArray } from '@utils/index'
import { push } from 'connected-react-router'

import * as styles from './index.scss'

const { SubMenu } = Menu

interface IProps {
    sideBarTheme?: IGlobalStore.sideBarTheme,
    sideBarCollapsed?: boolean,
    navOpenKeys?: string[],
    userInfo?: IAuthStore.UserInfo,
    routerStore?: RouterState,
    setOpenKeys?: (openKeys: string[]) => void,
    pushRouter?: (path: string) => void
}

const mapStateToProps = (state: IStore<any>): IProps => {
    const {
        router: routerStore,
        globalStore,
        authStore: {
            data: userInfo
        }
    } = state
    const { sideBarTheme, sideBarCollapsed, navOpenKeys } = globalStore
    return {
        routerStore,
        userInfo,
        sideBarTheme,
        sideBarCollapsed,
        navOpenKeys
    }
}

@connect(mapStateToProps, {
    setOpenKeys: AtionsCreators.selectOpenKeys,
    pushRouter: (path: string) => push(path)
})
class SiderMenu extends React.PureComponent<IProps, {}> {
    private levelMap: NumberObject = {}

    get menuTree(): IMenuInTree[] {
        return arrayToTree<IMenuInTree>(menu, 'id', 'pid')
    }

    get currentRoute(): string {
        return this.props.routerStore.location.pathname
    }

    get menuProps() {
        const { sideBarCollapsed, navOpenKeys } = this.props
        return sideBarCollapsed
            ? {
                  onOpenChange: this.onOpenChange,
                  openKeys: navOpenKeys
              }
            : {}
    }

     get getCurrentMenu() {
        let currentMenu
        for (const item of menu) {
            if (item.path && pathToRegexp(item.path).exec(this.currentRoute)) {
                currentMenu = item
                break
            }
        }
        let selectedKeys: string[] = null
        if (currentMenu) {
            selectedKeys = this.getPathArray(menu, currentMenu)
        }
        if (!selectedKeys) {
            selectedKeys = ['1']
        }
        return selectedKeys
    }

    // 渲染菜单信息
    public renderTitle = (item: IMenuInTree): JSX.Element => {
        return (
            <span>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.title}</span>
            </span>
        )
    }
    // 递归生成菜单
    public getMenus = (menuTree: IMenuInTree[]): JSX.Element[] => {
        return menuTree.map(item => {
            if (item.children) {
                if (item.pid) {
                    this.levelMap[item.id] = item.pid
                }
                return (
                    <SubMenu
                        key={String(item.id)}
                        title={this.renderTitle(item)}
                    >
                        {this.getMenus(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={String(item.id)}>
                    {this.renderTitle(item)}
                </Menu.Item>
            )
        })
    }

    public goto = ({ key }: { key: string }) => {
        const selectedMenu = menu.find(item => String(item.id) === key)
        if (selectedMenu && selectedMenu.path && selectedMenu.path !== this.currentRoute) {
           this.props.pushRouter(selectedMenu.path)
        }
    }

    // 菜单持久化
    public onOpenChange = (openKeys: string[]): void => {
        this.props.setOpenKeys(openKeys)
    }

    public  getPathArray = (array: IMenu[], current: IMenu): string[] => {
        const result = [String(current.id)]
        const getPath = (item: IMenu): void => {
            if (item && item.pid) {
                result.unshift(String(item.pid))
                getPath(queryArray(array, String(item.pid), 'id'))
            }
        }
        getPath(current)
        return result
    }

    public render(): JSX.Element {
        const { sideBarTheme } = this.props
        return (
            <Menu
                mode="inline"
                className={styles.menu}
                theme={sideBarTheme}
                defaultSelectedKeys={this.getCurrentMenu}
                onClick={this.goto}
                {...this.menuProps}
            >
                {this.getMenus(this.menuTree)}
            </Menu>
        )
    }
}

export default SiderMenu
