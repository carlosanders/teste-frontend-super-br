import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AssinaturaListReducer, AssinaturaListState} from './assinatura-list.reducer';

export interface AssinaturaListAppState
{
    assinaturaList: AssinaturaListState;
}

export const getAssinaturaListAppState = createFeatureSelector<AssinaturaListAppState>(
    'assinatura-list-app'
);

export const getAppState: any = createSelector(
    getAssinaturaListAppState,
    (state: AssinaturaListAppState) => state
);

export const reducers: ActionReducerMap<AssinaturaListAppState> = {
    assinaturaList: AssinaturaListReducer
};

export * from './assinatura-list.reducer';
