import {createSelector} from '@ngrx/store';

import {Lembrete, Processo} from '@cdk/models';
import {lembrete as lembreteSchema} from '@cdk/normalizr/lembrete.schema';
import {processo as processoSchema} from '../../../../../../../@cdk/normalizr/processo.schema';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {getLembreteBlocoAppState, LembreteBlocoAppState, LembreteBlocoState} from '../reducers';
import {ArquivistaState} from '../../../arquivista-list/store/reducers';
import {getArquivistaState, getSelectedProcessoIds} from '../../../arquivista-list/store/selectors';

const schemaLembreteBlocoSelectors = createSchemaSelectors<Lembrete>(lembreteSchema);
const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getLembreteBlocoState = createSelector(
    getLembreteBlocoAppState,
    (state: LembreteBlocoAppState) => state.lembrete
);

export const getProcessosIds = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.entitiesId
);

export const getLembreteBlocoId = createSelector(
    getLembreteBlocoState,
    (state: LembreteBlocoState) => state.loaded ? state.loaded.value : null
);

export const getLembreteBlocoList = createSelector(
    schemaLembreteBlocoSelectors.getNormalizedEntities,
    getLembreteBlocoId,
    schemaLembreteBlocoSelectors.entityProjector
);

export const getProcessos = createSelector(
    schemaSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedProcessos = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedProcessoIds,
    schemaSelectors.entitiesProjector
);

export const getIsSaving = createSelector(
    getLembreteBlocoState,
    (state: LembreteBlocoState) => state.saving
);

export const getHasLoaded = createSelector(
    getLembreteBlocoState,
    (state: LembreteBlocoState) => state.loaded
);

export const getErrors = createSelector(
    getLembreteBlocoState,
    (state: LembreteBlocoState) => state.errors
);
