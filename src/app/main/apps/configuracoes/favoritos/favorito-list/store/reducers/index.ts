import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {FavoritoListReducer, FavoritoListState} from './favorito-list.reducer';

export interface FavoritoListAppState
{
    favoritoList: FavoritoListState;
}

export const getFavoritoListAppState = createFeatureSelector<FavoritoListAppState>(
    'favorito-list-app'
);

export const getAppState: any = createSelector(
    getFavoritoListAppState,
    (state: FavoritoListAppState) => state
);

export const reducers: ActionReducerMap<FavoritoListAppState> = {
    favoritoList: FavoritoListReducer
};

export * from './favorito-list.reducer';
