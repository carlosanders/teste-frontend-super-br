import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RegraEtiquetaEditReducer, RegraEtiquetaEditState} from './regra-etiqueta-edit.reducer';

export interface RegraEtiquetaEditAppState
{
    regraEtiqueta: RegraEtiquetaEditState;
}

export const getRegraEtiquetaEditAppState = createFeatureSelector<RegraEtiquetaEditAppState>(
    'coordenador-regra-etiqueta-edit-app'
);

export const getAppState: any = createSelector(
    getRegraEtiquetaEditAppState,
    (state: RegraEtiquetaEditAppState) => state
);

export const reducers: ActionReducerMap<RegraEtiquetaEditAppState> = {
    regraEtiqueta: RegraEtiquetaEditReducer
};

export * from './regra-etiqueta-edit.reducer';
