import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DocumentoCopiaCreateBlocoReducer, DocumentoCopiaCreateBlocoState} from './documento-copia-create-bloco.reducer';

export interface DocumentoCopiaCreateBlocoAppState
{
    documentoCopiaCreateBloco: DocumentoCopiaCreateBlocoState;
}

export const getDocumentoCopiaCreateBlocoAppState = createFeatureSelector<DocumentoCopiaCreateBlocoAppState>(
    'documento-copia-create-bloco-app'
);

export const getAppState: any = createSelector(
    getDocumentoCopiaCreateBlocoAppState,
    (state: DocumentoCopiaCreateBlocoAppState) => state
);

export const reducers: ActionReducerMap<DocumentoCopiaCreateBlocoAppState> = {
    documentoCopiaCreateBloco: DocumentoCopiaCreateBlocoReducer
};

export * from './documento-copia-create-bloco.reducer';
