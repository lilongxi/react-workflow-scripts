import * as React from 'react'
import { ReactExt } from '@utils/index'
import { connectToProps } from '@utils/index'
import injectReducer from '@containers/AppMiddleWares/ReducerInjector'

import reducer from './store/reducer'

interface IProps {
    pathname : string,
    search : string,
    hash : string,
    children?: React.ReactNode
}

const mapStateToProps = (state: IStore<any>) => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
})

@connectToProps(mapStateToProps)
@injectReducer({ key: 'dashboard' , reducer })
class Dashboard extends ReactExt<IProps, any> {

    renderEle = (): JSX.Element => {
        const { pathname } = this.props
        return (
            <>
                <div>
                    pathname: {pathname}
                </div>
            </>
        )
    }

    render(): JSX.Element {
        return (
            <>
                { this.renderEle() }
            </>
        )
    }
}

export default Dashboard
