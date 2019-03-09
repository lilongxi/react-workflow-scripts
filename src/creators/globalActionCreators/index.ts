import { globalActionTypes } from '@constants/index'
import * as typesCreator from '@utils/actionTypes'

interface SelectGlobalTheme extends typesCreator.PayloadAction<
    globalActionTypes.SELECT_GLOBALE_THEME,
    IGlobalStore.globalStore
> {}

interface SelectSubreddit extends typesCreator.PayloadAction<
    globalActionTypes.SELECT_SUBREDDIT,
    IGlobalStore.globalStore
> {}

export const AtionsCreators = {
    selectGlobalTheme: typesCreator.createActionCreators<SelectGlobalTheme>(globalActionTypes.SELECT_GLOBALE_THEME),
    selectSubreddit: typesCreator.createActionCreators<SelectSubreddit>(globalActionTypes.SELECT_SUBREDDIT)
}

export type Actions = SelectGlobalTheme | SelectSubreddit
