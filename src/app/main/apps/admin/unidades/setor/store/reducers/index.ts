import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {SetorReducer, SetorState} from './setor.reducer';

export interface SetorAppState {
    setor: SetorState;
}

export const getSetorAppState = createFeatureSelector<SetorAppState>(
    'admin-setor-app'
);

export const getAppState: any = createSelector(
    getSetorAppState,
    (state: SetorAppState) => state
);

export const reducers: ActionReducerMap<SetorAppState> = {
    setor: SetorReducer
};

export * from './setor.reducer';
