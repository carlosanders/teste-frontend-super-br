import {createSelector} from '@ngrx/store';
import {getProtocoloExternoAppState, PessoaState, ProcessosAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {pessoa as pessoaSchema} from '@cdk/normalizr';
import {Pessoa} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Pessoa>(pessoaSchema);

export const getPessoaState: any = createSelector(
    getProtocoloExternoAppState,
    (state: ProcessosAppState) => state.pessoa
);

export const getPessoaId: any = createSelector(
    getPessoaState,
    (state: PessoaState) => state.pessoaId
);

export const getPessoa: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getPessoaId,
    schemaSelectors.entityProjector
);

export const getPessoaLoaded: any = createSelector(
    getPessoaState,
    (state: PessoaState) => state.loaded
);

export const getPessoaLoading: any = createSelector(
    getPessoaState,
    (state: PessoaState) => state.loading
);
