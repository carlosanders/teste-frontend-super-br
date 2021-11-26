import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {SetorEditReducer, SetorEditState} from './setor-edit.reducer';

export interface SetorEditAppState {
    setor: SetorEditState;
}

export const getSetorEditAppState = createFeatureSelector<SetorEditAppState>(
    'admin-setor-edit-app'
);

export const getAppState: any = createSelector(
    getSetorEditAppState,
    (state: SetorEditAppState) => state
);

export const reducers: ActionReducerMap<SetorEditAppState> = {
    setor: SetorEditReducer
};

export * from './setor-edit.reducer';
