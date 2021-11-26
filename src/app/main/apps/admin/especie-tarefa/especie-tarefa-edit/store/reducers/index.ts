import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EspecieTarefaEditReducer, EspecieTarefaEditState} from './especie-tarefa-edit.reducer';

export interface EspecieTarefaEditAppState {
    especieTarefa: EspecieTarefaEditState;
}

export const getEspecieTarefaEditAppState = createFeatureSelector<EspecieTarefaEditAppState>(
    'especie-tarefa-edit-app'
);

export const getAppState: any = createSelector(
    getEspecieTarefaEditAppState,
    (state: EspecieTarefaEditAppState) => state
);

export const reducers: ActionReducerMap<EspecieTarefaEditAppState> = {
    especieTarefa: EspecieTarefaEditReducer
};

export * from './especie-tarefa-edit.reducer';
