import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EnderecoEditReducer, EnderecoEditState} from './endereco-edit.reducer';

export interface EnderecoEditAppState {
    endereco: EnderecoEditState;
}

export const getEnderecoEditAppState = createFeatureSelector<EnderecoEditAppState>(
    'endereco-edit-app'
);

export const getAppState: any = createSelector(
    getEnderecoEditAppState,
    (state: EnderecoEditAppState) => state
);

export const reducers: ActionReducerMap<EnderecoEditAppState> = {
    endereco: EnderecoEditReducer
};

export * from './endereco-edit.reducer';
