import Loadable from 'react-loadable'
import PageLoading from '@components/PageLoading'

export default (loader: () => Promise<any>) => Loadable({
    loader,
    loading: PageLoading
})
