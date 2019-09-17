import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritoSetorResponsavelListReducer, FavoritoListSetorResponsavelState } from './favorito-setor-responsavel-list.reducer';

export interface FavoritoListSetorResponsavelAppState
{
    FavoritoListSetorResponsavel: FavoritoListSetorResponsavelState;
}

export const getFavoritoListSetorResponsavelAppState = createFeatureSelector<FavoritoListSetorResponsavelAppState>(
    'favorito-list-setor-responsavel-app'
);

export const getAppState = createSelector(
    getFavoritoListSetorResponsavelAppState,
    (state: FavoritoListSetorResponsavelAppState) => state
);

export const reducers: ActionReducerMap<FavoritoListSetorResponsavelAppState> = {
    FavoritoListSetorResponsavel: FavoritoSetorResponsavelListReducer
};

export * from './favorito-setor-responsavel-list.reducer';
