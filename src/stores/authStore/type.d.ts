export as namespace IAuthStore

export interface LoginParams {
    phone: string,
    passwd: string,
    key: string
}

export interface UserInfo {
    userinfo: PlainObject | null,
    loading?: boolean
}
