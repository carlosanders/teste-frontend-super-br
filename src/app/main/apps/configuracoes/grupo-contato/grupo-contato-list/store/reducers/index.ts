import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {GrupoContatoListReducer, GrupoContatoListState} from './grupo-contato-list.reducer';

export interface GrupoContatoListAppState
{
    grupoContatoList: GrupoContatoListState;
}

export const getGrupoContatoListAppState = createFeatureSelector<GrupoContatoListAppState>(
    'grupo-contato-list-app'
);

export const getAppState: any = createSelector(
    getGrupoContatoListAppState,
    (state: GrupoContatoListAppState) => state
);

export const reducers: ActionReducerMap<GrupoContatoListAppState> = {
    grupoContatoList: GrupoContatoListReducer
};

export * from './grupo-contato-list.reducer';
