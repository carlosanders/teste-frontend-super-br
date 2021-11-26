import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TramitacaoEditReducer, TramitacaoEditState} from './tramitacao-edit.reducer';

export interface TramitacaoEditAppState
{
    tramitacao: TramitacaoEditState;
}

export const getTramitacaoEditAppState = createFeatureSelector<TramitacaoEditAppState>(
    'tramitacao-edit-app'
);

export const getAppState: any = createSelector(
    getTramitacaoEditAppState,
    (state: TramitacaoEditAppState) => state
);

export const reducers: ActionReducerMap<TramitacaoEditAppState> = {
    tramitacao: TramitacaoEditReducer
};

export * from './tramitacao-edit.reducer';
