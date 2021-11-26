import {createSelector} from '@ngrx/store';
import {getGrupoContatoEditAppState, GrupoContatoEditAppState, GrupoContatoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {GrupoContato} from '@cdk/models';
import {grupoContato as grupoContatoSchema} from '@cdk/normalizr';

const schemaGrupoContatoSelectors = createSchemaSelectors<GrupoContato>(grupoContatoSchema);

export const getGrupoContatoEditState: any = createSelector(
    getGrupoContatoEditAppState,
    (state: GrupoContatoEditAppState) => state.grupoContato
);

export const getGrupoContatoId: any = createSelector(
    getGrupoContatoEditState,
    (state: GrupoContatoEditState) => state.loaded ? state.loaded.value : null
);

export const getGrupoContato: any = createSelector(
    schemaGrupoContatoSelectors.getNormalizedEntities,
    getGrupoContatoId,
    schemaGrupoContatoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getGrupoContatoEditState,
    (state: GrupoContatoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getGrupoContatoEditState,
    (state: GrupoContatoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getGrupoContatoEditState,
    (state: GrupoContatoEditState) => state.errors
);
