import * as React from 'react'
import * as styles from '../../index.scss'
import { hot } from 'react-hot-loader/root'
import * as TabComponent from '@components/Tabs'

import IconAddFriend from '@assest/svg/react.svg'
import MountAssest from '@assest/img/mount.jpg'

@hot
export default class App extends React.PureComponent <any, any > {

    public changeView = (index: number): void => {
        console.log(index)
    }

    public render() : JSX.Element {
        return(
            <>
                <IconAddFriend width={30} height={30}/>
                <img src={MountAssest} width={30} height={30} />
                <div className={styles.test}>App LEELONGXI, HELLO REACT</div>
                <div className={styles.test}>LEELONGXI!!!, HEELO WEBPACK !!!</div>
                <TabComponent.Tabs activeIndex={0} onTabChange={this.changeView}>
                    <TabComponent.Tab>
                        测试tab1
                    </TabComponent.Tab>
                    <TabComponent.Tab>
                        测试tab2
                    </TabComponent.Tab>
                    <TabComponent.Tab>
                        测试tab3
                    </TabComponent.Tab>
                    <TabComponent.Tab>
                        测试tab4
                    </TabComponent.Tab>
                </TabComponent.Tabs>
            </>
        )
    }
}
