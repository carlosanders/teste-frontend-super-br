import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {processoViewVinculacaoDocumentoReducer, ProcessoViewVinculacaoDocumentoState} from './juntada.reducer';

export interface ProcessoViewVinculacaoDocumentoAppState
{
    juntada: ProcessoViewVinculacaoDocumentoState;
}

export const getProcessoViewVinculacaoDocumentoAppState = createFeatureSelector<ProcessoViewVinculacaoDocumentoAppState>(
    'processo-view-vinculacao-documento-app'
);

export const getAppState: any = createSelector(
    getProcessoViewVinculacaoDocumentoAppState,
    (state: ProcessoViewVinculacaoDocumentoAppState) => state
);

export const reducers: ActionReducerMap<ProcessoViewVinculacaoDocumentoAppState> = {
    juntada: processoViewVinculacaoDocumentoReducer
};

export * from './juntada.reducer';
