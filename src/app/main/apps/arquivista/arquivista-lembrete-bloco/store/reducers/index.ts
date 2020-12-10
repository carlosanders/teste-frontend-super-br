import {LembreteBlocoReducer, LembreteBlocoState} from './lembrete-bloco.reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface LembreteBlocoAppState {
    lembrete: LembreteBlocoState;
}

export const getLembreteBlocoAppState = createFeatureSelector<LembreteBlocoAppState>('lembretes-bloco-form');

export const getAppState = createSelector(
    getLembreteBlocoAppState,
    (state: LembreteBlocoAppState) => state
);

export const reducers: ActionReducerMap<LembreteBlocoAppState> = {
    lembrete: LembreteBlocoReducer
};

export * from './lembrete-bloco.reducers';
