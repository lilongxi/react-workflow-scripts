import { Dispatch } from 'redux'

function callAPIMiddleware({ dispatch, getState }: { dispatch: Dispatch, getState: () => void }) {
    return next => action => {
        const { type, types, callApi, payload } = action
        if (type !== 'CALL_API' || !types) {
            return next(action)
        }
        if (
            !Array.isArray(types) ||
            types.length !== 3
        ) {
            throw new Error('Expected an array of three string types.')
        }

        if (typeof callApi !== 'function') {
            throw new Error('Expected callAPI to be a function.')
        }

        const [ requestType, successType, failureType ] = types

        dispatch(requestType({
            subreddit: payload.subreddit
        }))

        return callApi().then(response => {
            console.log(response)
        })

        next(action)
    }
}

export default callAPIMiddleware
