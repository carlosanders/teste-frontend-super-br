import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AssuntoListReducer, AssuntoListState} from './assunto-list.reducer';

export interface AssuntoListAppState
{
    assuntoList: AssuntoListState;
}

export const getAssuntoListAppState = createFeatureSelector<AssuntoListAppState>(
    'assunto-list-app'
);

export const getAppState: any = createSelector(
    getAssuntoListAppState,
    (state: AssuntoListAppState) => state
);

export const reducers: ActionReducerMap<AssuntoListAppState> = {
    assuntoList: AssuntoListReducer
};

export * from './assunto-list.reducer';
