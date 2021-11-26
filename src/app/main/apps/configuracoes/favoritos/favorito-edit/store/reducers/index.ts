import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {FavoritoEditReducer, FavoritoEditState} from './favorito-edit.reducer';

export interface FavoritoEditAppState
{
    favorito: FavoritoEditState;
}

export const getFavoritoEditAppState = createFeatureSelector<FavoritoEditAppState>(
    'favorito-edit-app'
);

export const getAppState: any = createSelector(
    getFavoritoEditAppState,
    (state: FavoritoEditAppState) => state
);

export const reducers: ActionReducerMap<FavoritoEditAppState> = {
    favorito: FavoritoEditReducer
};

export * from './favorito-edit.reducer';
