import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {CompartilhamentoCreateReducer, CompartilhamentoCreateState} from './compartilhamento-create.reducer';

export interface CompartilhamentoCreateAppState
{
    compartilhamentoCreate: CompartilhamentoCreateState;
}

export const getCompartilhamentoCreateAppState = createFeatureSelector<CompartilhamentoCreateAppState>(
    'compartilhamento-create-app'
);

export const getAppState: any = createSelector(
    getCompartilhamentoCreateAppState,
    (state: CompartilhamentoCreateAppState) => state
);

export const reducers: ActionReducerMap<CompartilhamentoCreateAppState> = {
    compartilhamentoCreate: CompartilhamentoCreateReducer
};

export * from './compartilhamento-create.reducer';
