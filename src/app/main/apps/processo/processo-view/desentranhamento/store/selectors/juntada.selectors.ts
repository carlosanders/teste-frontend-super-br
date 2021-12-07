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

export const getProcessoViewDesentranhamentoState: any = createSelector(
    getProcessoViewDesentranhamentoAppState,
    (state: ProcessoViewDesentranhamentoAppState) => state.juntada
);

export const getJuntadaId: any = createSelector(
    getProcessoViewDesentranhamentoState,
    (state: ProcessoViewDesentranhamentoState) => state.loaded ? state.loaded.value : null
);

export const getJuntada: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaId,
    schemaSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getProcessoViewDesentranhamentoState,
    (state: ProcessoViewDesentranhamentoState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getProcessoViewDesentranhamentoState,
    (state: ProcessoViewDesentranhamentoState) => state.loaded
);

export const getErrors: any = createSelector(
    getProcessoViewDesentranhamentoState,
    (state: ProcessoViewDesentranhamentoState) => state.errors
);
