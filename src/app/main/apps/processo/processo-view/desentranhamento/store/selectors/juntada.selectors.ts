import {createSelector} from '@ngrx/store';
import {
    getProcessoViewDesentranhamentoAppState,
    ProcessoViewDesentranhamentoAppState,
    ProcessoViewDesentranhamentoState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getProcessoViewDesentranhamentoState = createSelector(
    getProcessoViewDesentranhamentoAppState,
    (state: ProcessoViewDesentranhamentoAppState) => state.juntada
);

export const getJuntadaId = createSelector(
    getProcessoViewDesentranhamentoState,
    (state: ProcessoViewDesentranhamentoState) => state.loaded ? state.loaded.value : null
);

export const getJuntada = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaId,
    schemaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getProcessoViewDesentranhamentoState,
    (state: ProcessoViewDesentranhamentoState) => state.saving
);

export const getHasLoaded = createSelector(
    getProcessoViewDesentranhamentoState,
    (state: ProcessoViewDesentranhamentoState) => state.loaded
);

export const getErrors = createSelector(
    getProcessoViewDesentranhamentoState,
    (state: ProcessoViewDesentranhamentoState) => state.errors
);
