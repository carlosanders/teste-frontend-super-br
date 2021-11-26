import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AssinaturasReducer, AssinaturasState} from './assinaturas.reducer';

export interface DocumentoEditAssinaturasAppState
{
    assinaturas: AssinaturasState;
}

export const getDocumentoEditAssinaturasAppState = createFeatureSelector<DocumentoEditAssinaturasAppState>(
    'documento-edit-assinaturas-app'
);

export const getAppState: any = createSelector(
    getDocumentoEditAssinaturasAppState,
    (state: DocumentoEditAssinaturasAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditAssinaturasAppState> = {
    assinaturas: AssinaturasReducer,
};

export * from './assinaturas.reducer';
