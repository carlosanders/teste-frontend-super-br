import {ArquivistaDetailReducer, ArquivistaDetailState} from './arquivista-detail.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ArquivistaDetailAppState {
    arquivistaDetail: ArquivistaDetailState;
}

export const getArquivistaDetailAppState = createFeatureSelector<ArquivistaDetailAppState>(
    'arquivista-detail-app'
);

export const getAppState = createSelector(
    getArquivistaDetailAppState,
    (state: ArquivistaDetailAppState) => state
);

export const reducers: ActionReducerMap<ArquivistaDetailAppState> = {
    arquivistaDetail: ArquivistaDetailReducer
}

export * from './arquivista-detail.reducer';