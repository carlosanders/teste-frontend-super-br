import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {NomeEditReducer, NomeEditState} from './nome-edit.reducer';

export interface NomeEditAppState {
    nome: NomeEditState;
}

export const getNomeEditAppState = createFeatureSelector<NomeEditAppState>(
    'nome-edit-app'
);

export const getAppState: any = createSelector(
    getNomeEditAppState,
    (state: NomeEditAppState) => state
);

export const reducers: ActionReducerMap<NomeEditAppState> = {
    nome: NomeEditReducer
};

export * from './nome-edit.reducer';
