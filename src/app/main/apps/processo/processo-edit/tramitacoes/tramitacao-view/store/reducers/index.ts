import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TramitacaoViewReducer, TramitacaoViewState} from './tramitacao-view.reducer';

export interface TramitacaoViewAppState
{
    tramitacaoView: TramitacaoViewState;
}

export const getTramitacaoViewAppState = createFeatureSelector<TramitacaoViewAppState>(
    'tramitacao-view-app'
);

export const getAppState: any = createSelector(
    getTramitacaoViewAppState,
    (state: TramitacaoViewAppState) => state
);

export const reducers: ActionReducerMap<TramitacaoViewAppState> = {
    tramitacaoView: TramitacaoViewReducer
};

export * from './tramitacao-view.reducer';
