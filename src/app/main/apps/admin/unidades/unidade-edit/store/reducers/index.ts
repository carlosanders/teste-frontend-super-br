import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {UnidadeEditReducer, UnidadeEditState} from './unidade-edit.reducer';

export interface UnidadeEditAppState {
    unidade: UnidadeEditState;
}

export const getUnidadeEditAppState = createFeatureSelector<UnidadeEditAppState>(
    'unidade-edit-app'
);

export const getAppState: any = createSelector(
    getUnidadeEditAppState,
    (state: UnidadeEditAppState) => state
);

export const reducers: ActionReducerMap<UnidadeEditAppState> = {
    unidade: UnidadeEditReducer
};

export * from './unidade-edit.reducer';
