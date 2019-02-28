import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './sw'

import App from '@components/App'



ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement)

registerServiceWorker()
