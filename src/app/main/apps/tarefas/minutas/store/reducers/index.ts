import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {MinutasState, minutasReducer} from './minutas.reducer';

export interface MinutasAppState
{
    minutas: MinutasState;
}

export const getMinutasAppState = createFeatureSelector<MinutasAppState>(
    'minutas-app'
);

export const getAppState = createSelector(
    getMinutasAppState,
    (state: MinutasAppState) => state
);

export const reducers: ActionReducerMap<MinutasAppState> = {
    minutas: minutasReducer
};

export * from './minutas.reducer';
