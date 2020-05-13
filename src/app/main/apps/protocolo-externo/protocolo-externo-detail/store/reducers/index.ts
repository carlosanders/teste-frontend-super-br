import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentoDetailReducer, ProcessoDetailState } from './Documento-detail.reducer';

export interface ProcessoDetailAppState
{
    processoDetail: ProcessoDetailState;
}

export const getProcessoDetailAppState = createFeatureSelector<ProcessoDetailAppState>(
    'protocolo-externo-detail-app'
);

export const getAppState = createSelector(
    getProcessoDetailAppState,
    (state: ProcessoDetailAppState) => state
);

export const reducers: ActionReducerMap<ProcessoDetailAppState> = {
    processoDetail: DocumentoDetailReducer
};

export * from './Documento-detail.reducer';
