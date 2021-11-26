import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {UnidadesListReducer, UnidadesListState} from './unidades-list.reducer';

export interface UnidadesListAppState {
    unidadesList: UnidadesListState;
}

export const getUnidadesListAppState = createFeatureSelector<UnidadesListAppState>(
    'unidades-list-app'
);

export const getAppState: any = createSelector(
    getUnidadesListAppState,
    (state: UnidadesListAppState) => state
);

export const reducers: ActionReducerMap<UnidadesListAppState> = {
    unidadesList: UnidadesListReducer
};

export * from './unidades-list.reducer';
