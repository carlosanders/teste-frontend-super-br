import {createSelector} from '@ngrx/store';
import {getEnderecoEditAppState, EnderecoEditAppState, EnderecoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Endereco} from '@cdk/models';
import {endereco as enderecoSchema} from '@cdk/normalizr';

const schemaEnderecoSelectors = createSchemaSelectors<Endereco>(enderecoSchema);

export const getEnderecoEditState = createSelector(
    getEnderecoEditAppState,
    (state: EnderecoEditAppState) => state.endereco
);

export const getEnderecoId = createSelector(
    getEnderecoEditState,
    (state: EnderecoEditState) => state.loaded ? state.loaded.value : null
);

export const getEndereco = createSelector(
    schemaEnderecoSelectors.getNormalizedEntities,
    getEnderecoId,
    schemaEnderecoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getEnderecoEditState,
    (state: EnderecoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getEnderecoEditState,
    (state: EnderecoEditState) => state.loaded
);

export const getErrors = createSelector(
    getEnderecoEditState,
    (state: EnderecoEditState) => state.errors
);
