import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EtiquetaListReducer, EtiquetaListState} from './etiqueta-list.reducer';

export interface EtiquetaListAppState
{
    etiquetaList: EtiquetaListState;
}

export const getEtiquetaListAppState = createFeatureSelector<EtiquetaListAppState>(
    'etiqueta-list-app'
);

export const getAppState: any = createSelector(
    getEtiquetaListAppState,
    (state: EtiquetaListAppState) => state
);

export const reducers: ActionReducerMap<EtiquetaListAppState> = {
    etiquetaList: EtiquetaListReducer
};

export * from './etiqueta-list.reducer';
