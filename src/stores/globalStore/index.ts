import { Actions } from '@creators/globalActionCreators'
import { globalActionTypes as ActionTypes } from '@constants/index'
import { GlobalStore as globalState } from './type'
import { LOCALSTORAGE_KEYS } from '@constants/keys'

const initalState = {
    sideBarTheme: localStorage.getItem(LOCALSTORAGE_KEYS.SIDE_BAR_THEME) || 'light',
    subreddit: localStorage.getItem(LOCALSTORAGE_KEYS.SELECT_SUBREDDIT) || '杭州',
    sideBarCollapsed: sideBarCollapsed(localStorage.getItem(LOCALSTORAGE_KEYS.SIDE_BAR_COLLAPSED)),
    navOpenKeys: JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.NAV_OPEN_KEYS)) || [],
}

function sideBarCollapsed(side: string = '0'): boolean {
    switch (side) {
        case '0':
        default:
            return true
        case '1':
            return false
    }
}

function globalStore(state : globalState = initalState, action : Actions) : globalState {
    switch (action.type) {
        case ActionTypes.SELECT_GLOBALE_THEME:
            return {
                ...state,
                sideBarTheme: action.payload
            }
        case ActionTypes.SELECT_SUBREDDIT:
            return {
                ...state,
                subreddit: action.payload
            }
        case ActionTypes.SELECT_SIDE_BAR_COLLAPSED:
            return {
                ...state,
                sideBarCollapsed: action.payload
            }
        case ActionTypes.SELECT_OPEN_KEYS:
            return {
                ...state,
                navOpenKeys: action.payload
            }
        default:
            return state
    }
}

export { globalStore }
