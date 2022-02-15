import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {SegurancaReducer, SegurancaState} from './seguranca.reducer';

export interface SegurancaAppState
{
    assunto: SegurancaState;
}

export const getSegurancaAppState = createFeatureSelector<SegurancaAppState>(
    'seguranca-app'
);

export const getAppState: any = createSelector(
    getSegurancaAppState,
    (state: SegurancaAppState) => state
);

export const reducers: ActionReducerMap<SegurancaAppState> = {
    assunto: SegurancaReducer
};

export * from './seguranca.reducer';
