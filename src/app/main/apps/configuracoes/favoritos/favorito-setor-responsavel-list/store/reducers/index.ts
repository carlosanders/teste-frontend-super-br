import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritoSetorResponsavelListReducer, FavoritoListState } from './favorito-setor-responsavel-list.reducer';

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
    favoritoList: FavoritoSetorResponsavelListReducer
};

export * from './favorito-setor-responsavel-list.reducer';
