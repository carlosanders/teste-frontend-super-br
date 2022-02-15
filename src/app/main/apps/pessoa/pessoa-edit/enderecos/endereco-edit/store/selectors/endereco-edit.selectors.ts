import {createSelector} from '@ngrx/store';
import {EnderecoEditAppState, EnderecoEditState, getEnderecoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Endereco} from '@cdk/models';
import {endereco as enderecoSchema} from '@cdk/normalizr';

const schemaEnderecoSelectors = createSchemaSelectors<Endereco>(enderecoSchema);

export const getEnderecoEditState: any = createSelector(
    getEnderecoEditAppState,
    (state: EnderecoEditAppState) => state.endereco
);

export const getEnderecoId: any = createSelector(
    getEnderecoEditState,
    (state: EnderecoEditState) => state.loaded ? state.loaded.value : null
);

export const getEndereco: any = createSelector(
    schemaEnderecoSelectors.getNormalizedEntities,
    getEnderecoId,
    schemaEnderecoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getEnderecoEditState,
    (state: EnderecoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getEnderecoEditState,
    (state: EnderecoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getEnderecoEditState,
    (state: EnderecoEditState) => state.errors
);
