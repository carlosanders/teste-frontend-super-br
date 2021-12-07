import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {createSelector} from '@ngrx/store';

import {Lembrete, Processo} from '@cdk/models';
import {lembrete as lembreteSchema, processo as processoSchema} from '@cdk/normalizr';

import {getLembreteAppState, LembreteAppState, LembreteState} from '../reducers';
import {getProcessosIds} from '../../../arquivista-list/store/selectors';

const schemaLembreteSelectors = createSchemaSelectors<Lembrete>(lembreteSchema);
const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getLembreteState: any = createSelector(
    getLembreteAppState,
    (state: LembreteAppState) => state.lembrete
);

export const getLembreteId: any = createSelector(
    getLembreteState,
    (state: LembreteState) => state.loaded ? state.loaded.value : null
);

export const getLembreteList: any = createSelector(
    schemaLembreteSelectors.getNormalizedEntities,
    getLembreteId,
    schemaLembreteSelectors.entityProjector
);

export const getProcessos: any = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaProcessoSelectors.entitiesProjector
);

export const getIsSaving: any = createSelector(
    getLembreteState,
    (state: LembreteState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getLembreteState,
    (state: LembreteState) => state.loaded
);

export const getErrors: any = createSelector(
    getLembreteState,
    (state: LembreteState) => state.errors
);
