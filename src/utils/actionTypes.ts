import { CALL_API } from '@middlewares/constants'

export interface PureAction<T> {
    type: T
}

export interface PayloadAction<T, P> {
    type: T,
    payload: P
}

export function createActionCreators<
    A extends PayloadAction<A['type'], A['payload']>
>(type: A['type']): (payload: A['payload']) => A
export function createActionCreators<
    A extends PureAction<A['type']>
>(type: A['type']): () => A
export function createActionCreators<A extends { type: any, payload: any }>(type: A['type']) {
    return  (payload: A['payload']) => {
        return payload == null ? { type } as A : { type, payload } as A
    }
}

export function storageActionCreators<
    A extends PayloadAction<A['type'], A['payload']>
>(type: A['type']): (payload: A['payload']) => A
export function storageActionCreators<A extends { type: any, payload: any, [CALL_API.STORAGE_ACTION]: boolean }>(type: A['type']) {
    return  (payload: A['payload']) => {
        return { type, payload, [CALL_API.STORAGE_ACTION]: true } as A
    }
}

/**
 * use
 */
enum ActionTypes {
    Add = 'ADD',
    Set = 'SET'
}

interface SetActionPayload {
    count: number
}

interface AddAction extends PureAction<ActionTypes.Add> { }
interface SetAction extends PayloadAction<ActionTypes.Set, SetActionPayload> { }

// type Actions = AddAction | SetAction
// type Actions = keyof typeof ActionTypes

const ActionsCreators = {
    add: createActionCreators<AddAction>(ActionTypes.Add),
    set: createActionCreators<SetAction>(ActionTypes.Set)
}

// dispatch
ActionsCreators.add()
ActionsCreators.set({
    count: 1000
})
