import {createSelector} from '@ngrx/store';
import {getDadosPessoaEditAppState, DadosPessoaEditAppState, DadosPessoaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Pessoa} from '@cdk/models';
import {pessoa as pessoaSchema} from '@cdk/normalizr/pessoa.schema';

const schemaPessoaSelectors = createSchemaSelectors<Pessoa>(pessoaSchema);

export const getDadosPessoaEditState = createSelector(
    getDadosPessoaEditAppState,
    (state: DadosPessoaEditAppState) => state.pessoa
);

export const getPessoaId = createSelector(
    getDadosPessoaEditState,
    (state: DadosPessoaEditState) => state.loaded && state.loaded.value !== 'criar' ? state.loaded.value : null
);

export const getPessoa = createSelector(
    schemaPessoaSelectors.getNormalizedEntities,
    getPessoaId,
    schemaPessoaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getDadosPessoaEditState,
    (state: DadosPessoaEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getDadosPessoaEditState,
    (state: DadosPessoaEditState) => state.loaded
);

export const getErrors = createSelector(
    getDadosPessoaEditState,
    (state: DadosPessoaEditState) => state.errors
);
