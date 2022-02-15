import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CalendarioReducer, CalendarioState} from './tarefas.reducer';

export interface CalendarioAppState
{
    tarefas: CalendarioState;
}

export const getCalendarioAppState = createFeatureSelector<CalendarioAppState>(
    'calendario-app'
);

export const getAppState: any = createSelector(
    getCalendarioAppState,
    (state: CalendarioAppState) => state
);

export const reducers: ActionReducerMap<CalendarioAppState> = {
    tarefas: CalendarioReducer
};

export * from './tarefas.reducer';
