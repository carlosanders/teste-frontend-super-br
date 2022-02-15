import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    CompartilhamentoCreateBlocoReducer,
    CompartilhamentoCreateBlocoState
} from './compartilhamento-create-bloco.reducer';

export interface CompartilhamentoCreateBlocoAppState
{
    compartilhamentoCreateBloco: CompartilhamentoCreateBlocoState;
}

export const getCompartilhamentoCreateBlocoAppState = createFeatureSelector<CompartilhamentoCreateBlocoAppState>(
    'compartilhamento-create-bloco-app'
);

export const getAppState: any = createSelector(
    getCompartilhamentoCreateBlocoAppState,
    (state: CompartilhamentoCreateBlocoAppState) => state
);

export const reducers: ActionReducerMap<CompartilhamentoCreateBlocoAppState> = {
    compartilhamentoCreateBloco: CompartilhamentoCreateBlocoReducer
};

export * from './compartilhamento-create-bloco.reducer';
