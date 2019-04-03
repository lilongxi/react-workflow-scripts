import { ResetStateAction } from '@constants/index'
import * as typesCreator from '@utils/actionTypes'

interface ResetSubState extends typesCreator.PayloadAction<
    ResetStateAction.RESET_SUB_STATE,
    IStateStore.resetSubState
> {}

export const ActionCreators = {
    resetSubState: typesCreator.createActionCreators<ResetSubState>(ResetStateAction.RESET_SUB_STATE)
}

export type Actions = ResetSubState
