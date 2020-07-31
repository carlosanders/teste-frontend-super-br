import {createSelector} from '@ngrx/store';
import {getPessoaEditAppState, PessoaEditAppState, PessoaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Pessoa} from '@cdk/models';
import {pessoa as pessoaSchema} from '@cdk/normalizr';

const schemaPessoaSelectors = createSchemaSelectors<Pessoa>(pessoaSchema);

export const getPessoaEditState = createSelector(
    getPessoaEditAppState,
    (state: PessoaEditAppState) => state.pessoa
);

export const getPessoaId = createSelector(
    getPessoaEditState,
    (state: PessoaEditState) => state.entityId
);

export const getPessoa = createSelector(
    schemaPessoaSelectors.getNormalizedEntities,
    getPessoaId,
    schemaPessoaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getPessoaEditState,
    (state: PessoaEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getPessoaEditState,
    (state: PessoaEditState) => state.loaded
);

export const getErrors = createSelector(
    getPessoaEditState,
    (state: PessoaEditState) => state.errors
);
