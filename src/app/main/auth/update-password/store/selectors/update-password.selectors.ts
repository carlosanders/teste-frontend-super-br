import {createSelector} from '@ngrx/store';
import {UpdatePasswordAppState, GetUpdatePasswordAppState, UpdatePasswordState} from '../../store';

export const getUpdatePasswordState: any = createSelector(
    GetUpdatePasswordAppState,
    (state: UpdatePasswordAppState) => state.updatePassword
);

export const getErrorMessage: any = createSelector(
    getUpdatePasswordState,
    (state: UpdatePasswordState) => state.errorMessage
);

export const isSaving: any = createSelector(
    getUpdatePasswordState,
    (state: UpdatePasswordState) => state.saving
);

export const isSuccess: any = createSelector(
    getUpdatePasswordState,
    (state: UpdatePasswordState) => state.success
);
