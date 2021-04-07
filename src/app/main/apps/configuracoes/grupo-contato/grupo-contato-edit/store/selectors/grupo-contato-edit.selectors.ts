import {createSelector} from '@ngrx/store';
import {getGrupoContatoEditAppState, GrupoContatoEditAppState, GrupoContatoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {GrupoContato} from '@cdk/models';
import {grupoContato as grupoContatoSchema} from '@cdk/normalizr';

const schemaGrupoContatoSelectors = createSchemaSelectors<GrupoContato>(grupoContatoSchema);

export const getGrupoContatoEditState = createSelector(
    getGrupoContatoEditAppState,
    (state: GrupoContatoEditAppState) => state.grupoContato
);

export const getGrupoContatoId = createSelector(
    getGrupoContatoEditState,
    (state: GrupoContatoEditState) => state.loaded ? state.loaded.value : null
);

export const getGrupoContato = createSelector(
    schemaGrupoContatoSelectors.getNormalizedEntities,
    getGrupoContatoId,
    schemaGrupoContatoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getGrupoContatoEditState,
    (state: GrupoContatoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getGrupoContatoEditState,
    (state: GrupoContatoEditState) => state.loaded
);

export const getErrors = createSelector(
    getGrupoContatoEditState,
    (state: GrupoContatoEditState) => state.errors
);
