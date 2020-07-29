import {createSelector} from '@ngrx/store';
import {getProtocoloCreateAppState, ProtocoloCreateAppState, ProtocoloCreateState} from '../reducers';
import {getProtocoloExternoAppState, ProcessosAppState, ProcessosState} from "../../../store/reducers";
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Pessoa} from '@cdk/models';
import {pessoa as pessoaSchema} from '@cdk/normalizr';

const schemaPessoaSelectors = createSchemaSelectors<Pessoa>(pessoaSchema);

export const getProtocoloCreateState = createSelector(
    getProtocoloCreateAppState,
    (state: ProtocoloCreateAppState) => state.protocolo
);

export const getProtocoloExternoState = createSelector(
    getProtocoloExternoAppState,
    (state: ProcessosAppState) => state.processos
);

export const getPessoaId = createSelector(
    getProtocoloExternoState,
    (state: ProcessosState) => state.loadedPessoa ? state.loadedPessoa.value : null
);

export const getPessoa = createSelector(
    schemaPessoaSelectors.getNormalizedEntities,
    getPessoaId,
    schemaPessoaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getProtocoloCreateState,
    (state: ProtocoloCreateState) => state.saving
);

export const getErrors = createSelector(
    getProtocoloCreateState,
    (state: ProtocoloCreateState) => state.errors
);

export const getHasLoadedPessoa = createSelector(
    getProtocoloExternoState,
    (state: ProcessosState) => state.loadedPessoa
);
