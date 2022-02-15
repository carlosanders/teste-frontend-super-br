import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EspecieTarefaListReducer, EspecieTarefaListState} from './especie-tarefa-list.reducer';

export interface EspecieTarefaListAppState {
    especieTarefaList: EspecieTarefaListState;
}

export const getEspecieTarefaListAppState = createFeatureSelector<EspecieTarefaListAppState>(
    'especie-tarefa-list'
);

export const getAppState: any = createSelector(
    getEspecieTarefaListAppState,
    (state: EspecieTarefaListAppState) => state
);

export const reducers: ActionReducerMap<EspecieTarefaListAppState> = {
    especieTarefaList: EspecieTarefaListReducer
};

export * from './especie-tarefa-list.reducer';
