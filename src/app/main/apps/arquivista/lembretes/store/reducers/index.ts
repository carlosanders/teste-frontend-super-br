import {LembreteReducer, LembreteState} from './lembrete.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface LembreteAppState {
    lembrete: LembreteState;
}

export const getLembreteAppState = createFeatureSelector<LembreteAppState>('<span class="mr-4 ml-4">/</span>lembretes-form');

export const getAppState = createSelector(
    getLembreteAppState,
    (state: LembreteAppState) => state
);

export const reducers: ActionReducerMap<LembreteAppState> = {
    lembrete: LembreteReducer
};

export * from './lembrete.reducer';
