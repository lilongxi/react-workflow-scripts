export as namespace IGlobalStore

export interface GlobalStore {
    sideBarTheme: string,
    subreddit: string,
    sideBarCollapsed: boolean,
    navOpenKeys?: string[]
}

export type sideBarTheme = 'dark' | 'light'

export type sideBarCollapsed = boolean

export type navOpenKeys = string[]

export type subreddit = string
