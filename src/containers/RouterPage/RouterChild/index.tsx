import * as React from 'react'
import { connectToProps } from '@utils/index'
import { Link } from 'react-router-dom'

interface IProps {
    pathname: string,
    search: string,
    hash: string,
    children?: React.ReactNode
}

const RouterChild: React.SFC = ({pathname, search, hash}: IProps): JSX.Element => (
    <>
        <h4>RouterChild</h4>
        <ul>
            <li><Link to="/router?color=Blue&size=40">with query string</Link></li>
            <li><Link to="/router#lovelove">with hash</Link></li>
        </ul>
        <div>
            pathname: {pathname}
        </div>
        <div>
            search: {search}
        </div>
        <div>
            hash: {hash}
        </div>
    </>
)

const mapStateToProps = (state: IStore.IStoreState) => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
})

export default connectToProps(mapStateToProps)(RouterChild)
