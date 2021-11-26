import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AcaoListReducer, AcaoListState} from './acao-list.reducer';
import {EtiquetaReducer, EtiquetaState} from './etiqueta.reducer';

export interface AcaoListAppState
{
    acaoList: AcaoListState;
    etiqueta: EtiquetaState;
}

export const getAcaoListAppState = createFeatureSelector<AcaoListAppState>(
    'configuracoes-acao-list-app'
);

export const getAppState: any = createSelector(
    getAcaoListAppState,
    (state: AcaoListAppState) => state
);

export const reducers: ActionReducerMap<AcaoListAppState> = {
    acaoList: AcaoListReducer,
    etiqueta: EtiquetaReducer
};

export * from './acao-list.reducer';
export * from './etiqueta.reducer';
