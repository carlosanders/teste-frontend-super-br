import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {InteressadoEditReducer, InteressadoEditState} from './interessado-edit.reducer';

export interface InteressadoEditAppState
{
    interessado: InteressadoEditState;
}

export const getInteressadoEditAppState = createFeatureSelector<InteressadoEditAppState>(
    'interessado-edit-app'
);

export const getAppState: any = createSelector(
    getInteressadoEditAppState,
    (state: InteressadoEditAppState) => state
);

export const reducers: ActionReducerMap<InteressadoEditAppState> = {
    interessado: InteressadoEditReducer
};

export * from './interessado-edit.reducer';
