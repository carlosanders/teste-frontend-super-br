import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {UnidadesOrgaoCentralListReducer, UnidadesOrgaoCentralListState} from './unidades-list.reducer';

export interface UnidadesOrgaoCentralListAppState
{
    unidades: UnidadesOrgaoCentralListState;
}

export const getUnidadesOrgaoCentralListAppState = createFeatureSelector<UnidadesOrgaoCentralListAppState>(
    'unidades-orgao-central-list-app'
);

export const getAppState: any = createSelector(
    getUnidadesOrgaoCentralListAppState,
    (state: UnidadesOrgaoCentralListAppState) => state
);

export const reducers: ActionReducerMap<UnidadesOrgaoCentralListAppState> = {
    unidades: UnidadesOrgaoCentralListReducer
};

export * from './unidades-list.reducer';
