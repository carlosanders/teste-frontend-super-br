import {createSelector} from '@ngrx/store';
import {ContatoEditAppState, ContatoEditState, getContatoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Contato} from '@cdk/models';
import {contato as contatoSchema} from '@cdk/normalizr';

const schemaContatoSelectors = createSchemaSelectors<Contato>(contatoSchema);

export const getContatoEditState: any = createSelector(
    getContatoEditAppState,
    (state: ContatoEditAppState) => state.contato
);

export const getContatoId: any = createSelector(
    getContatoEditState,
    (state: ContatoEditState) => state.loaded ? state.loaded.value : null
);

export const getContato: any = createSelector(
    schemaContatoSelectors.getNormalizedEntities,
    getContatoId,
    schemaContatoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getContatoEditState,
    (state: ContatoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getContatoEditState,
    (state: ContatoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getContatoEditState,
    (state: ContatoEditState) => state.errors
);
