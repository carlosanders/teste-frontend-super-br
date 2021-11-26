import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EnderecoListReducer, EnderecoListState} from './endereco-list.reducer';

export interface EnderecoListAppState {
    enderecoList: EnderecoListState;
}

export const getEnderecoListAppState = createFeatureSelector<EnderecoListAppState>(
    'endereco-list-app'
);

export const getAppState: any = createSelector(
    getEnderecoListAppState,
    (state: EnderecoListAppState) => state
);

export const reducers: ActionReducerMap<EnderecoListAppState> = {
    enderecoList: EnderecoListReducer
};

export * from './endereco-list.reducer';
