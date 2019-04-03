import { LoginActions, LogoutActions } from '@creators/authActionCreators'
import { AuthActionTypes } from '@constants/index'
import { UserInfo } from './type'
import { initalState } from './saga'

function authStore(state : UserInfo = initalState, action : LoginActions | LogoutActions) {
    switch (action.type) {
        case AuthActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case AuthActionTypes.LOGIN_RESPONSE:
            return {
                userinfo: action.payload,
                loading: false
            }
        case AuthActionTypes.LOGOUT_REQUEST:
            return {
                userinfo: null,
                loading: false
            }
        default:
            return state
    }
}

export * from './saga'
export { authStore }
