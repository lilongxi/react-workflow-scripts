import * as React from 'react'
import * as styles from '../../index.scss'
import { connect } from '@utils/index'
import { AtionsCreators } from '@creators/globalActionCreators'
import IconAddFriend from '@assest/svg/react.svg'
import MountAssest from '@assest/img/mount.jpg'
import { ReactExt } from '@utils/index'

interface IProps {
    globalTheme?: string,
    onSelectedTheme? : <T>(data: T) => void
}

const mapStateToProps = (state : IStore<any>) : IProps => {
    return {
        globalTheme: state.globalStore.theme
    }
}

@connect(mapStateToProps, {
     onSelectedTheme: AtionsCreators.selectGlobalTheme
})
export default class App extends ReactExt <IProps, {} > {

    public changeView = (): void => {
        this.props.onSelectedTheme({theme: this.props.globalTheme === 'light' ? 'dark' : 'light' })
    }

    public render() : JSX.Element {
        return(
            <>
                <IconAddFriend width={30} height={30}/>
                <img src={MountAssest} width={30} height={30} />
                <div className={styles.test}>App LEELONGXI, HELLO REACT {this.props.globalTheme} !!!</div>
            </>
        )
    }
}
