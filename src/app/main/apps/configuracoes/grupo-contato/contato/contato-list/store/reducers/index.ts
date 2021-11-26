import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ContatoListReducer, ContatoListState} from './contato-list.reducer';

export interface ContatoListAppState
{
    contatoList: ContatoListState;
}

export const getContatoListAppState = createFeatureSelector<ContatoListAppState>(
    'contato-list-app'
);

export const getAppState: any = createSelector(
    getContatoListAppState,
    (state: ContatoListAppState) => state
);

export const reducers: ActionReducerMap<ContatoListAppState> = {
    contatoList: ContatoListReducer
};

export * from './contato-list.reducer';
