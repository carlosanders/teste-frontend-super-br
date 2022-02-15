import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {SetorListReducer, SetorListState} from './setor-list.reducer';

export interface SetorListAppState {
    setorList: SetorListState;
}

export const getSetorListAppState = createFeatureSelector<SetorListAppState>(
    'admin-setor-list-app'
);

export const getAppState: any = createSelector(
    getSetorListAppState,
    (state: SetorListAppState) => state
);

export const reducers: ActionReducerMap<SetorListAppState> = {
    setorList: SetorListReducer
};

export * from './setor-list.reducer';
