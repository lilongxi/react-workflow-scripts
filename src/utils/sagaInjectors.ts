import { SagaIterator } from 'redux-saga'
import { ENUM_ALLOW_MODES } from '@constants/saga'
import { ENV_CONFIGER } from '@constants/env'

interface ISagaDescriptor {
    saga: () => SagaIterator,
    mode?: string
}

type InjectSagaFunc = (key : string, sagaDescriptor : ISagaDescriptor, args) => void
type EjectSagaFunc = (key : string) => void

export function injectSagaFactory(store: IStore<any>): InjectSagaFunc {
    return (key: string, descriptor: ISagaDescriptor, args: PlainObject) => {
        // 组合新的saga
        const newDescriptor = {
            ...descriptor,
            mode: descriptor.mode || ENUM_ALLOW_MODES.RESTART_ON_REMOUNT
        }
        const { saga, mode } = newDescriptor
        let hasSaga = Reflect.has(store.injectedSagas, key)
        if (CONF.__CONF__ === ENV_CONFIGER.DEVELOPMENT) {
            const oldDescriptor = store.injectedSagas[key]
            if (hasSaga && oldDescriptor.saga !== saga) {
                oldDescriptor.task.cancel()
                hasSaga = false
            }
        }

        if (
            !hasSaga ||
            (hasSaga && mode !== ENUM_ALLOW_MODES.DAEMON && mode !== ENUM_ALLOW_MODES.ONCE_TILL_UNMOUNT)
        ) {
            store.injectedSagas[key] = {
                ...newDescriptor,
                task: store.runSaga(saga, args)
            }
        }

    }
}

export function ejectSagaFactory(store: IStore<any>): EjectSagaFunc {
    return (key: string) => {
        if (Reflect.has(store.injectedSagas, key)) {
            const descriptor = store.injectedSagas[key]
            if (descriptor.mode !== ENUM_ALLOW_MODES.DAEMON) {
                descriptor.task.cancel()
                if (CONF.__CONF__ === ENV_CONFIGER.PRODUCTION) {
                    store.injectedSagas[key] = null
                }
            }
        }
    }
}

export default function getInjectors<T>(store: IStore<any>) {
    return {
        injectSaga: injectSagaFactory(store),
        ejectSaga: ejectSagaFactory(store)
    }
}
