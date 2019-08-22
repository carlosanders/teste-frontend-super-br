import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritoEspecieTarefaListReducer, FavoritoListState } from './favorito-especie-tarefa-list.reducer';

export interface FavoritoListAppState
{
    favoritoList: FavoritoListState;
}

export const getFavoritoListAppState = createFeatureSelector<FavoritoListAppState>(
    'favorito-list-app'
);

export const getAppState = createSelector(
    getFavoritoListAppState,
    (state: FavoritoListAppState) => state
);

export const reducers: ActionReducerMap<FavoritoListAppState> = {
    favoritoList: FavoritoEspecieTarefaListReducer
};

export * from './favorito-especie-tarefa-list.reducer';
