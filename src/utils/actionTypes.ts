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

/**
 * 使用
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
