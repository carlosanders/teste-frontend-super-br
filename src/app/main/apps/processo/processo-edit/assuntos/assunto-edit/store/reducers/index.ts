import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AssuntoEditReducer, AssuntoEditState} from './assunto-edit.reducer';

export interface AssuntoEditAppState
{
    assunto: AssuntoEditState;
}

export const getAssuntoEditAppState = createFeatureSelector<AssuntoEditAppState>(
    'assunto-edit-app'
);

export const getAppState: any = createSelector(
    getAssuntoEditAppState,
    (state: AssuntoEditAppState) => state
);

export const reducers: ActionReducerMap<AssuntoEditAppState> = {
    assunto: AssuntoEditReducer
};

export * from './assunto-edit.reducer';
