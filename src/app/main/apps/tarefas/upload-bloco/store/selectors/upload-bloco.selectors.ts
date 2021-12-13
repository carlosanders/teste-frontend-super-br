import {createSelector} from '@ngrx/store';
import {UploadBlocoAppState, UploadBlocoState, getUploadBlocoAppState} from '../reducers';

export const getUploadBlocoState: any = createSelector(
    getUploadBlocoAppState,
    (state: UploadBlocoAppState) => state.uploadBloco
);

export const getIsSaving: any = createSelector(
    getUploadBlocoState,
    (state: UploadBlocoState) => state.savingTarefasId.length > 0
);

export const getErrors: any = createSelector(
    getUploadBlocoState,
    (state: UploadBlocoState) => state.errors
);
