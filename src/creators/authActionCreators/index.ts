import {AuthActionTypes} from '@constants/index'
import * as typesCreator from '@utils/actionTypes'

interface LoginRequest extends typesCreator.PayloadAction<
    AuthActionTypes.LOGIN_REQUEST,
    IAuthStore.LoginParams
> {}

interface LoginResponse extends typesCreator.PayloadAction<
    AuthActionTypes.LOGIN_RESPONSE,
    IAuthStore.UserInfo
> {}

interface LogoutRequest extends typesCreator.PureAction<
    AuthActionTypes.LOGOUT_REQUEST
> {}

export type LoginActions = LoginRequest | LoginResponse

export type LogoutActions = LogoutRequest

export const ActionCreators = {
    loginRequest: typesCreator.createActionCreators<LoginRequest>(AuthActionTypes.LOGIN_REQUEST),
    loginResponse : typesCreator.storageActionCreators <LoginResponse> (AuthActionTypes.LOGIN_RESPONSE),
    logoutActions: typesCreator.createActionCreators<LogoutActions>(AuthActionTypes.LOGOUT_REQUEST)
}
