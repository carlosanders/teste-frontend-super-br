import {createSelector} from '@ngrx/store';
import {getProtocoloCreateAppState, ProtocoloCreateAppState, ProtocoloExistenteState} from '../reducers';
import {getProtocoloExternoAppState, ProcessosAppState, ProcessosState} from '../../../store';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Pessoa} from '@cdk/models';
import {pessoa as pessoaSchema} from '@cdk/normalizr';

const schemaPessoaSelectors = createSchemaSelectors<Pessoa>(pessoaSchema);

export const getProtocoloExistenteState: any = createSelector(
    getProtocoloCreateAppState,
    (state: ProtocoloCreateAppState) => state.protocoloExistente
);

export const getProtocoloExternoExistenteState: any = createSelector(
    getProtocoloExternoAppState,
    (state: ProcessosAppState) => state.processos
);

export const getExistentePessoaId: any = createSelector(
    getProtocoloExternoExistenteState,
    (state: ProcessosState) => state.loadedPessoa ? state.loadedPessoa.value : null
);

export const getExistentePessoa: any = createSelector(
    schemaPessoaSelectors.getNormalizedEntities,
    getExistentePessoaId,
    schemaPessoaSelectors.entityProjector
);

export const getExistenteIsSaving: any = createSelector(
    getProtocoloExistenteState,
    (state: ProtocoloExistenteState) => state.saving
);

export const getExistenteErrors: any = createSelector(
    getProtocoloExistenteState,
    (state: ProtocoloExistenteState) => state.errors
);

export const getExistenteHasLoadedPessoa: any = createSelector(
    getProtocoloExternoExistenteState,
    (state: ProcessosState) => state.loadedPessoa
);
