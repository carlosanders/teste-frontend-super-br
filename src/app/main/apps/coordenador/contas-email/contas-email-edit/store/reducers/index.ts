import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ContasEmailEditReducer, ContaEmailEditState} from './contas-email-edit.reducer';

export interface ContaEmailEditAppState
{
    contaEmail: ContaEmailEditState;
}

export const getContaEmailEditAppState = createFeatureSelector<ContaEmailEditAppState>(
    'contas-email-edit-app'
);

export const getAppState: any = createSelector(
    getContaEmailEditAppState,
    (state: ContaEmailEditAppState) => state
);

export const reducers: ActionReducerMap<ContaEmailEditAppState> = {
    contaEmail: ContasEmailEditReducer
};

export * from './contas-email-edit.reducer';
