import {ArquivistaDetailReducer, ArquivistaDetailState} from './arquivista-detail.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProcessoReducer, ProcessoState} from './processo.reducer';

export interface ArquivistaDetailAppState {
    arquivistaDetail: ArquivistaDetailState;
    processo: ProcessoState;
}

export const getArquivistaDetailAppState = createFeatureSelector<ArquivistaDetailAppState>(
    'arquivista-detail-app'
);

export const getAppState: any = createSelector(
    getArquivistaDetailAppState,
    (state: ArquivistaDetailAppState) => state
);

export const reducers: ActionReducerMap<ArquivistaDetailAppState> = {
    arquivistaDetail: ArquivistaDetailReducer,
    processo: ProcessoReducer
};

export * from './arquivista-detail.reducer';
export * from './processo.reducer';
