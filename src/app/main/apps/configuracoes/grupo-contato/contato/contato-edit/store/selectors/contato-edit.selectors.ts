import {createSelector} from '@ngrx/store';
import {getContatoEditAppState, ContatoEditAppState, ContatoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Contato} from '@cdk/models';
import {contato as contatoSchema} from '@cdk/normalizr';

const schemaContatoSelectors = createSchemaSelectors<Contato>(contatoSchema);

export const getContatoEditState = createSelector(
    getContatoEditAppState,
    (state: ContatoEditAppState) => state.contato
);

export const getContatoId = createSelector(
    getContatoEditState,
    (state: ContatoEditState) => state.loaded ? state.loaded.value : null
);

export const getContato = createSelector(
    schemaContatoSelectors.getNormalizedEntities,
    getContatoId,
    schemaContatoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getContatoEditState,
    (state: ContatoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getContatoEditState,
    (state: ContatoEditState) => state.loaded
);

export const getErrors = createSelector(
    getContatoEditState,
    (state: ContatoEditState) => state.errors
);
