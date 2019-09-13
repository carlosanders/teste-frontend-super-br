import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritoEspecieTarefaListReducer, FavoritoListEspecieTarefaState } from './favorito-especie-tarefa-list.reducer';

export interface FavoritoListEspecieTarefaAppState
{
    FavoritoListEspecieTarefa: FavoritoListEspecieTarefaState;
}

export const getFavoritoListEspecieTarefaAppState = createFeatureSelector<FavoritoListEspecieTarefaAppState>(
    'favorito-list-especie-tarefa-app'
);

export const getAppState = createSelector(
    getFavoritoListEspecieTarefaAppState,
    (state: FavoritoListEspecieTarefaAppState) => state
);

export const reducers: ActionReducerMap<FavoritoListEspecieTarefaAppState> = {
    FavoritoListEspecieTarefa: FavoritoEspecieTarefaListReducer
};

export * from './favorito-especie-tarefa-list.reducer';
