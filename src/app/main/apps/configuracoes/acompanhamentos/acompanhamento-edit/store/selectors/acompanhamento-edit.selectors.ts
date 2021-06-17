import {createSelector} from '@ngrx/store';
import {AcompanhamentoEditAppState, AcompanhamentoEditState, getAcompanhamentoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Compartilhamento} from '@cdk/models';
import {compartilhamento as acompanhamentoSchema} from '@cdk/normalizr';

const schemaAcompanhamentoSelectors = createSchemaSelectors<Compartilhamento>(acompanhamentoSchema);

export const getAcompanhamentoEditState = createSelector(
    getAcompanhamentoEditAppState,
    (state: AcompanhamentoEditAppState) => state.acompanhamento
);

export const getAcompanhamentoId = createSelector(
    getAcompanhamentoEditState,
    (state: AcompanhamentoEditState) => state.loaded ? state.loaded.value : null
);

export const getAcompanhamento = createSelector(
    schemaAcompanhamentoSelectors.getNormalizedEntities,
    getAcompanhamentoId,
    schemaAcompanhamentoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getAcompanhamentoEditState,
    (state: AcompanhamentoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getAcompanhamentoEditState,
    (state: AcompanhamentoEditState) => state.loaded
);

export const getErrors = createSelector(
    getAcompanhamentoEditState,
    (state: AcompanhamentoEditState) => state.errors
);
