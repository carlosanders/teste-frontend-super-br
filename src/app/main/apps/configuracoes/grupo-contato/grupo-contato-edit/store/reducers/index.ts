import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {GrupoContatoEditReducer, GrupoContatoEditState} from './grupo-contato-edit.reducer';

export interface GrupoContatoEditAppState
{
    grupoContato: GrupoContatoEditState;
}

export const getGrupoContatoEditAppState = createFeatureSelector<GrupoContatoEditAppState>(
    'grupo-contato-edit-app'
);

export const getAppState: any = createSelector(
    getGrupoContatoEditAppState,
    (state: GrupoContatoEditAppState) => state
);

export const reducers: ActionReducerMap<GrupoContatoEditAppState> = {
    grupoContato: GrupoContatoEditReducer
};

export * from './grupo-contato-edit.reducer';
