import {createSelector} from '@ngrx/store';
import {getPessoaEditAppState, PessoaEditAppState, PessoaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Pessoa} from '@cdk/models';
import {pessoa as pessoaSchema} from '@cdk/normalizr';

const schemaPessoaSelectors = createSchemaSelectors<Pessoa>(pessoaSchema);

export const getPessoaEditState: any = createSelector(
    getPessoaEditAppState,
    (state: PessoaEditAppState) => state.pessoa
);

export const getPessoaId: any = createSelector(
    getPessoaEditState,
    (state: PessoaEditState) => state.entityId
);

export const getPessoa: any = createSelector(
    schemaPessoaSelectors.getNormalizedEntities,
    getPessoaId,
    schemaPessoaSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getPessoaEditState,
    (state: PessoaEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getPessoaEditState,
    (state: PessoaEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getPessoaEditState,
    (state: PessoaEditState) => state.errors
);
