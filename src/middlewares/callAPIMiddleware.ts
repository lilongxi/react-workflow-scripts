import { Dispatch } from 'redux'
import { CALL_API } from './constants'
import { isArray, isBoolean, isObject, isString } from 'lodash-es'

function callAPIMiddleware({ dispatch, getState }: { dispatch: Dispatch, getState: () => void }) {
    return next => action => {
        try {
            if (action[CALL_API.STORAGE_ACTION]) {
                const { type, payload } = action
                if (isArray(payload) || isObject(payload)) {
                    localStorage.setItem(type, JSON.stringify(payload))
                } else if (isString(payload)) {
                    localStorage.setItem(type, payload)
                } else if (isBoolean(payload)) {
                    localStorage.setItem(type, payload ? '0' : '1')
                }
            }
        } catch (error) {
            console.warn(error)
        }
        next(action)
    }
}

export default callAPIMiddleware
