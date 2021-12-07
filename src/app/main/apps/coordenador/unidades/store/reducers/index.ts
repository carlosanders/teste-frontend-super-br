import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {UnidadesOrgaoCentralReducer, UnidadesOrgaoCentralState} from './unidades.reducer';

export interface UnidadesOrgaoCentralAppState
{
    unidades: UnidadesOrgaoCentralState;
}

export const getUnidadesOrgaoCentralAppState = createFeatureSelector<UnidadesOrgaoCentralAppState>(
    'unidades-orgao-central-app'
);

export const getAppState: any = createSelector(
    getUnidadesOrgaoCentralAppState,
    (state: UnidadesOrgaoCentralAppState) => state
);

export const reducers: ActionReducerMap<UnidadesOrgaoCentralAppState> = {
    unidades: UnidadesOrgaoCentralReducer
};

export * from './unidades.reducer';
