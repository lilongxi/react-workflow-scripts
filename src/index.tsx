import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './sw'
import { Provider } from 'react-redux'
import App from '@containers/App'
import configureStore, {history, rootSaga, sagaMiddleware} from './configureStore'

const store = configureStore()

if (CONF.__DEV__) {
    window.store = store
}

sagaMiddleware.run(rootSaga)

const render = () => (
    ReactDOM.render(
        <Provider store={store}>
            <App history={history}/>
        </Provider>,
    document.getElementById('root')as HTMLElement)
)

render()

// service worker
registerServiceWorker()
