import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RelacionamentoEditReducer, RelacionamentoEditState} from './relacionamento-edit.reducer';

export interface RelacionamentoEditAppState {
    relacionamento: RelacionamentoEditState;
}

export const getRelacionamentoEditAppState = createFeatureSelector<RelacionamentoEditAppState>(
    'relacionamento-edit-app'
);

export const getAppState: any = createSelector(
    getRelacionamentoEditAppState,
    (state: RelacionamentoEditAppState) => state
);

export const reducers: ActionReducerMap<RelacionamentoEditAppState> = {
    relacionamento: RelacionamentoEditReducer
};

export * from './relacionamento-edit.reducer';
