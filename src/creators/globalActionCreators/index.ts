import { globalActionTypes } from '@constants/index'
import * as typesCreator from '@utils/actionTypes'

interface SelectGlobalTheme extends typesCreator.PayloadAction<
    globalActionTypes.SELECT_GLOBALE_THEME,
    IGlobalStore.sideBarTheme
> {}

interface SelectSubreddit extends typesCreator.PayloadAction<
    globalActionTypes.SELECT_SUBREDDIT,
    IGlobalStore.subreddit
> {}

interface SelectSideBarCollapsed extends typesCreator.PayloadAction<
    globalActionTypes.SELECT_SIDE_BAR_COLLAPSED,
    IGlobalStore.sideBarCollapsed
> {}

interface SelectOpenKeys extends typesCreator.PayloadAction<
    globalActionTypes.SELECT_OPEN_KEYS,
    IGlobalStore.navOpenKeys
> {}

export const AtionsCreators = {
    selectOpenKeys: typesCreator.storageActionCreators<SelectOpenKeys>(globalActionTypes.SELECT_OPEN_KEYS),
    selectSideBarCollapsed: typesCreator.storageActionCreators<SelectSideBarCollapsed>(globalActionTypes.SELECT_SIDE_BAR_COLLAPSED),
    selectGlobalTheme: typesCreator.storageActionCreators<SelectGlobalTheme>(globalActionTypes.SELECT_GLOBALE_THEME),
    selectSubreddit: typesCreator.storageActionCreators<SelectSubreddit>(globalActionTypes.SELECT_SUBREDDIT)
}

export type Actions = SelectGlobalTheme | SelectSubreddit | SelectSideBarCollapsed | SelectOpenKeys
