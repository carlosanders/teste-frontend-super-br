import {createSelector} from '@ngrx/store';
import {getProtocoloCreateAppState, ProtocoloCreateAppState, ProtocoloCreateState} from '../reducers';
import {getProtocoloExternoAppState, ProcessosAppState, ProcessosState} from '../../../store';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Pessoa} from '@cdk/models';
import {pessoa as pessoaSchema} from '@cdk/normalizr';

const schemaPessoaSelectors = createSchemaSelectors<Pessoa>(pessoaSchema);

export const getProtocoloCreateState: any = createSelector(
    getProtocoloCreateAppState,
    (state: ProtocoloCreateAppState) => state.protocolo
);

export const getProtocoloExternoState: any = createSelector(
    getProtocoloExternoAppState,
    (state: ProcessosAppState) => state.processos
);

export const getPessoaId: any = createSelector(
    getProtocoloExternoState,
    (state: ProcessosState) => state.loadedPessoa ? state.loadedPessoa.value : null
);

export const getPessoa: any = createSelector(
    schemaPessoaSelectors.getNormalizedEntities,
    getPessoaId,
    schemaPessoaSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getProtocoloCreateState,
    (state: ProtocoloCreateState) => state.saving
);

export const getErrors: any = createSelector(
    getProtocoloCreateState,
    (state: ProtocoloCreateState) => state.errors
);

export const getHasLoadedPessoa: any = createSelector(
    getProtocoloExternoState,
    (state: ProcessosState) => state.loadedPessoa
);
