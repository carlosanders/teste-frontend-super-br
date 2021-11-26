import {createSelector} from '@ngrx/store';
import {AssinaturasState, getTarefasAppState, TarefasAppState} from '../reducers';
import {createSchemaSelectors} from '../../../../../../@cdk/ngrx-normalizr';
import {Documento} from '../../../../../../@cdk/models';
import {documento as documentoSchema} from '../../../../../../@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getAssinaturasState: any = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state?.assinaturas
);

export const getAssinandoDocumentosId: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.assinandoDocumentosId
);

export const getAssinandoDocumentosEletronicamenteId: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.assinandoDocumentosEletronicamenteId
);

export const getAssinandoTarefasEletronicamenteId: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.assinandoTarefasEletronicamenteId
);

export const getAssinandoTarefasId: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.assinandoTarefasId
);

export const getDocumentosTarefa: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.documentosTarefa
);

export const getAssinaturaErrors: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.errors
);

export const getDocumentosId: any = createSelector(
    getAssinaturasState,
    (state: AssinaturasState) => state?.documentosId
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);
