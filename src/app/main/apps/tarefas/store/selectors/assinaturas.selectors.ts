import {createSelector} from '@ngrx/store';
import {AssinaturasState, getTarefasAppState, TarefasAppState} from '../reducers';
import {createSchemaSelectors} from '../../../../../../@cdk/ngrx-normalizr';
import {Documento} from '../../../../../../@cdk/models';
import {documento as documentoSchema} from '../../../../../../@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getAssinaturasState = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state?.assinaturas
);

export const getAssinandoDocumentosId = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.assinandoDocumentosId
);

export const getAssinandoDocumentosEletronicamenteId = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.assinandoDocumentosEletronicamenteId
);

export const getAssinandoTarefasEletronicamenteId = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.assinandoTarefasEletronicamenteId
);

export const getAssinandoTarefasId = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.assinandoTarefasId
);

export const getDocumentosTarefa = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.documentosTarefa
);

export const getAssinaturaErrors = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.errors
);

export const getDocumentosId = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);
