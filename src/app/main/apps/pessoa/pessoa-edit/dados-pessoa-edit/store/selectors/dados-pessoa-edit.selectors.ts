import {createSelector} from '@ngrx/store';
import {DadosPessoaEditAppState, DadosPessoaEditState, getDadosPessoaEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Pessoa} from '@cdk/models';
import {pessoa as pessoaSchema} from '@cdk/normalizr';

const schemaPessoaSelectors = createSchemaSelectors<Pessoa>(pessoaSchema);

export const getDadosPessoaEditState: any = createSelector(
    getDadosPessoaEditAppState,
    (state: DadosPessoaEditAppState) => state.pessoa
);

export const getPessoaId: any = createSelector(
    getDadosPessoaEditState,
    (state: DadosPessoaEditState) => state.loaded && state.loaded.value !== 'criar' ? state.loaded.value : null
);

export const getPessoa: any = createSelector(
    schemaPessoaSelectors.getNormalizedEntities,
    getPessoaId,
    schemaPessoaSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getDadosPessoaEditState,
    (state: DadosPessoaEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getDadosPessoaEditState,
    (state: DadosPessoaEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getDadosPessoaEditState,
    (state: DadosPessoaEditState) => state.errors
);
