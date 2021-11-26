import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { StatusBarramentoReducer, StatusBarramentoState } from './status-barramento.reducer';

export interface StatusBarramentoAppState
{
    statusBarramento: StatusBarramentoState;
}

export const getStatusBarramentoAppState = createFeatureSelector<StatusBarramentoAppState>(
    'status-barramento-app'
);

export const getAppState: any = createSelector(
    getStatusBarramentoAppState,
    (state: StatusBarramentoAppState) => state
);

export const reducers: ActionReducerMap<StatusBarramentoAppState> = {
    statusBarramento: StatusBarramentoReducer
};

export * from './status-barramento.reducer';
