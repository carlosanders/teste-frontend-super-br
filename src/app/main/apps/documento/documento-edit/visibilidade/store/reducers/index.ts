import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VisibilidadeReducer, VisibilidadeState} from './visibilidade.reducer';

export interface DocumentoEditVisibilidadeAppState
{
    visibilidades: VisibilidadeState;
}

export const getDocumentoEditVisibilidadeAppState = createFeatureSelector<DocumentoEditVisibilidadeAppState>(
    'documento-edit-visibilidade-app'
);

export const getAppState: any = createSelector(
    getDocumentoEditVisibilidadeAppState,
    (state: DocumentoEditVisibilidadeAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditVisibilidadeAppState> = {
    visibilidades: VisibilidadeReducer,
};

export * from './visibilidade.reducer';
