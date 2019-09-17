import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritoEspecieAtividadeListReducer, FavoritoListEspecieAtividadeState } from './favorito-especie-atividade-list.reducer';

export interface FavoritoListEspecieAtividadeAppState
{
    FavoritoListEspecieAtividade: FavoritoListEspecieAtividadeState;
}

export const getFavoritoListEspecieAtividadeAppState = createFeatureSelector<FavoritoListEspecieAtividadeAppState>(
    'favorito-list-especie-atividade-app'
);

export const getAppState = createSelector(
    getFavoritoListEspecieAtividadeAppState,
    (state: FavoritoListEspecieAtividadeAppState) => state
);

export const reducers: ActionReducerMap<FavoritoListEspecieAtividadeAppState> = {
    FavoritoListEspecieAtividade: FavoritoEspecieAtividadeListReducer
};

export * from './favorito-especie-atividade-list.reducer';
