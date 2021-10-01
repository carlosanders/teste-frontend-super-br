import {createSelector} from '@ngrx/store';
import {DocumentoAppState, JuntadasState, getDocumentoAppState} from 'app/main/apps/documento/store/reducers';

export const getJuntadasState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.juntadas
);

export const getIsLoadingJuntada = createSelector(
    getJuntadasState,
    (state: JuntadasState) => state.loading
);

export const getErrorsJuntada = createSelector(
    getJuntadasState,
    (state: JuntadasState) => state.errors
);
