import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {UploadBlocoState, uploadBlocoReducer} from './upload-bloco.reducer';

export interface UploadBlocoAppState
{
    uploadBloco: UploadBlocoState;
}

export const getUploadBlocoAppState = createFeatureSelector<UploadBlocoAppState>(
    'upload-bloco-app'
);

export const getAppState: any = createSelector(
    getUploadBlocoAppState,
    (state: UploadBlocoAppState) => state
);

export const reducers: ActionReducerMap<UploadBlocoAppState> = {
    uploadBloco: uploadBlocoReducer
};

export * from './upload-bloco.reducer';
