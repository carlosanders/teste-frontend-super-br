import {LembreteReducer, LembreteState} from './lembrete.reducer';
import {ProcessoReducer, ProcessoState} from './processo.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface LembreteAppState {
    lembrete: LembreteState;
    processo: ProcessoState;
}

export const getLembreteAppState = createFeatureSelector<LembreteAppState>('app-lembretes-form');

export const getAppState: any = createSelector(
    getLembreteAppState,
    (state: LembreteAppState) => state
);

export const reducers: ActionReducerMap<LembreteAppState> = {
    lembrete: LembreteReducer,
    processo: ProcessoReducer
};

export * from './lembrete.reducer';
export * from './processo.reducer';
