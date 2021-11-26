import {ArquivistaEditBlocoReducer, ArquivistaEditBlocoState} from './arquivista-edit-bloco.reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ArquivistaEditBlocoAppState {
    arquivistaEditBloco: ArquivistaEditBlocoState;
}

export const getArquivistaEditBlocoAppState = createFeatureSelector<ArquivistaEditBlocoAppState>('arquivista-edit-bloco');

export const getAppState: any = createSelector(
    getArquivistaEditBlocoAppState,
    (state: ArquivistaEditBlocoAppState) => state
);

export const reducers: ActionReducerMap<ArquivistaEditBlocoAppState> = {
    arquivistaEditBloco: ArquivistaEditBlocoReducer
};

export * from './arquivista-edit-bloco.reducers';
