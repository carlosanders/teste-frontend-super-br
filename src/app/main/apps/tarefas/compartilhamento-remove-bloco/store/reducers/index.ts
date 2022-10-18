import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    CompartilhamentoRemoveBlocoReducer,
    CompartilhamentoRemoveBlocoState
} from './compartilhamento-remove-bloco.reducer';

export interface CompartilhamentoRemoveBlocoAppState
{
    compartilhamentoRemoveBloco: CompartilhamentoRemoveBlocoState;
}

export const getCompartilhamentoRemoveBlocoAppState = createFeatureSelector<CompartilhamentoRemoveBlocoAppState>(
    'compartilhamento-remove-bloco-app'
);

export const getAppState: any = createSelector(
    getCompartilhamentoRemoveBlocoAppState,
    (state: CompartilhamentoRemoveBlocoAppState) => state
);

export const reducers: ActionReducerMap<CompartilhamentoRemoveBlocoAppState> = {
    compartilhamentoRemoveBloco: CompartilhamentoRemoveBlocoReducer
};

export * from './compartilhamento-remove-bloco.reducer';
