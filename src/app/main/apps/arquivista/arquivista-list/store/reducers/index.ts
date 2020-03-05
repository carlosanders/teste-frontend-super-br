import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ArquivistaReducer, ArquivistaState } from './arquivista.reducer';


export interface ArquivistaAppState
{
    arquivista: ArquivistaState;

}

export const getArquivistaAppState = createFeatureSelector<ArquivistaAppState>(
    'arquivista-app'
);

export const getAppState = createSelector(
    getArquivistaAppState,
    (state: ArquivistaAppState) => state
);

export const reducers: ActionReducerMap<ArquivistaAppState> = {
    arquivista: ArquivistaReducer,

};

export * from './arquivista.reducer';

