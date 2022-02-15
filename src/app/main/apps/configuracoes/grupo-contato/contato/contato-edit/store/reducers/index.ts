import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ContatoEditReducer, ContatoEditState} from './contato-edit.reducer';

export interface ContatoEditAppState
{
    contato: ContatoEditState;
}

export const getContatoEditAppState = createFeatureSelector<ContatoEditAppState>(
    'contato-edit-app'
);

export const getAppState: any = createSelector(
    getContatoEditAppState,
    (state: ContatoEditAppState) => state
);

export const reducers: ActionReducerMap<ContatoEditAppState> = {
    contato: ContatoEditReducer
};

export * from './contato-edit.reducer';
