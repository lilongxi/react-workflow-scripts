import { ENV_CONFIGER } from '@constants/env'
// Register A service worker
export default function registerServiceWorker() {
    if ('serviceWorker' in navigator && CONF.__CONF__ !== ENV_CONFIGER.DEVELOPMENT) {
        window.addEventListener('load', () => {
            const prefix = location
                .pathname
                .replace(/\/(index\.html)?$/, '')
            navigator
                .serviceWorker
                .register(`${prefix}/build.sw.js`)
                .then((registration) => {
                    // Registration was successful
                    console.log('[success] scope: ', registration.scope)
                }, (err) => {
                    // registration failed :(
                    console.log('[fail]: ', err)
                })
        })
    }
}
