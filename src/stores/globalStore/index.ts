import { Actions } from '@creators/globalActionCreators'
import { ActionTypes } from '@constants/globalConstants'
import { globalStore as globalState } from './type'

const initalState = {
    theme: 'light',
    subreddit: '杭州'
}

function globalStore(state : globalState = initalState, action : Actions) : globalState {
    switch (action.type) {
        case ActionTypes.SELECT_GLOBALE_THEME:
            return {
                ...state,
                theme: action.payload.theme
            }
        case ActionTypes.SELECT_SUBREDDIT:
            return {
                ...state,
                subreddit: action.payload.subreddit
            }
        default:
            return state
    }
}

export { globalStore }
