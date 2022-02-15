import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RegraEtiquetaListReducer, RegraEtiquetaListState} from './regra-etiqueta-list.reducer';

export interface RegraEtiquetaListAppState
{
    regraEtiquetaList: RegraEtiquetaListState;
}

export const getRegraEtiquetaListAppState = createFeatureSelector<RegraEtiquetaListAppState>(
    'configuracoes-regra-etiqueta-list-app'
);

export const getAppState: any = createSelector(
    getRegraEtiquetaListAppState,
    (state: RegraEtiquetaListAppState) => state
);

export const reducers: ActionReducerMap<RegraEtiquetaListAppState> = {
    regraEtiquetaList: RegraEtiquetaListReducer
};

export * from './regra-etiqueta-list.reducer';
