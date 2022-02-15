import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    VinculacaoEtiquetaCreateBlocoReducer,
    VinculacaoEtiquetaCreateBlocoState
} from './vinculacao-etiqueta-create-bloco.reducer';

export interface VinculacaoEtiquetaCreateBlocoAppState
{
    vinculacaoEtiquetaCreateBloco: VinculacaoEtiquetaCreateBlocoState;
}

export const getVinculacaoEtiquetaCreateBlocoAppState = createFeatureSelector<VinculacaoEtiquetaCreateBlocoAppState>(
    'vinculacao-etiqueta-create-bloco-app'
);

export const getAppState: any = createSelector(
    getVinculacaoEtiquetaCreateBlocoAppState,
    (state: VinculacaoEtiquetaCreateBlocoAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoEtiquetaCreateBlocoAppState> = {
    vinculacaoEtiquetaCreateBloco: VinculacaoEtiquetaCreateBlocoReducer
};

export * from './vinculacao-etiqueta-create-bloco.reducer';
