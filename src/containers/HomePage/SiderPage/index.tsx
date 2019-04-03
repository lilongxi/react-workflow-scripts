import * as React from 'react'
import classnames from 'classnames'
import { Layout, Icon, Switch } from 'antd'
import { connect } from '@utils/index'
import { AtionsCreators as creators } from '@creators/globalActionCreators'
import SiderMenu from './Menu'

import * as styles from './index.scss'

interface IProps {
    sideBarCollapsed?: boolean
    sideBarTheme?: IGlobalStore.sideBarTheme
    changeSiderTheme?: (data: string) => void
    routerStore?: RouterState
}

const mapStateToProps = (state: IStore<any>): IProps => {
    const { router: routerStore, globalStore } = state
    const {sideBarCollapsed, sideBarTheme} = globalStore
    return {
        routerStore,
        sideBarCollapsed,
        sideBarTheme
    }
}

@connect(mapStateToProps, {
    changeSiderTheme: creators.selectGlobalTheme
})
class Sider extends React.PureComponent<IProps, {}> {

    public handleThemeChange = (e: boolean): void => {
        this.props.changeSiderTheme(e ? 'dark' : 'light')
    }

    public render(): JSX.Element {
        const { sideBarCollapsed, sideBarTheme } = this.props
        return (
            <Layout.Sider
                className={styles.sider}
                theme={sideBarTheme}
                trigger={null}
                collapsed={!sideBarCollapsed}
                collapsible
            >
                <div className={classnames(styles.logoBox, sideBarTheme === 'dark' && styles.dark)}>
                    <Icon type="ant-design" />
                </div>
                <SiderMenu />
                {
                    sideBarCollapsed ?
                    <div className={classnames(styles.changeTheme, sideBarTheme === 'dark' && styles.dark)}>
                        Switch Theme
                        <Switch
                            checkedChildren="dark"
                            unCheckedChildren="light"
                            checked={sideBarTheme === 'dark'}
                            onChange={this.handleThemeChange}
                        />
                    </div> : null
                }
            </Layout.Sider>
        )
    }
}

export default Sider
