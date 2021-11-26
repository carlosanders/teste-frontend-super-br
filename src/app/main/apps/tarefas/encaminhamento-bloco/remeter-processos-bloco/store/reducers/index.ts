import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RemessaBlocoReducer, RemessaBlocoState} from './remessa-bloco.reducer';

export interface RemessaBlocoAppState
{
    tramitacao: RemessaBlocoState;
}

export const getRemessaBlocoAppState = createFeatureSelector<RemessaBlocoAppState>(
    'remessa-processos-bloco-app'
);

export const getAppState: any = createSelector(
    getRemessaBlocoAppState,
    (state: RemessaBlocoAppState) => state
);

export const reducers: ActionReducerMap<RemessaBlocoAppState> = {
    tramitacao: RemessaBlocoReducer
};

export * from './remessa-bloco.reducer';
