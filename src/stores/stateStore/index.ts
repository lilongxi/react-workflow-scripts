import { ResetStateAction } from '@constants/index'
import { Actions } from '@creators/stateActionCreators'
import { Reducer } from 'redux'
import { omit } from 'lodash-es'

export default function rootReducers(appReducers): Reducer<any> {
    return (state : IStoreState, action : Actions): IStoreState => {
        let newState
        switch (action.type) {
            case ResetStateAction.RESET_SUB_STATE:
                newState = omit(state, action.payload)
                break
            default:
                newState = state
                break
        }
        return appReducers(newState , action)
    }
}
