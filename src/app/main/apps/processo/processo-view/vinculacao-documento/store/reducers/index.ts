import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProcessoViewVinculacaoDocumentoReducer, ProcessoViewVinculacaoDocumentoState} from './juntada.reducer';

export interface ProcessoViewVinculacaoDocumentoAppState
{
    juntada: ProcessoViewVinculacaoDocumentoState;
}

export const getProcessoViewVinculacaoDocumentoAppState = createFeatureSelector<ProcessoViewVinculacaoDocumentoAppState>(
    'processo-view-vinculacao-documento-app'
);

export const getAppState = createSelector(
    getProcessoViewVinculacaoDocumentoAppState,
    (state: ProcessoViewVinculacaoDocumentoAppState) => state
);

export const reducers: ActionReducerMap<ProcessoViewVinculacaoDocumentoAppState> = {
    juntada: ProcessoViewVinculacaoDocumentoReducer
};

export * from './juntada.reducer';
