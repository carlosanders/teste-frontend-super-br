import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {JuntadaReducer, JuntadaState} from './juntada.reducer';

export interface DocumentoEditJuntadaAppState
{
    juntada: JuntadaState;
}

export const getDocumentoEditJuntadaAppState = createFeatureSelector<DocumentoEditJuntadaAppState>(
    'documento-edit-juntada-app'
);

export const getAppState: any = createSelector(
    getDocumentoEditJuntadaAppState,
    (state: DocumentoEditJuntadaAppState) => state
);

export const reducers: ActionReducerMap<DocumentoEditJuntadaAppState> = {
    juntada: JuntadaReducer
};

export * from './juntada.reducer';
