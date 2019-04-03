import { LoginActions, ActionCreators } from '@creators/authActionCreators'
import { SagaIterator } from 'redux-saga'
import { AuthActionTypes } from '@constants/index'
import { takeEvery, call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { getJSON, setCookie } from '@utils/index'
import { COOKIE_KEYS } from '@constants/keys'

const Api = {
    loginRequest<T extends IAuthStore.LoginParams>({key, phone, passwd}: T): Promise<any> {
        return getJSON({
            url: `https://www.apiopen.top/login?key=${key}&phone=${phone}&passwd=${passwd}`,
        })
    }
}

export const initalState = {
    userinfo: null,
    loading: false
}

function * loginAsync(params: LoginActions): SagaIterator {
    try {
        const { data } =  yield call(Api.loginRequest, {...params.payload})
        yield put(ActionCreators.loginResponse(data))
        setCookie(COOKIE_KEYS.TOKEN, data.key)
        yield put(push('/'))
    } catch (error) {
        yield put(ActionCreators.loginResponse(initalState))
        yield put(push('/error'))
    }
}

function * watchLoginAsync(): SagaIterator {
    yield takeEvery(AuthActionTypes.LOGIN_REQUEST, loginAsync)
}

export {
    watchLoginAsync
}
